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
  const iv = CryptoJS.enc.Hex.parse("00000000");
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
  const iv = CryptoJS.enc.Hex.parse("00000000");
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
    const macHex = toHexString(mac);
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
    remainder = 1 * digits.shift()!;
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

async function ApduCmd6(proApdu: string): Promise<string | false> {
  try {
    let resp: any;

    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS(hexToBytes(proApdu));
    } else {
      resp = await NfcManager.transceive(hexToBytes(proApdu));
    }

    let responseHex: string;
    if (Platform.OS === 'ios') {
      responseHex = toHexString(resp.response).concat("9000");
    } else {
      responseHex = toHexString(resp);
    }

    const firstPart = responseHex.substring(0, 16);
    const dataPart = firstPart.split('87').pop()?.split('01')[0] || '';

    if (!isDG1Read) {
      const firstByte = parseInt(hex2decimal(dataPart.substring(0, 2)));
      if (firstByte <= 0x80) {
        dataLength = firstByte;
        o = 6;
      } else if (firstByte === 0x81) {
        dataLength = parseInt(hex2decimal(dataPart.substring(2, 4)));
        o = 8;
      } else if (firstByte === 0x82) {
        dataLength = parseInt(hex2decimal(dataPart.substring(2, 6)));
        o = 10;
      } else {
        return false;
      }
    } else {
      dataLength = 0xe9;
      o = 8;
    }

    const encryptedData = responseHex.substring(o, o + dataLength * 2 - 2).split('').join('');
    if (dataLength > 0) {
      sixthCmdResponseLength = dataLength - 2;
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
    let documentNumber = MRZ_DATA.substring(6, 15);
    let birthDate = MRZ_DATA.substring(31, 37);
    let expiryDate = MRZ_DATA.substring(39, 45);
    let idNumber = MRZ_DATA.substring(17, 28);
    let gender = MRZ_DATA.charAt(38);
    let fullName = MRZ_DATA.substring(61, MRZ_DATA.length);

    const nameIndex = fullName.indexOf('<<');
    let surname = fullName.substring(0, nameIndex);
    let name = fullName.substring(nameIndex + 2, fullName.lastIndexOf('<'));
    name = name.split('<').join(' ');

    return {
      isSuccess: true,
      name: name,
      surname: surname,
      id_number: idNumber,
      document_number: documentNumber,
      birth_date: birthDate,
      expiry_date: expiryDate,
      gender: gender,
      base64Image: base64Image,
      byte_array_image: byteArrayImage
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: 0x7d5,
      errorMessage: "MRZ verisi ayrıştırılırken hata oluştu."
    };
  }
}

