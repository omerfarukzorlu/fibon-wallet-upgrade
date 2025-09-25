import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { Platform } from 'react-native';

// React Native için güvenli rastgele sayı üretimi
let secureRandom: any;
try {
  // React Native Crypto modülünü dene
  secureRandom = require('react-native-randombytes');
} catch (e) {
  console.warn('react-native-randombytes not available, using fallback');
  secureRandom = null;
}

// ==================== TYPES ====================
interface NFCResponse {
  success: boolean;
  data?: any;
  error?: string;
  documentNumber?: string;
  birthDate?: string;
  expiryDate?: string;
  personalData?: any;
  photo?: string;
}

interface MRZData {
  documentNumber: string;
  birthDate: string;
  expiryDate: string;
  documentChecksum: number;
  birthChecksum: number;
  expiryChecksum: number;
}

// ==================== CONSTANTS ====================
const APDU_COMMANDS = {
  SELECT_EPASSPORT: [0x00, 0xA4, 0x04, 0x0C, 0x07, 0xA0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01],
  GET_CHALLENGE: [0x00, 0x84, 0x00, 0x00, 0x08],
  EXTERNAL_AUTHENTICATE: [0x00, 0x82, 0x00, 0x00, 0x28],
  SELECT_EF_COM: [0x0C, 0xA4, 0x02, 0x0C, 0x02, 0x01, 0x1E],
  SELECT_EF_DG1: [0x0C, 0xA4, 0x02, 0x0C, 0x02, 0x01, 0x01],
  READ_BINARY: [0x0C, 0xB0, 0x00, 0x00, 0x04]
};

const SW_SUCCESS = [0x90, 0x00];
const CRYPTO_SETTINGS = {
  IV: "0000000000000000",
  PADDING: CryptoJS.pad.NoPadding
};

// ==================== SECURE RANDOM FUNCTIONS ====================

/**
 * Generate secure random bytes - React Native compatible
 */
function generateSecureRandomBytes(length: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    if (secureRandom && secureRandom.randomBytes) {
      // Use react-native-randombytes if available
      secureRandom.randomBytes(length, (error: any, bytes: any) => {
        if (error) {
          console.warn('secureRandom error, using fallback:', error);
          resolve(generateFallbackRandomBytes(length));
        } else {
          resolve(Buffer.from(bytes));
        }
      });
    } else {
      // Fallback to crypto-js random
      resolve(generateFallbackRandomBytes(length));
    }
  });
}

/**
 * Fallback random generation using crypto-js
 */
function generateFallbackRandomBytes(length: number): Buffer {
  console.log('Using fallback random generation');

  // Use crypto-js for random generation
  const randomWords = CryptoJS.lib.WordArray.random(length);
  const randomHex = randomWords.toString(CryptoJS.enc.Hex);

  // Add additional entropy from timestamp and Math.random
  const timestamp = Date.now().toString(16);
  const mathRandom = Math.random().toString(16).substring(2);
  const combined = randomHex + timestamp + mathRandom;

  // Take only needed bytes
  const finalHex = combined.substring(0, length * 2);
  return Buffer.from(finalHex, 'hex');
}

/**
 * Generate secure random hex string
 */
