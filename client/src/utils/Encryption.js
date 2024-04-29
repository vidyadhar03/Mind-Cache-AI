async function deriveKeyFromPassword(password, salt) {
  // Ensure the salt is unique for each user and securely generated
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);

  // Import the password into a CryptoKey
  const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
  );

  // Set the parameters for the PBKDF2
  const deriveParams = {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,  // Number of iterations, higher is more secure but slower
      hash: 'SHA-256'      // Hash function
  };

  // Derive a key from the password
  const derivedKey = await window.crypto.subtle.deriveKey(
      deriveParams,
      keyMaterial,
      { name: 'AES-GCM', length: 256 },  // Specify the key algorithm you want to use
      true,
      ['encrypt', 'decrypt']  // Key usages
  );

  // Export the CryptoKey to an ArrayBuffer and then to Base64
  const keyBuffer = await window.crypto.subtle.exportKey('raw', derivedKey);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(keyBuffer)));
}

// Example usage:
const password = 'yourPasswordHere';
const salt = 'yourUniqueSaltHere';  // This should be unique and securely stored/generated

deriveKeyFromPassword(password, salt)
  .then(derivedKeyBase64 => console.log('Derived key:', derivedKeyBase64))
  .catch(error => console.error('Error deriving key:', error));