async function readDataGroup(dataGroup: string): Promise<boolean> {
  try {
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

    let resp: any;
    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS(hexToBytes(protectedAPDU));
    } else {
      resp = await NfcManager.transceive(hexToBytes(protectedAPDU));
    }

    let responseHex: string;
    if (Platform.OS === 'ios') {
      responseHex = toHexString(resp.response).toUpperCase();
    } else {
      responseHex = toHexString(resp.slice(0, -2)).toUpperCase();
    }

    rapdu = responseHex;
    SSC = hexNumberIncrement(SSC);

    // Verify MAC
    const do99 = "99029000";
    const k = SSC.concat(do99);
    const cc_ = macIso9797_alg3(ksMAC, k, "80");

    if (!rapdu.includes(cc_)) {
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
    const protectedApdu2 = "0CB000000D".concat(do97).concat(do8e2).concat("00");

    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS(hexToBytes(protectedApdu2));
    } else {
      resp = await NfcManager.transceive(hexToBytes(protectedApdu2));
    }

    if (Platform.OS === 'ios') {
      responseHex = toHexString(resp.response).toUpperCase();
    } else {
      responseHex = toHexString(resp.slice(0, -2)).toUpperCase();
    }

    responseHex = responseHex.concat("9000");
    SSC = hexNumberIncrement(SSC);

    const k2 = SSC.concat(do87).concat("99029000");
    const cc_2 = macIso9797_alg3(ksMAC, k2, "80");
    const do87_response = responseHex.substring(6, 22);
    let decryptedData = DES3Decrypt(do87_response, ksENC);
    decryptedData = unPadHex(decryptedData);

    const dataLengthHex = decryptedData.substring(2, 4);
    dataLength = parseInt(hex2decimal(dataLengthHex)) + 2;

    let totalLength = 0;
    if (decryptedData.substring(0, 2) === '60' || decryptedData.substring(0, 2) === '61') {
      totalLength = parseInt(hex2decimal(decryptedData.substring(2, 4)));
    } else if (decryptedData.substring(0, 2) === '75') {
      totalLength = parseInt(hex2decimal(decryptedData.substring(4, decryptedData.length)));
    }

    const length = totalLength - 4;
    let messageadded = '';
    let readed = 4;

    // Read data in chunks
    while (readed <= length) {
      const cmdHeader3 = "0CB0".concat(padtofourdigit(readed)).concat("800000000000");
      let hexLength: string;

      if (length - readed > 0x100) {
        hexLength = "00";
      } else {
        hexLength = (length - readed).toString(16).toUpperCase();
      }

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
        return false;
      }

      messageadded = messageadded.concat(msg);
      readed = readed + sixthCmdResponseLength;
      SSC = hexNumberIncrement(SSC);

      const perc = _calculatePercentage(length, readed);
      percentage = Math.floor(perc);
    }

    if (readed < length) {
      return false;
    }

    // Process the read data
    if (!isDG1Read) {
      isDG1Read = true;
      MRZ_DATA = hex_to_ascii(messageadded);
      return true;
    } else {
      // This is DG2 (photo)
      isDG1Read = false;
      messageadded = messageadded.substring(214, messageadded.length);
      base64Image = Buffer.from(messageadded, 'hex').toString('base64');
      byteArrayImage = Buffer.from(messageadded, 'hex');
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
    let resp: any;
    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS([0x00, 0xA4, 0x04, 0x0C, 0x07, 0xA0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01]);
      resp = resp.sw1;
    } else {
      resp = await NfcManager.transceive([0x00, 0xA4, 0x04, 0x0C, 0x07, 0xA0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01]);
      resp = resp[0];
    }

    if (resp !== 0x90) {
      throw new Error('ePassport uygulaması seçilemedi');
    }

    // Step 2: Get challenge
    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS([0x00, 0x84, 0x00, 0x00, 0x08]);
    } else {
      resp = await NfcManager.transceive([0x00, 0x84, 0x00, 0x00, 0x08]);
    }

    // Step 3: BAC Authentication
    const mrz = documentNumber + checkdigitCalc(documentNumber) + birthDate + checkdigitCalc(birthDate) + expiryDate + checkdigitCalc(expiryDate);
    const hash_mrz = CryptoJS.SHA1(mrz).toString(CryptoJS.enc.Hex);
    const k_seed = hash_mrz.substring(0, 32);

    rndIFD = "781723860C06C226";

    if (Platform.OS === 'ios') {
      rndIC = toHexString(resp.response).toUpperCase();
    } else {
      rndIC = toHexString(resp.slice(0, -2)).toUpperCase();
    }

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

    // External Authentication
    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS({
        cla: 0x00,
        ins: 0x82,
        p1: 0x00,
        p2: 0x00,
        lc: 0x28,
        data: hexToBytes(cmd_data),
        le: 0x28
      });

      if (resp.sw1 !== 0x90) {
        return {
          isSuccess: false,
          error: 0x7d6,
          errorMessage: "Kimlik kartı verilen inputlarla uyumlu değil."
        };
      }
    } else {
      resp = await NfcManager.transceive(hexFixing(cmd_data));

      if (resp[resp.length - 2] !== 0x90) {
        return {
          isSuccess: false,
          error: 0x7d6,
          errorMessage: "Kimlik kartı verilen inputlarla uyumlu değil."
        };
      }
    }

    // Process authentication response
    let responseHex: string;
    if (Platform.OS === 'ios') {
      responseHex = toHexString(resp.response).toUpperCase();
    } else {
      responseHex = toHexString(resp.slice(0, -2)).toUpperCase();
    }

    let k_ic = DES3Decrypt(responseHex, kENC);
    k_ic = k_ic.substring(32, 64);

    const k_seed_session = xor2(kIFD, k_ic);
    const session_keys = get_ENC_MAC(k_seed_session);
    const ks_enc = session_keys.k_enc;
    const ks_mac = session_keys.k_mac;

    ksMAC = ks_mac;
    ksENC = ks_enc;

    SSC = rndIC.slice(-8).concat(rndIFD.slice(-8));

    console.log('BAC Authentication successful');

    // Step 4: Read DG1 (MRZ data)
    console.log('Reading DG1...');
    if (!await readDataGroup("0101")) {
      return {
        isSuccess: false,
        error: 0x7d2,
        errorMessage: "Kimlik kartı Passive Authentication doğrulanamadı."
      };
    }

    // Step 5: Read DG2 (Photo)
    console.log('Reading DG2...');
    DATA_GROUP = "0102";
    if (!await readDataGroup("0102")) {
      return {
        isSuccess: false,
        error: 0x7d3,
        errorMessage: "Kimlik kartı Active Authentication doğrulanamadı."
      };
    }

    // Step 6: Parse and return data
    const parsedData = parseEPassportData();

    if (Platform.OS === 'ios') {
      await NfcManager.setAlertMessageIOS('Kimlik başarıyla okundu.');
    }

    console.log('=== NFC Reading Completed Successfully ===');
    return parsedData;

  } catch (error) {
    console.error('=== NFC Reading Failed ===');
    console.error('Error:', error);

    let errorMessage = "Kimlik kartı ile telefon arasındaki bağlantı koptu.";
    let errorCode = 0x7d1;

    if (error instanceof Error) {
      if (error.message.includes('uyumlu değil')) {
        errorMessage = "Kimlik kartı verilen inputlarla uyumlu değil.";
        errorCode = 0x7d6;
      }
    }

    if (Platform.OS === 'ios') {
      await NfcManager.invalidateSessionWithErrorIOS();
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
}

export default {
  startReading,
  _cleanUp
};