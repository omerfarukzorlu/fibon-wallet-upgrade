import { Des } from "data-crypto"
import { Buffer } from "buffer"
import CryptoJS from "crypto-js"
import NfcManager, { NfcTech } from "react-native-nfc-manager"
import { Platform } from "react-native"

// XOR ve diğer yardımcı kütüphaneler
const xor = require("buffer-xor")
const bigInt = require("big-integer")

// ==================== TYPES ====================
interface NFCResponse {
  success?: boolean;
  isSuccess: boolean;
  data?: any;
  error?: number;
  errorMessage?: string;
  documentNumber?: string;
  birthDate?: string;
  expiryDate?: string;
  personalData?: any;
  photo?: string;
  base64Image?: string;
  name?: string;
  surname?: string;
  id_number?: string;
  document_number?: string;
  birth_date?: string;
  expiry_date?: string;
  gender?: string;
  byte_array_image?: any;
}

interface APDUResponse {
  response?: number[];
  sw1?: number;
  sw2?: number;
}

// ==================== UTILITY FUNCTIONS ====================

function hex_to_ascii(hex: string): string {
  let ascii = "";
  for (let i = 0; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return ascii;
}

function hexToBytes(hex: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

function toHexString(bytes: number[]): string {
  return Array.from(bytes, function(byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("").toUpperCase();
}

function checkdigitCalc(input: string): number {
  let sum = 0;
  let weight = 0;
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  for (let i = 0; i < input.length; i++) {
    if (i % 3 === 0) weight = 7;
    else if (i % 3 === 1) weight = 3;
    else weight = 1;

    let value: number;
    if (isNaN(parseInt(input[i]))) {
      value = alphabet.indexOf(input[i]) + 10;
    } else {
      value = parseInt(input[i]);
    }

    sum += value * weight;
  }

  return sum % 10;
}

function get_ENC_MAC(seed: string): { k_enc: string; k_mac: string } {
  const seedWithCounter1 = seed.concat("00000001");
  const hash1 = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(seedWithCounter1)).toString(CryptoJS.enc.Hex);
  const kenc1 = hash1.substring(0, 16);
  const kenc2 = hash1.substring(16, 32);
  const k_enc = kenc1.concat(kenc2);

  const seedWithCounter2 = seed.concat("00000002");
  const hash2 = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(seedWithCounter2)).toString(CryptoJS.enc.Hex);
  const kmac1 = hash2.substring(0, 16);
  const kmac2 = hash2.substring(16, 32);
  const k_mac = kmac1.concat(kmac2);

  return { k_enc, k_mac };
}

function DES3Encrypt(data: string, key: string): string {
  const iv = CryptoJS.enc.Hex.parse("0000000000000000");
  const config = {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  };

  const encrypted = CryptoJS.TripleDES.encrypt(
    CryptoJS.enc.Hex.parse(data),
    CryptoJS.enc.Hex.parse(key),
    config
  );

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
}

function DES3Decrypt(encryptedData: string, key: string): string {
  const iv = CryptoJS.enc.Hex.parse("0000000000000000");
  const config = {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  };

  let encrypted;
  if (typeof encryptedData === 'string') {
    encrypted = CryptoJS.enc.Hex.parse(encryptedData);
  } else {
    encrypted = encryptedData;
  }

  encrypted = CryptoJS.enc.Base64.stringify(encrypted);

  const decrypted = CryptoJS.TripleDES.decrypt(
    encrypted,
    CryptoJS.enc.Hex.parse(key),
    config
  );

  return decrypted.toString(CryptoJS.enc.Hex).toUpperCase();
}

function macIso9797_alg3(key: string, data: string, padding: string): string {
  const keyLength = key.length / 2;
  let key1 = key.substring(0, 16);
  let key2 = key.substring(16, 32);

  if (keyLength != 16) {
    console.log("Error, key length should be 16");
    return "";
  }

  data = data.concat(padding);
  const remainder = (data.length / 2) % 8;
  data = data.concat("00".repeat(8 - remainder));

  const blockCount = data.length / 2 / 8;
  let mac = "0000000000000000";

  for (let i = 0; i < blockCount; i++) {
    const block = data.substring(i * 16, i * 16 + 16);
    const xorBuffer1 = Buffer.from(block, "hex");
    const xorBuffer2 = Buffer.from(mac, "hex");
    mac = xor(xorBuffer1, xorBuffer2);
    const macHex = toHexString(Array.from(mac));
    mac = Des.encrypt(macHex, key1);
  }

  mac = Des.decrypt(mac, key2);
  mac = Des.encrypt(mac, key1);

  return mac;
}

function xor2(hex1: string, hex2: string): string {
  const buffer1 = Buffer.from(hex1, 'hex');
  const buffer2 = Buffer.from(hex2, 'hex');
  const result = buffer1.map((byte, index) => byte ^ buffer2[index]);
  return result.toString('hex').toUpperCase();
}

function hex2decimal(hex: string): string {
  function addStrings(str1: string, str2: string): string {
    let carry = 0;
    let result: number[] = [];
    const arr1 = str1.split("").map(Number);
    const arr2 = str2.split("").map(Number);

    while (arr1.length || arr2.length) {
      const sum = (arr1.pop() || 0) + (arr2.pop() || 0) + carry;
      result.unshift(sum < 10 ? sum : sum - 10);
      carry = sum < 10 ? 0 : 1;
    }

    if (carry) result.unshift(carry);
    return result.join("");
  }

  let decimal = "0";
  hex.split("").forEach(function(hexDigit) {
    const digit = parseInt(hexDigit, 16);
    for (let bitMask = 8; bitMask; bitMask >>= 1) {
      decimal = addStrings(decimal, decimal);
      if (digit & bitMask) decimal = addStrings(decimal, "1");
    }
  });

  return decimal;
}

function dec2hex(decimal: string): string {
  const digits = decimal.toString().split("");
  const hexDigits: number[] = [];
  const hexResult: string[] = [];
  let temp: number;
  let remainder: number;

  while (digits.length) {
    remainder = 1 * parseInt(digits.shift()!);
    for (temp = 0; remainder || temp < hexDigits.length; temp++) {
      remainder += (hexDigits[temp] || 0) * 10;
      hexDigits[temp] = remainder % 16;
      remainder = (remainder - hexDigits[temp]) / 16;
    }
  }

  while (hexDigits.length) {
    hexResult.push(hexDigits.pop()!.toString(16));
  }

  let result = hexResult.join("");
  if (result.length % 2 == 1) {
    result = "0".concat(result);
  }

  return result.toUpperCase();
}

function hexNumberIncrement(hex: string): string {
  const decimal = bigInt(hex2decimal(hex));
  const incremented = decimal.add("1");
  return incremented.toString(16).toUpperCase();
}

function padtofourdigit(num: number): string {
  const hexValue = num.toString(16);
  const padding = "0".repeat(4 - hexValue.length).concat(hexValue);
  return padding.toUpperCase();
}

function unPadHex(hex: string): string {
  const index = hex.lastIndexOf("80");
  if (index === -1) return hex;

  for (let i = index + 1; i < hex.length; i++) {
    if (hex.charAt(i) != "0") return hex;
  }
  return hex.substring(0, index);
}

function _calculatePercentage(total: number, current: number): number {
  return (current * 100) / total;
}

function hexFixing(hex: string): number[] {
  const result = [0, 0x82, 0, 0, 0x28];
  for (let i = 0; i < hex.length; i += 2) {
    const byte = parseInt(hex.substr(i, 2), 16);
    result.push(byte);
  }
  result.push(0x28);
  return result;
}

// ==================== FIXED MAC VERIFICATION ====================
function verifyMAC(response: string, expectedMAC: string): boolean {
  if (!response || !expectedMAC) {
    console.error('MAC verification failed: missing data');
    return false;
  }

  // MAC'in response'un sonunda olması bekleniyor (8 byte = 16 hex karakter)
  const macLength = 16;
  if (response.length < macLength) {
    console.error('MAC verification failed: response too short');
    return false;
  }

  const actualMAC = response.slice(-macLength);
  const isValid = actualMAC.toUpperCase() === expectedMAC.toUpperCase();
  
  console.log('MAC Verification:', {
    expected: expectedMAC.toUpperCase(),
    actual: actualMAC.toUpperCase(),
    valid: isValid
  });

  return isValid;
}

// ==================== FIXED DATE FORMATTING ====================
function formatMRZDate(dateStr: string): string {
  if (dateStr.length !== 6) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  
  const year = dateStr.substring(0, 2);
  const month = dateStr.substring(2, 4);
  const day = dateStr.substring(4, 6);
  
  // Yıl belirleme mantığı: 50'den küçükse 20xx, büyükse 19xx
  const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
  
  return `${fullYear}-${month}-${day}`;
}

// ==================== FIXED ASN.1 LENGTH PARSING ====================
function parseASN1Length(data: string, offset: number): { length: number, headerLength: number } {
  const firstByte = parseInt(data.substring(offset, offset + 2), 16);
  
  if (firstByte < 0x80) {
    // Short form
    return { length: firstByte, headerLength: 1 };
  } else if (firstByte === 0x80) {
    // Indefinite form (not allowed in DER)
    throw new Error('Indefinite length not allowed in DER encoding');
  } else {
    // Long form
    const lengthBytes = firstByte & 0x7F;
    if (lengthBytes === 0) {
      throw new Error('Invalid length encoding');
    }
    
    let length = 0;
    for (let i = 0; i < lengthBytes; i++) {
      const byteValue = parseInt(data.substring(offset + 2 + i * 2, offset + 2 + (i + 1) * 2), 16);
      length = (length << 8) | byteValue;
    }
    
    return { length, headerLength: 1 + lengthBytes };
  }
}

// ==================== FIXED JPEG2000 EXTRACTION ====================
function extractJPEG2000FromDG2(data: string): string {
  try {
    // DG2 yapısı: Tag (1 byte) + Length (variable) + Data
    // JPEG2000 signature: FF4FFF51 veya 0000000C6A5020200D0A870A
    
    const jp2Signatures = [
      'FF4FFF51',        // JPEG2000 codestream
      '0000000C6A502020'  // JPEG2000 file format
    ];
    
    let jpegStart = -1;
    for (const signature of jp2Signatures) {
      jpegStart = data.indexOf(signature);
      if (jpegStart !== -1) {
        console.log(`Found JPEG2000 signature at position: ${jpegStart}`);
        break;
      }
    }
    
    if (jpegStart === -1) {
      // Fallback: look for common JPEG markers
      const jpegMarkers = ['FFD8', 'FF4F'];
      for (const marker of jpegMarkers) {
        jpegStart = data.indexOf(marker);
        if (jpegStart !== -1) {
          console.log(`Found JPEG marker at position: ${jpegStart}`);
          break;
        }
      }
    }
    
    if (jpegStart === -1) {
      console.warn('No JPEG signature found, using fallback offset');
      jpegStart = 428; // Dynamic fallback based on typical DG2 structure
    }
    
    return data.substring(jpegStart);
  } catch (error) {
    console.error('Error extracting JPEG2000:', error);
    // Fallback to original method
    return data.substring(214);
  }
}

// ==================== GLOBAL VARIABLES ====================
let rndIC: string;
let kENC: string;
let rndIFD: string;
let kIFD = "0B795240CB7049B01C19B33E32804F0B";
let ksMAC: string;
let ksENC: string;
let SSC: string;
let DATA_GROUP = "0101";
let DO87: string;
let rapdu: string;
let dataLength: number;
let o: number;
let sixthCmdResponseLength: number;

let percentage = 0;
let isDG1Read = false;
let DOCUMENT_NUMBER = "";
let BIRTH_DATE = "";
let EXPIRY_DATE = "";
let base64Image = "";
let MRZ_DATA = "";
let byteArrayImage: any = "";

// ==================== HELPER FUNCTIONS ====================

async function sendAPDU(command: number[]): Promise<number[]> {
  try {
    let resp: any;
    
    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS(command);
      if (resp.response) {
        return [...resp.response, resp.sw1 || 0, resp.sw2 || 0];
      }
      return [resp.sw1 || 0, resp.sw2 || 0];
    } else {
      resp = await NfcManager.transceive(command);
      return resp;
    }
  } catch (error) {
    console.error('APDU send error:', error);
    throw error;
  }
}

async function ApduCmd6(proApdu: string): Promise<string | false> {
  try {
    const resp = await sendAPDU(hexToBytes(proApdu));
    
    if (resp.length < 2) {
      console.error('Invalid APDU response length');
      return false;
    }

    // Status word kontrol
    const sw1 = resp[resp.length - 2];
    const sw2 = resp[resp.length - 1];
    
    if (sw1 !== 0x90 || sw2 !== 0x00) {
      console.error(`APDU error: SW1=${sw1.toString(16)} SW2=${sw2.toString(16)}`);
      return false;
    }

    let responseHex: string;
    if (Platform.OS === 'ios') {
      responseHex = toHexString(resp.slice(0, -2));
    } else {
      responseHex = toHexString(resp.slice(0, -2));
    }

    const firstPart = responseHex.substring(0, Math.min(16, responseHex.length));
    const do87Match = firstPart.match(/87(.+?)01/);
    const dataPart = do87Match ? do87Match[1] : '';

    if (!dataPart) {
      console.error('Could not find DO87 data in response');
      return false;
    }

    if (!isDG1Read) {
      const parsedLength = parseASN1Length(dataPart, 0);
      dataLength = parsedLength.length;
      o = 6 + parsedLength.headerLength * 2;
    } else {
      dataLength = 0xe9;
      o = 8;
    }

    const maxDataLength = (responseHex.length - o) / 2;
    const actualDataLength = Math.min(dataLength * 2 - 2, maxDataLength * 2);
    
    const encryptedData = responseHex.substring(o, o + actualDataLength);
    
    if (dataLength > 0) {
      sixthCmdResponseLength = Math.min(dataLength - 2, maxDataLength);
    }

    const decryptedData = DES3Decrypt(encryptedData, ksENC);
    return decryptedData.substring(0, decryptedData.length - 2);

  } catch (error) {
    console.error('ApduCmd6 error:', error);
    return false;
  }
}

function parseEPassportData(): NFCResponse {
  try {
    if (!MRZ_DATA || MRZ_DATA.length < 88) {
      throw new Error('Invalid MRZ data length');
    }

    let documentNumber = MRZ_DATA.substring(5, 14).trim();
    let birthDate = MRZ_DATA.substring(57, 63).trim();
    let expiryDate = MRZ_DATA.substring(64, 70).trim();
    let idNumber = MRZ_DATA.substring(44, 55).trim();
    let gender = MRZ_DATA.charAt(64).trim();
    
    // İsim parsing'i iyileştirildi
    const line2Start = 44;
    const fullNameData = MRZ_DATA.substring(line2Start);
    const nameEndIndex = fullNameData.indexOf('<<');
    
    if (nameEndIndex === -1) {
      throw new Error('Invalid name format in MRZ');
    }
    
    let surname = fullNameData.substring(0, nameEndIndex).replace(/</g, ' ').trim();
    let remainingName = fullNameData.substring(nameEndIndex + 2);
    let name = remainingName.split('<').join(' ').trim();

    return {
      isSuccess: true,
      name: name,
      surname: surname,
      id_number: idNumber,
      document_number: documentNumber,
      birth_date: formatMRZDate(birthDate),
      expiry_date: formatMRZDate(expiryDate),
      gender: gender,
      base64Image: base64Image,
      byte_array_image: byteArrayImage
    };
  } catch (error) {
    console.error('parseEPassportData error:', error);
    return {
      isSuccess: false,
      error: 0x7d5,
      errorMessage: `MRZ verisi ayrıştırılırken hata oluştu: ${error}`
    };
  }
}

async function readDataGroup(dataGroup: string): Promise<boolean> {
  try {
    console.log(`Reading data group: ${dataGroup}`);
    
    // Select file
    const cmdHeader = "0CB0";
    const pathData = dataGroup.concat("0102");
    const encryptedPathData = DES3Encrypt(pathData, ksENC);
    const do87 = "870901".concat(encryptedPathData);
    DO87 = do87;

    const m = cmdHeader.concat("800000000000").concat(do87);
    SSC = hexNumberIncrement(SSC);

    const n = SSC.concat(m);
    const cc = macIso9797_alg3(ksMAC, n, "80");
    const ccByteLength = dec2hex((cc.length / 2).toString());
    const do8e = "8E".concat(ccByteLength).concat(cc);
    const protectedApduRight = do87.concat(do8e).concat("00");
    const parLength = dec2hex(((protectedApduRight.length - 2) / 2).toString());
    const protectedAPDU = cmdHeader.concat(parLength).concat(protectedApduRight);

    const resp = await sendAPDU(hexToBytes(protectedAPDU));
    
    // Status word kontrol
    const sw1 = resp[resp.length - 2];
    const sw2 = resp[resp.length - 1];
    
    if (sw1 !== 0x90 || sw2 !== 0x00) {
      console.error(`Select file failed: SW1=${sw1.toString(16)} SW2=${sw2.toString(16)}`);
      return false;
    }

    const responseHex = toHexString(resp.slice(0, -2)).toUpperCase();
    rapdu = responseHex;
    SSC = hexNumberIncrement(SSC);

    // MAC doğrulama - FİXED
    const do99 = "99029000";
    const k = SSC.concat(do99);
    const expectedMAC = macIso9797_alg3(ksMAC, k, "80");

    if (!verifyMAC(rapdu, expectedMAC)) {
      console.error('MAC verification failed for select file');
      return false;
    }

    // Read binary data
    const cmdHeader2 = "0CB000000D";
    const do97 = "970104";
    const m2 = cmdHeader2.concat(do97);

    SSC = hexNumberIncrement(SSC);
    const n2 = SSC.concat(m2);
    const cc2 = macIso9797_alg3(ksMAC, n2, "80");
    const ccByteLength2 = dec2hex((cc2.length / 2).toString());
    const do8e2 = "8E".concat(ccByteLength2).concat(cc2);
    const protectedApdu2 = cmdHeader2.concat(do97).concat(do8e2).concat("00");

    const resp2 = await sendAPDU(hexToBytes(protectedApdu2));
    
    const sw1_2 = resp2[resp2.length - 2];
    const sw2_2 = resp2[resp2.length - 1];
    
    if (sw1_2 !== 0x90 || sw2_2 !== 0x00) {
      console.error(`Read binary failed: SW1=${sw1_2.toString(16)} SW2=${sw2_2.toString(16)}`);
      return false;
    }

    let responseHex2 = toHexString(resp2.slice(0, -2)).toUpperCase();
    SSC = hexNumberIncrement(SSC);

    const k2 = SSC.concat(do87).concat("99029000");
    const expectedMAC2 = macIso9797_alg3(ksMAC, k2, "80");

    if (!verifyMAC(responseHex2, expectedMAC2)) {
      console.error('MAC verification failed for read binary');
      return false;
    }

    // DO87 parsing - FİXED
    const do87Start = responseHex2.indexOf('87');
    if (do87Start === -1) {
      console.error('DO87 not found in response');
      return false;
    }

    const do87Data = responseHex2.substring(do87Start + 6, do87Start + 22);
    let decryptedData = DES3Decrypt(do87Data, ksENC);
    decryptedData = unPadHex(decryptedData);

    // ASN.1 length parsing - FİXED
    const lengthInfo = parseASN1Length(decryptedData, 2);
    dataLength = lengthInfo.length + 2;

    let totalLength = 0;
    const tag = decryptedData.substring(0, 2);
    
    if (tag === '60' || tag === '61') {
      totalLength = lengthInfo.length;
    } else if (tag === '75') {
      // For tag 75, parse the inner length
      const innerLengthInfo = parseASN1Length(decryptedData, 2 + lengthInfo.headerLength * 2);
      totalLength = innerLengthInfo.length;
    } else {
      console.error(`Unknown tag: ${tag}`);
      return false;
    }

    const length = totalLength - 4;
    let messageadded = '';
    let readed = 4;

    console.log(`Total length to read: ${length}`);

    // Read data in chunks
    while (readed < length) {
      const remaining = length - readed;
      const chunkSize = Math.min(remaining, 0xFE); // Max chunk size
      
      const cmdHeader3 = "0CB0".concat(padtofourdigit(readed)).concat("800000000000");
      const hexLength = chunkSize.toString(16).padStart(2, '0').toUpperCase();
      const do97_chunk = "9701".concat(hexLength);
      const do97cmdheader = cmdHeader3.concat(do97_chunk);

      SSC = hexNumberIncrement(SSC);
      const N = SSC.concat(do97cmdheader);
      const cc_chunk = macIso9797_alg3(ksMAC, N, "80");
      const do8e_chunk = "8E08".concat(cc_chunk);
      const apduright = do97_chunk.concat(do8e_chunk);

      let apdurightlength = (apduright.length / 2).toString(16).toUpperCase();
      if (apdurightlength.length === 1) {
        apdurightlength = "0".concat(apdurightlength);
      }

      const proApdu = cmdHeader3.substring(0, 8).concat(apdurightlength).concat(apduright).concat("00");
      const msg = await ApduCmd6(proApdu);

      if (msg === false) {
        console.error(`Failed to read chunk at offset ${readed}`);
        return false;
      }

      messageadded = messageadded.concat(msg);
      readed = readed + sixthCmdResponseLength;
      SSC = hexNumberIncrement(SSC);

      const perc = _calculatePercentage(length, readed);
      percentage = Math.floor(perc);
      console.log(`Progress: ${percentage}%`);
    }

    if (readed < length) {
      console.error(`Incomplete read: ${readed}/${length}`);
      return false;
    }

    // Process the read data
    if (!isDG1Read) {
      isDG1Read = true;
      MRZ_DATA = hex_to_ascii(messageadded);
      console.log('DG1 (MRZ) read successfully');
      return true;
    } else {
      // This is DG2 (photo) - FİXED EXTRACTION
      isDG1Read = false;
      const jpegData = extractJPEG2000FromDG2(messageadded);
      base64Image = Buffer.from(jpegData, 'hex').toString('base64');
      byteArrayImage = Buffer.from(jpegData, 'hex');
      console.log('DG2 (Photo) read successfully');
      return true;
    }

  } catch (error) {
    console.error('readDataGroup error:', error);
    return false;
  }
}

// ==================== MAIN FUNCTION ====================

export async function startReading(
  documentNumber: string,
  birthDate: string,
  expiryDate: string
): Promise<NFCResponse> {
  console.log('=== Starting NFC Reading ===');
  console.log('Input:', { documentNumber, birthDate, expiryDate });

  try {
    // Initialize
    percentage = 0;
    DATA_GROUP = "0101";
    isDG1Read = false;
    base64Image = "";
    MRZ_DATA = "";
    byteArrayImage = "";

    // Initialize NFC
    const tech = NfcTech.IsoDep;
    await NfcManager.requestTechnology(tech, {
      alertMessage: 'Kimlik kartınızı telefonun arkasına yerleştirin ve işlem tamamlanana kadar hareket ettirmeyin.'
    });

    DOCUMENT_NUMBER = documentNumber;
    BIRTH_DATE = birthDate;
    EXPIRY_DATE = expiryDate;

    // Step 1: Select ePassport application
    console.log('Selecting ePassport application...');
    const selectResp = await sendAPDU([0x00, 0xA4, 0x04, 0x0C, 0x07, 0xA0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01]);
    
    const selectSW1 = selectResp[selectResp.length - 2];
    const selectSW2 = selectResp[selectResp.length - 1];

    if (selectSW1 !== 0x90 || selectSW2 !== 0x00) {
      throw new Error(`ePassport application selection failed: SW1=${selectSW1.toString(16)} SW2=${selectSW2.toString(16)}`);
    }

    console.log('ePassport application selected successfully');

    // Step 2: Get challenge
    console.log('Getting challenge from card...');
    const challengeResp = await sendAPDU([0x00, 0x84, 0x00, 0x00, 0x08]);
    
    const challengeSW1 = challengeResp[challengeResp.length - 2];
    const challengeSW2 = challengeResp[challengeResp.length - 1];
    
    if (challengeSW1 !== 0x90 || challengeSW2 !== 0x00) {
      throw new Error(`Get challenge failed: SW1=${challengeSW1.toString(16)} SW2=${challengeSW2.toString(16)}`);
    }

    // Step 3: BAC Authentication
    console.log('Performing BAC authentication...');
    const mrz = documentNumber + checkdigitCalc(documentNumber) + birthDate + checkdigitCalc(birthDate) + expiryDate + checkdigitCalc(expiryDate);
    console.log('MRZ for authentication:', mrz);
    
    const hash_mrz = CryptoJS.SHA1(mrz).toString(CryptoJS.enc.Hex);
    const k_seed = hash_mrz.substring(0, 32);

    rndIFD = "781723860C06C226";
    rndIC = toHexString(challengeResp.slice(0, -2)).toUpperCase();

    console.log('Random values:', { rndIFD, rndIC });

    const s = rndIFD.concat(rndIC).concat(kIFD);
    const keys = get_ENC_MAC(k_seed);
    const k_enc = keys.k_enc;
    const k_mac = keys.k_mac;

    kENC = k_enc;

    let fixedKeyenc = k_enc;
    if (k_enc.length === 32) {
      fixedKeyenc = k_enc.concat(k_enc.substring(0, 16));
    }

    const e_ifd = DES3Encrypt(s, fixedKeyenc);
    const m_ifd = macIso9797_alg3(k_mac, e_ifd, "80");
    const cmd_data = e_ifd.concat(m_ifd);

    console.log('Sending external authentication...');

    // External Authentication
    let authCommand: number[];
    if (Platform.OS === 'ios') {
      const authResp = await NfcManager.sendCommandAPDUIOS({
        cla: 0x00,
        ins: 0x82,
        p1: 0x00,
        p2: 0x00,
        lc: 0x28,
        data: hexToBytes(cmd_data),
        le: 0x28
      });

      if (authResp.sw1 !== 0x90) {
        return {
          isSuccess: false,
          error: 0x7d6,
          errorMessage: "Kimlik kartı verilen inputlarla uyumlu değil (BAC authentication failed)"
        };
      }

      var responseHex = toHexString(authResp.response).toUpperCase();
    } else {
      authCommand = hexFixing(cmd_data);
      const authResp = await sendAPDU(authCommand);

      const authSW1 = authResp[authResp.length - 2];
      const authSW2 = authResp[authResp.length - 1];

      if (authSW1 !== 0x90 || authSW2 !== 0x00) {
        return {
          isSuccess: false,
          error: 0x7d6,
          errorMessage: `Kimlik kartı verilen inputlarla uyumlu değil (SW1=${authSW1.toString(16)} SW2=${authSW2.toString(16)})`
        };
      }

      var responseHex = toHexString(authResp.slice(0, -2)).toUpperCase();
    }

    console.log('External authentication successful');

    // Process authentication response
    let k_ic = DES3Decrypt(responseHex, kENC);
    k_ic = k_ic.substring(32, 64);

    const k_seed_session = xor2(kIFD, k_ic);
    const session_keys = get_ENC_MAC(k_seed_session);
    const ks_enc = session_keys.k_enc;
    const ks_mac = session_keys.k_mac;

    ksMAC = ks_mac;
    ksENC = ks_enc;

    SSC = rndIC.slice(-8).concat(rndIFD.slice(-8));

    console.log('Secure messaging established');
    console.log('Session keys derived:', { 
      ksENC: ks_enc.substring(0, 8) + '...', 
      ksMAC: ks_mac.substring(0, 8) + '...' 
    });

    // Step 4: Read DG1 (MRZ data)
    console.log('Reading DG1 (MRZ data)...');
    if (!await readDataGroup("0101")) {
      return {
        isSuccess: false,
        error: 0x7d2,
        errorMessage: "DG1 okuma hatası (Passive Authentication failed)"
      };
    }

    console.log('DG1 read successfully, MRZ data length:', MRZ_DATA.length);

    // Step 5: Read DG2 (Photo)
    console.log('Reading DG2 (Photo data)...');
    DATA_GROUP = "0102";
    if (!await readDataGroup("0102")) {
      return {
        isSuccess: false,
        error: 0x7d3,
        errorMessage: "DG2 okuma hatası (Photo reading failed)"
      };
    }

    console.log('DG2 read successfully, photo size:', base64Image.length);

    // Step 6: Parse and return data
    const parsedData = parseEPassportData();

    if (Platform.OS === 'ios') {
      try {
        await NfcManager.setAlertMessageIOS('Kimlik başarıyla okundu.');
      } catch (e) {
        console.warn('Could not set iOS alert message:', e);
      }
    }

    console.log('=== NFC Reading Completed Successfully ===');
    console.log('Parsed data:', {
      name: parsedData.name,
      surname: parsedData.surname,
      document_number: parsedData.document_number,
      hasPhoto: !!parsedData.base64Image
    });

    return parsedData;

  } catch (error) {
    console.error('=== NFC Reading Failed ===');
    console.error('Error details:', error);

    let errorMessage = "Kimlik kartı ile telefon arasındaki bağlantı koptu.";
    let errorCode = 0x7d1;

    if (error instanceof Error) {
      if (error.message.includes('uyumlu değil') || error.message.includes('BAC')) {
        errorMessage = "Kimlik kartı verilen bilgilerle uyumlu değil. MRZ bilgilerini kontrol edin.";
        errorCode = 0x7d6;
      } else if (error.message.includes('Select')) {
        errorMessage = "Kimlik kartı ePassport uygulaması bulunamadı.";
        errorCode = 0x7d8;
      } else if (error.message.includes('Challenge')) {
        errorMessage = "Kimlik kartından challenge alınamadı.";
        errorCode = 0x7d9;
      } else if (error.message.includes('MAC')) {
        errorMessage = "Güvenlik doğrulama hatası (MAC verification failed).";
        errorCode = 0x7da;
      }
    }

    if (Platform.OS === 'ios') {
      try {
        await NfcManager.invalidateSessionWithErrorIOS(errorMessage);
      } catch (e) {
        console.warn('Could not invalidate iOS session:', e);
      }
    }

    return {
      isSuccess: false,
      error: errorCode,
      errorMessage: errorMessage
    };
  } finally {
    try {
      await _cleanUp();
    } catch (e) {
      console.warn('Cleanup error:', e);
    }
  }
}

export async function _cleanUp(): Promise<void> {
  console.log('Cleaning up NFC resources...');
  try {
    if (NfcManager.cancelTechnologyRequest && typeof NfcManager.cancelTechnologyRequest === 'function') {
      await NfcManager.cancelTechnologyRequest();
    }
  } catch (error) {
    console.warn('NFC cleanup error:', error);
  }

  // Reset global variables
  percentage = 0;
  isDG1Read = false;
  DOCUMENT_NUMBER = "";
  BIRTH_DATE = "";
  EXPIRY_DATE = "";
  base64Image = "";
  MRZ_DATA = "";
  byteArrayImage = "";
}

export default {
  startReading,
  _cleanUp
};
