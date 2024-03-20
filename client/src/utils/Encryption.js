
//  async function generateAndExportAESKey() {
//     try {
//       // Generate a symmetric AES-256 encryption key
//       const key = await window.crypto.subtle.generateKey(
//         {
//           name: "AES-GCM",
//           length: 256, // Can be 128, 192, or 256 bits
//         },
//         true, // Whether the key is extractable
//         ["encrypt", "decrypt"] // Key usages
//       );
  
//       // Export the key to an ArrayBuffer (for example, to store it)
//       const exportedKey = await window.crypto.subtle.exportKey(
//         "raw", // Export as raw bytes
//         key
//       );
  
//       // Convert ArrayBuffer to a hexadecimal string for easier storage
//       const keyHex = bufferToHex(exportedKey);
  
//       return keyHex;
//     } catch (error) {
//       console.error("Error generating or exporting the key:", error);
//       return null;
//     }
//   }
  
//   // Helper function to convert an ArrayBuffer to a hexadecimal string
//   function bufferToHex(buffer) {
//     return [...new Uint8Array(buffer)]
//       .map(b => b.toString(16).padStart(2, "0"))
//       .join("");
//   }
  
//   // Example usage
//   generateAndExportAESKey().then((keyHex) => {
//     console.log("Generated AES Key:", keyHex);
//     // Store the keyHex securely, e.g., after encrypting it with the user's password-derived key
//   });
  

 function EncryptUniqueKey() {}

 function DecryptUniqueKey() {}

 function EncryptData(data) {
  let encryptedData = "";
  return encryptedData;
}

 function DecryptData(data) {
  let decryptedData = "";
  return decryptedData;
}
