import CryptoJS from 'crypto-js';
import { getUserDetails, setUserDetails } from "./SubscriptionDetails";

let inMemoryKey = null;  // To hold the key in memory

// Encrypt a key with CryptoJS
function encryptKey(key, passphrase) {
    return CryptoJS.AES.encrypt(key, passphrase).toString();
}

// Decrypt a key with CryptoJS
function decryptKey(encryptedKey, passphrase) {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8);
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

// Derive a key from the password and store it encrypted in local storage
export async function deriveAndStoreKeyInMemory(email, password) {
    const passphrase = `UniqueMindCacheAISalt${email}`;
    const derivedKey = CryptoJS.PBKDF2(password, passphrase, {
        keySize: 256 / 32,
        iterations: 1000
    }).toString();
    const encryptedKey = encryptKey(derivedKey, passphrase);
    storeKeyLocally(encryptedKey);
    console.log("Derived and encrypted key stored locally.");
}

// Retrieve or decrypt the key from local storage and store it in memory
async function getEncryptionKey() {
    if (inMemoryKey) {
        console.log(inMemoryKey)
        return inMemoryKey;
    } else {
        const userDetails = getUserDetails();
        const passphrase = `UniqueMindCacheAISalt${userDetails.email}`;
        const encryptedKey = retrieveEncryptedKeyFromLocalStorage();
        if (!encryptedKey) throw new Error('No key available in local storage');
        inMemoryKey = decryptKey(encryptedKey, passphrase);
        return inMemoryKey;
    }
}

// Encrypt data using the in-memory key
export async function encryptData(plaintext) {
    const key = await getEncryptionKey();
    return CryptoJS.AES.encrypt(plaintext, key).toString();
}

// Decrypt data using the in-memory key
export async function decryptData(encryptedData) {
    const key = await getEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