async function generateSecureRandomHex(length: number): Promise<string> {
  const bytes = await generateSecureRandomBytes(length);
  return bytes.toString('hex').toUpperCase();
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Convert hex string to byte array
 */
function hexToBytes(hex: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

/**
 * Convert byte array to hex string
 */
function bytesToHex(bytes: number[]): string {
  return bytes.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('').toUpperCase();
}

/**
 * Convert hex string to ASCII
 */
function hexToAscii(hex: string): string {
  let ascii = '';
  for (let i = 0; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return ascii;
}

/**
 * XOR two hex strings
 */
function xorHex(hex1: string, hex2: string): string {
  const buffer1 = Buffer.from(hex1, 'hex');
  const buffer2 = Buffer.from(hex2, 'hex');
  const result = buffer1.map((byte, index) => byte ^ buffer2[index]);
  return result.toString('hex').toUpperCase();
}

/**
 * Calculate MRZ check digit
 */
function calculateCheckDigit(input: string): number {
  const weights = [7, 3, 1];
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    let value: number;

    if (char >= '0' && char <= '9') {
      value = parseInt(char);
    } else if (char >= 'A' && char <= 'Z') {
      value = char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    } else {
      value = 0; // For '<' and other characters
    }

    sum += value * weights[i % 3];
  }

  return sum % 10;
}

/**
 * Prepare MRZ data with checksums
 */
function prepareMRZData(documentNumber: string, birthDate: string, expiryDate: string): MRZData {
  // Validate input formats
  if (documentNumber.length !== 9) {
    throw new Error('Document number must be 9 characters');
  }

  if (birthDate.length !== 6 || expiryDate.length !== 6) {
    throw new Error('Birth date and expiry date must be in YYMMDD format (6 characters)');
  }

  // Calculate checksums
  const documentChecksum = calculateCheckDigit(documentNumber);
  const birthChecksum = calculateCheckDigit(birthDate);
  const expiryChecksum = calculateCheckDigit(expiryDate);

  return {
    documentNumber,
    birthDate,
    expiryDate,
    documentChecksum,
    birthChecksum,
    expiryChecksum
  };
}

// ==================== CRYPTO FUNCTIONS ====================

/**
 * Derive BAC keys from MRZ data
 */
function deriveBACSeedKey(mrzData: MRZData): string {
  const mrzInfo =
    mrzData.documentNumber +
    mrzData.documentChecksum +
    mrzData.birthDate +
    mrzData.birthChecksum +
    mrzData.expiryDate +
    mrzData.expiryChecksum;

  console.log('MRZ Info for key derivation:', mrzInfo);

  // SHA-1 hash of MRZ info
  const hash = CryptoJS.SHA1(mrzInfo).toString(CryptoJS.enc.Hex);
  return hash.substring(0, 32); // First 16 bytes
}

/**
 * Derive encryption and MAC keys
 */
function deriveKeys(seed: string): { kEnc: string; kMac: string } {
  const seedWithCounter1 = seed + "00000001";
  const seedWithCounter2 = seed + "00000002";

  const hash1 = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(seedWithCounter1)).toString(CryptoJS.enc.Hex);
  const hash2 = CryptoJS.SHA1(CryptoJS.enc.Hex.parse(seedWithCounter2)).toString(CryptoJS.enc.Hex);

  const kEnc = hash1.substring(0, 32); // First 16 bytes
  const kMac = hash2.substring(0, 32); // First 16 bytes

  return { kEnc, kMac };
}

/**
 * 3DES encryption
 */
function tripleDesEncrypt(data: string, key: string): string {
  const keyObj = CryptoJS.enc.Hex.parse(key);
  const dataObj = CryptoJS.enc.Hex.parse(data);
  const iv = CryptoJS.enc.Hex.parse(CRYPTO_SETTINGS.IV);

  const encrypted = CryptoJS.TripleDES.encrypt(dataObj, keyObj, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CRYPTO_SETTINGS.PADDING
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
}

/**
 * 3DES decryption
 */
function tripleDesDecrypt(encryptedData: string, key: string): string {
  const keyObj = CryptoJS.enc.Hex.parse(key);
  const iv = CryptoJS.enc.Hex.parse(CRYPTO_SETTINGS.IV);

  const encryptedObj = {
    ciphertext: CryptoJS.enc.Hex.parse(encryptedData)
  };

  const decrypted = CryptoJS.TripleDES.decrypt(encryptedObj, keyObj, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CRYPTO_SETTINGS.PADDING
  });

  return decrypted.toString(CryptoJS.enc.Hex).toUpperCase();
}

/**
 * Calculate MAC using ISO 9797 Algorithm 3
 */
function calculateMAC(data: string, key: string): string {
  // Pad data to multiple of 8 bytes
  const paddedLength = Math.ceil(data.length / 16) * 16;
  const paddedData = data.padEnd(paddedLength, '0');

  let mac = CRYPTO_SETTINGS.IV;

  // Process data in 8-byte blocks
  for (let i = 0; i < paddedData.length; i += 16) {
    const block = paddedData.substring(i, i + 16);
    const xored = xorHex(mac, block);
    mac = tripleDesEncrypt(xored, key);
  }

  return mac;
}

// ==================== NFC COMMUNICATION ====================

/**
 * Send APDU command and receive response
 */
async function sendAPDU(command: number[]): Promise<number[]> {
  console.log('Sending APDU:', bytesToHex(command));

  try {
    const response = await NfcManager.transceive(command);
    console.log('Received response:', bytesToHex(response));

    // Check response status
    if (response.length < 2) {
      throw new Error('Invalid response length');
    }

    const sw1 = response[response.length - 2];
    const sw2 = response[response.length - 1];

    if (sw1 !== SW_SUCCESS[0] || sw2 !== SW_SUCCESS[1]) {
      throw new Error(`APDU error: SW1=${sw1.toString(16)}, SW2=${sw2.toString(16)}`);
    }

    // Return data without status bytes
    return response.slice(0, response.length - 2);
  } catch (error) {
    console.error('APDU error:', error);
    throw error;
  }
}

/**
 * Select ePassport application
 */
async function selectEPassportApp(): Promise<void> {
  console.log('Selecting ePassport application...');
  await sendAPDU(APDU_COMMANDS.SELECT_EPASSPORT);
}

/**
 * Get challenge from card
 */
async function getChallenge(): Promise<string> {
  console.log('Getting challenge...');
  const response = await sendAPDU(APDU_COMMANDS.GET_CHALLENGE);
  return bytesToHex(response);
}

/**
 * Perform external authentication (BAC)
 */
async function performBAC(mrzData: MRZData, rndIC: string): Promise<{ ksEnc: string; ksMac: string; ssc: string }> {
  console.log('Performing BAC authentication...');

  // Derive keys
  const seed = deriveBACSeedKey(mrzData);
  const { kEnc, kMac } = deriveKeys(seed);

  console.log('Derived keys - kEnc:', kEnc, 'kMac:', kMac);

  // Generate random numbers using secure random
  const rndIFD = await generateSecureRandomHex(8);
  const kIFD = await generateSecureRandomHex(16);

  console.log('Generated rndIFD:', rndIFD, 'kIFD:', kIFD);

  // Create authentication data
  const authData = rndIFD + rndIC + kIFD;
  const encryptedAuthData = tripleDesEncrypt(authData, kEnc);

  // Calculate MAC
  const mac = calculateMAC(encryptedAuthData, kMac);
  const authCommand = encryptedAuthData + mac.substring(0, 16); // First 8 bytes of MAC

  // Send external authenticate command
  const command = APDU_COMMANDS.EXTERNAL_AUTHENTICATE.concat(hexToBytes(authCommand));
  const response = await sendAPDU(command);

  // Decrypt and verify response
  const responseHex = bytesToHex(response);
  const encryptedResponse = responseHex.substring(0, responseHex.length - 16);
  const responseMac = responseHex.substring(responseHex.length - 16);

  // Verify MAC
  const calculatedMac = calculateMAC(encryptedResponse, kMac);
  if (responseMac !== calculatedMac.substring(0, 16)) {
    throw new Error('BAC MAC verification failed');
  }

  // Decrypt response
  const decryptedResponse = tripleDesDecrypt(encryptedResponse, kEnc);

  // Extract kIC from response
  const rndICVerify = decryptedResponse.substring(0, 16);
  const rndIFDVerify = decryptedResponse.substring(16, 32);
  const kIC = decryptedResponse.substring(32, 64);

  if (rndIC !== rndICVerify || rndIFD !== rndIFDVerify) {
    throw new Error('BAC challenge verification failed');
  }

  // Derive session keys
  const sessionSeed = xorHex(kIFD, kIC);
  const sessionKeys = deriveKeys(sessionSeed);

  // Initialize SSC
  const ssc = (rndIC + rndIFD).substring(12, 28); // Last 4 bytes of each

  console.log('BAC successful - Session keys derived');

  return {
    ksEnc: sessionKeys.kEnc,
    ksMac: sessionKeys.kMac,
    ssc: ssc
  };
}

/**
 * Read data group with secure messaging
 */
async function readDataGroupSecure(dgNumber: number, ksEnc: string, ksMac: string, ssc: string): Promise<string> {
  console.log(`Reading data group ${dgNumber} with secure messaging...`);

  // Select data group file
  const selectCommand = dgNumber === 1 ? APDU_COMMANDS.SELECT_EF_DG1 : APDU_COMMANDS.SELECT_EF_COM;
  await sendAPDU(selectCommand);

  // Read binary data
  const readResponse = await sendAPDU(APDU_COMMANDS.READ_BINARY);

  // For now, return raw data - in production, implement secure messaging
  return bytesToHex(readResponse);
}

/**
 * Parse DG1 (MRZ data)
 */
function parseDG1(data: string): any {
  console.log('Parsing DG1 data:', data);

  // Convert hex to ASCII and extract MRZ lines
  const ascii = hexToAscii(data);
  console.log('DG1 ASCII:', ascii);

  // Extract meaningful data from MRZ
  // This is a simplified parser - implement full MRZ parsing as needed
  return {
    raw: data,
    ascii: ascii,
    parsed: true
  };
}

// ==================== MAIN NFC READING FUNCTION ====================

/**
 * Start NFC reading process
 */
export async function startReading(
  documentNumber: string,
  birthDate: string,
  expiryDate: string
): Promise<NFCResponse> {
  console.log('=== Starting NFC Reading ===');
  console.log('Input:', { documentNumber, birthDate, expiryDate });

  try {
    // Initialize NFC
    console.log('Initializing NFC...');
    await NfcManager.start();
    await NfcManager.requestTechnology([NfcTech.IsoDep]);

    // Prepare MRZ data
    const mrzData = prepareMRZData(documentNumber, birthDate, expiryDate);
    console.log('MRZ data prepared:', mrzData);

    // Step 1: Select ePassport application
    await selectEPassportApp();

    // Step 2: Get challenge for BAC
    const rndIC = await getChallenge();

    // Step 3: Perform BAC authentication
    const { ksEnc, ksMac, ssc } = await performBAC(mrzData, rndIC);

    // Step 4: Read DG1 (MRZ data)
    const dg1Data = await readDataGroupSecure(1, ksEnc, ksMac, ssc);
    const parsedDG1 = parseDG1(dg1Data);

    console.log('=== NFC Reading Completed Successfully ===');

    return {
      success: true,
      documentNumber,
      birthDate,
      expiryDate,
      personalData: parsedDG1,
      data: {
        dg1: parsedDG1
      }
    };

  } catch (error) {
    console.error('=== NFC Reading Failed ===');
    console.error('Error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  } finally {
    // Clean up NFC
    try {
      await _cleanUp();
    } catch (cleanupError) {
      console.warn('Cleanup error:', cleanupError);
    }
  }
}

/**
 * Clean up NFC resources - Fixed version
 */
export async function _cleanUp(): Promise<void> {
  console.log('Cleaning up NFC resources...');

  try {
    // Check if cancelTechnologyRequest exists
    if (NfcManager.cancelTechnologyRequest && typeof NfcManager.cancelTechnologyRequest === 'function') {
      await NfcManager.cancelTechnologyRequest();
      console.log('Technology request cancelled');
    } else {
      console.warn('cancelTechnologyRequest not available');
    }

    // Alternative cleanup methods
    try {
      // Try different cleanup methods
      if (NfcManager.unregisterTagEvent && typeof NfcManager.unregisterTagEvent === 'function') {
        await NfcManager.unregisterTagEvent();
        console.log('Tag event unregistered');
      }
    } catch (altError) {
      console.warn('Alternative cleanup failed:', altError);
    }

    console.log('NFC cleanup completed');
  } catch (error) {
    console.warn('NFC cleanup error:', error);
    // Don't throw error, just log it
  }
}

// ==================== TEST FUNCTIONS ====================

/**
 * Test NFC functionality with sample data
 */
export async function testNFC(): Promise<void> {
  const testData = {
    documentNumber: "123456789", // Sample 9-digit document number
    birthDate: "900101",         // Sample birth date YYMMDD
    expiryDate: "300101"         // Sample expiry date YYMMDD
  };

  console.log('Testing NFC with sample data:', testData);

  const result = await startReading(
    testData.documentNumber,
    testData.birthDate,
    testData.expiryDate
  );

  console.log('Test result:', result);
}

/**
 * Test secure random generation
 */
export async function testSecureRandom(): Promise<void> {
  console.log('Testing secure random generation...');

  try {
    const randomHex8 = await generateSecureRandomHex(8);
    const randomHex16 = await generateSecureRandomHex(16);

    console.log('Random 8 bytes:', randomHex8);
    console.log('Random 16 bytes:', randomHex16);
    console.log('Secure random test successful');
  } catch (error) {
    console.error('Secure random test failed:', error);
  }
}

/**
 * Validate MRZ data format
 */
export function validateMRZFormat(documentNumber: string, birthDate: string, expiryDate: string): boolean {
  try {
    prepareMRZData(documentNumber, birthDate, expiryDate);
    return true;
  } catch (error) {
    console.error('MRZ validation failed:', error);
    return false;
  }
}

// ==================== EXPORTS ====================

export default {
  startReading,
  _cleanUp,
  testNFC,
  testSecureRandom,
  validateMRZFormat
};