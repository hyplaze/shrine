import {encode, decode} from "base64-arraybuffer";

const IV_LENGTH = 12;

const encrypt = async (data, stretchedMasterKey) => {
    console.log("Encrypting data...", data);
    data = decode(data.normalize('NFC'));
    console.log('stretchedMasterKey in encrypt', await stretchedMasterKey);
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const encryptedContent = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",

            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            //Recommended to use 12 bytes length
            iv: iv,

            //Additional authentication data (optional)
            //additionalData: ArrayBuffer,

            //Tag length (optional)
            tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        await stretchedMasterKey, //from generateKey or importKey above
        data //ArrayBuffer of data you want to encrypt
    );
    const encryptedBytes = new Uint8Array(encryptedContent);
    const encryptedPackageBuffer = Buffer.concat([iv.buffer, encryptedBytes]);
    //returns an ArrayBuffer containing the encrypted data
    return encode(encryptedPackageBuffer);
}

const decrypt = async (encryptedData, stretchedMasterKey) => {
    const encryptedPackage = new Uint8Array(decode(encryptedData));
    const iv = encryptedPackage.slice(0, IV_LENGTH);
    const encryptedBytes = encryptedPackage.slice(IV_LENGTH);
    console.log('encryptedBytes', encryptedBytes);
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv, //The initialization vector you used to encrypt
            // additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
            tagLength: 128, //The tagLength you used to encrypt (if any)
        },
        await stretchedMasterKey, //from generateKey or importKey above
        encryptedBytes //ArrayBuffer of the data
    )
    return encode(decrypted);
}

export {encrypt, decrypt};