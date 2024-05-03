import CryptoJS from 'crypto-js';
import { getUserDetails, setUserDetails } from "./SubscriptionDetails";

let inMemoryKey = null;  // To hold the encryption key in memory

// Derive a deterministic key from the email and password
export async function deriveAndStoreKeyInMemory(email, password) {
    const salt = `UniqueMindCacheAISalt${email}`;
    const derivedKey = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 1000
    }).toString(CryptoJS.enc.Hex);
    
    const encryptedKey = encryptKey(derivedKey);
    storeKeyLocally(encryptedKey);
    inMemoryKey = derivedKey; // Store the derived key in memory
}

// Encrypt the generated in-memory key
function encryptKey(key) {
    const passphrase = 'fixedPassphraseForEncryptionOfKey';  // Ensure this passphrase is securely handled and constant
    return CryptoJS.AES.encrypt(key, passphrase).toString();
}

// Decrypt the encrypted key stored in local storage
function decryptKey(encryptedKey) {
    const passphrase = 'fixedPassphraseForEncryptionOfKey';
    const bytes = CryptoJS.AES.decrypt(encryptedKey, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Retrieve or decrypt the encryption key
export async function getEncryptionKey() {
    if (inMemoryKey) {
        return inMemoryKey;
    } else {
        const encryptedKey = retrieveEncryptedKeyFromLocalStorage();
        if (!encryptedKey) {
            throw new Error('No key available in local storage');
        }
        inMemoryKey = decryptKey(encryptedKey);
        return inMemoryKey;
    }
}

// Encrypt data always producing the same output for the same input
export async function encryptData(plaintext) {
    const key = await getEncryptionKey();
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // Static IV for deterministic encryption
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

// Decrypt data
export async function decryptData(encryptedData) {
    const key = await getEncryptionKey();
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // The same IV used for encryption
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.Pkcs7
    });
    try {
        return decrypted.toString(CryptoJS.enc.Utf8); // Convert to UTF-8 string
    } catch (e) {
        // console.error('Decryption failed:', e);
        return null; // Handle decryption failure gracefully
    }
}

// Store encrypted key in local storage
function storeKeyLocally(encryptedKey) {
    const userDetails = getUserDetails();
    userDetails.encryptedKey = encryptedKey;
    setUserDetails(userDetails);
}

// Retrieve encrypted key from local storage
function retrieveEncryptedKeyFromLocalStorage() {
    const userDetails = getUserDetails();
    return userDetails.encryptedKey;
}
