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
  isSuccess?: boolean;
  data?: any;
  error?: string;
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

// ==================== UTILITY FUNCTIONS FROM ORIGINAL ====================

/**
 * Convert hex string to ASCII (from original code)
 */
function hex_to_ascii(hex: string): string {
  let ascii = "";
  for (let i = 0; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return ascii;
}

/**
 * Convert hex to bytes array (from original code)
 */
function hexToBytes(hex: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

/**
 * Convert bytes to hex string (from original code)
 */
function toHexString(bytes: number[]): string {
  return Array.from(bytes, function(byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("").toUpperCase();
}

/**
 * Calculate check digit (from original code)
 */
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

/**
 * Get ENC and MAC keys (from original code)
 */
function get_ENC_MAC(seed: string): { k_enc: string; k_mac: string } {
  const seedWithCounter1 = seed.concat("00000001");
  const hash1 = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(seedWithCounter1)).toString(CryptoJS.enc.Hex);
  hash1.toUpperCase();

  const kenc1 = hash1.substring(0, 16);
  const kenc2 = hash1.substring(16, 32);
  const k_enc = kenc1.concat(kenc2);

  const seedWithCounter2 = seed.concat("00000002");
  const hash2 = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(seedWithCounter2)).toString(CryptoJS.enc.Hex);
  hash2.toUpperCase();

  const kmac1 = hash2.substring(0, 16);
  const kmac2 = hash2.substring(16, 32);
  const k_mac = kmac1.concat(kmac2);

  return { k_enc, k_mac };
}

/**
 * 3DES Encryption (from original code)
 */
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

/**
 * 3DES Decryption (from original code)
 */
function DES3Decrypt(encryptedData: string, key: string): string {
  const iv = CryptoJS.enc.Hex.parse("00000000");
  const config = {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  };

  const encryptedObj = {
    ciphertext: CryptoJS.enc.Hex.parse(encryptedData)
  };

  const decrypted = CryptoJS.TripleDES.decrypt(encryptedObj, CryptoJS.enc.Hex.parse(key), config);

  return decrypted.toString(CryptoJS.enc.Hex).toUpperCase();
}

/**
 * MAC ISO 9797 Algorithm 3 (from original code)
 */
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

/**
 * XOR two hex strings (improved version)
 */
function xor2(hex1: string, hex2: string): string {
  const buffer1 = Buffer.from(hex1, 'hex');
  const buffer2 = Buffer.from(hex2, 'hex');
  const result = buffer1.map((byte, index) => byte ^ buffer2[index]);
  return result.toString('hex').toUpperCase();
}

/**
 * Hex to decimal conversion (from original code)
 */
function hex2decimal(hex: string): string {
  function addStrings(str1: string, str2: string): string {
    let carry = 0;
    let result: number[] = [];
    str1 = str1.split("").map(Number);
    str2 = str2.split("").map(Number);

    while (str1.length || str2.length) {
      const sum = (str1.pop() || 0) + (str2.pop() || 0) + carry;
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

/**
 * Decimal to hex conversion (from original code)
 */
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

  return result;
}

/**
 * Hex number increment (from original code)
 */
function hexNumberIncrement(hex: string): string {
  const decimal = bigInt(hex2decimal(hex));
  const incremented = decimal.add("1");
  return incremented.toString(16).toUpperCase();
}

/**
 * Pad to 4 digits (from original code)
 */
function padtofourdigit(num: number): string {
  const hexValue = num.toString(16);
  const padding = "0".repeat(4 - hexValue.length).concat(hexValue);
  return padding;
}

/**
 * UnPad hex (from original code)
 */
function unPadHex(hex: string): string {
  const index = hex.lastIndexOf("80");
  for (let i = index + 1; i < hex.length; i++) {
    if (hex.charAt(i) != "0") return hex;
  }
  return hex.substring(0, index);
}

/**
 * Calculate percentage (from original code)
 */
function _calculatePercentage(total: number, current: number): number {
  return (current * 100) / total;
}

/**
 * Hex fixing (from original code)
 */
function hexFixing(hex: string): number[] {
  const result = [0, 0x82, 0, 0, 0x28];
  for (let i = 0; i < hex.length; i += 2) {
    const byte = parseInt(hex.substr(i, 2), 16);
    result.push(byte);
  }
  result.push(0x28);
  return result;
}

// ==================== GLOBAL VARIABLES (from original code) ====================
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

// ==================== MAIN NFC READING FUNCTION ====================

/**
 * Start NFC reading process (based on original working code)
 */
export async function startReading(
  documentNumber: string,
  birthDate: string,
  expiryDate: string
): Promise<NFCResponse> {
  console.log('=== Starting NFC Reading (Revised) ===');
  console.log('Input:', { documentNumber, birthDate, expiryDate });

  try {
    // Initialize global variables
    percentage = 0;
    DATA_GROUP = "0101";
    isDG1Read = false;

    // Initialize NFC
    console.log('Initializing NFC...');
    const tech = NfcTech.IsoDep;
    await NfcManager.requestTechnology(tech, {
      alertMessage: 'Please put your ID card on the back of the phone and do not move it until the check mark.'
    });

    // Set global variables
    DOCUMENT_NUMBER = documentNumber;
    BIRTH_DATE = birthDate;
    EXPIRY_DATE = expiryDate;

    // Step 1: Select ePassport application
    console.log('Selecting ePassport application...');
    let resp: any;

    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS([0x00, 0xA4, 0x04, 0x0C, 0x07, 0xA0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01]);
      resp = resp.sw1;
    } else {
      resp = await NfcManager.transceive([0x00, 0xA4, 0x04, 0x0C, 0x07, 0xA0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01]);
      resp = resp[0];
    }

    if (resp !== 0x90) {
      throw new Error('Failed to select ePassport application');
    }

    // Step 2: Get challenge
    console.log('Getting challenge...');
    if (Platform.OS === 'ios') {
      resp = await NfcManager.sendCommandAPDUIOS([0x00, 0x84, 0x00, 0x00, 0x08]);
    } else {
      resp = await NfcManager.transceive([0x00, 0x84, 0x00, 0x00, 0x08]);
    }

    // Step 3: Prepare MRZ data and keys (using original logic)
    const mrz = documentNumber + checkdigitCalc(documentNumber) + birthDate + checkdigitCalc(birthDate) + expiryDate + checkdigitCalc(expiryDate);
    const hash_mrz = CryptoJS.SHA1(mrz).toString(CryptoJS.enc.Hex);
    const k_seed = hash_mrz.substring(0, 32);

    console.log('MRZ:', mrz);
    console.log('MRZ Hash:', hash_mrz);
    console.log('K_seed:', k_seed);

    // Generate random numbers (using original fixed values for compatibility)
    rndIFD = "781723860C06C226";

    // Extract rndIC from challenge response
    if (Platform.OS === 'ios') {
      rndIC = toHexString(resp.response).toUpperCase();
    } else {
      rndIC = toHexString(resp.slice(0, -2)).toUpperCase();
    }

    console.log('rndIC:', rndIC);
    console.log('rndIFD:', rndIFD);
    console.log('kIFD:', kIFD);

    // Prepare authentication data (using original logic)
    const s = rndIFD.concat(rndIC).concat(kIFD);
    const keys = get_ENC_MAC(k_seed);
    const k_enc = keys.k_enc;
    const k_mac = keys.k_mac;

    console.log('s (auth data):', s);
    console.log('k_enc:', k_enc);
    console.log('k_mac:', k_mac);

    kENC = k_enc;

    // Fix key for encryption (from original code)
    let fixedKeyenc = k_enc;
    if (k_enc.length == 32) {
      fixedKeyenc = k_enc.concat(k_enc.substring(0, 16));
    }

    console.log('fixedKeyenc:', fixedKeyenc);

    // Encrypt authentication data
    const e_ifd = DES3Encrypt(s, fixedKeyenc);
    console.log('e_ifd (encrypted):', e_ifd);

    // Calculate MAC
    const m_ifd = macIso9797_alg3(k_mac, e_ifd, "80");
    console.log('m_ifd (MAC):', m_ifd);

    // Prepare command data
    const cmd_data = e_ifd.concat(m_ifd);
    console.log('cmd_data:', cmd_data);

    // Step 4: External Authentication
    console.log('Performing external authentication...');

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

      if (resp.sw1 != 0x90) {
        throw new Error(`External authentication failed: SW1=${resp.sw1.toString(16)}, SW2=${resp.sw2?.toString(16) || '00'}`);
      }
    } else {
      resp = await NfcManager.transceive(hexFixing(cmd_data));

      if (resp[resp.length - 2] != 0x90) {
        throw new Error(`External authentication failed: SW1=${resp[resp.length - 2].toString(16)}, SW2=${resp[resp.length - 1].toString(16)}`);
      }
    }

    console.log('External authentication successful!');

    // Step 5: Process authentication response and derive session keys
    let responseHex: string;
    if (Platform.OS === 'ios') {
      responseHex = toHexString(resp.response).toUpperCase();
    } else {
      responseHex = toHexString(resp.slice(0, -2)).toUpperCase();
    }

    console.log('Auth response:', responseHex);

    // Decrypt response and extract kIC
    let k_ic = DES3Decrypt(responseHex, kENC);
    k_ic = k_ic.substring(32, 64);

    console.log('k_ic:', k_ic);

    // Derive session keys
    const k_seed_session = xor2(kIFD, k_ic);
    const session_keys = get_ENC_MAC(k_seed_session);
    const ks_enc = session_keys.k_enc;
    const ks_mac = session_keys.k_mac;

    ksMAC = ks_mac;
    ksENC = ks_enc;

    console.log('Session keys derived - ksENC:', ks_enc, 'ksMAC:', ks_mac);

    // Initialize SSC (Send Sequence Counter)
    SSC = rndIC.slice(-8).concat(rndIFD.slice(-8));

    console.log('SSC initialized:', SSC);

    console.log('=== BAC Authentication Completed Successfully ===');

    // Now we can proceed with secure messaging to read data groups
    // For now, return success with basic info

    return {
      success: true,
      isSuccess: true,
      documentNumber,
      birthDate,
      expiryDate,
      data: {
        message: "BAC authentication successful",
        sessionKeys: { ksENC, ksMAC },
        ssc: SSC
      }
    };

  } catch (error) {
    console.error('=== NFC Reading Failed ===');
    console.error('Error:', error);

    let errorMessage = "Unknown error occurred";
    let errorCode = 0x7d1;

    if (error instanceof Error) {
      errorMessage = error.message;

      // Specific error handling based on original code
      if (error.message.includes('SW1=69, SW2=82')) {
        errorMessage = "Kimlik karti verilen inputlarla uyumlu degil.";
        errorCode = 0x7d6;
      } else if (error.message.includes('APDU error')) {
        errorMessage = "Kimlik karti ile telefon arasindaki baglanti koptu.";
        errorCode = 0x7d1;
      }
    }

    return {
      success: false,
      isSuccess: false,
      error: errorCode,
      errorMessage
    };
  } finally {
    // Clean up will be handled by the calling function
  }
}

/**
 * Clean up NFC resources
 */
export async function _cleanUp(): Promise<void> {
  console.log('Cleaning up NFC resources...');

  try {
    if (NfcManager.cancelTechnologyRequest && typeof NfcManager.cancelTechnologyRequest === 'function') {
      await NfcManager.cancelTechnologyRequest();
      console.log('Technology request cancelled');
    }

    console.log('NFC cleanup completed');
  } catch (error) {
    console.warn('NFC cleanup error:', error);
  }
}

// ==================== EXPORTS ====================

export default {
  startReading,
  _cleanUp
};