import { encode, decode } from "base64-arraybuffer";

export const genCredential = async (email, password) => {
  const encoder = new TextEncoder();
  const password_byte = encoder.encode(password); // emit a stream of UTF-8 bytes Uint8Array
  const salt_byte = encoder.encode(email);
  const password_key = await crypto.subtle.importKey(
    "raw",
    password_byte,
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const masterKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: salt_byte,
      iterations: 100000,
    },
    password_key,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  const masterKey_bytes = await crypto.subtle.exportKey("raw", masterKey);
  const masterKey_for_stretch = await crypto.subtle.importKey(
    "raw",
    masterKey_bytes,
    {
      name: "HKDF",
    },
    false,
    ["deriveBits"]
  );
  const masterKey_for_hash = await crypto.subtle.importKey(
    "raw",
    masterKey_bytes,
    {
      name: "PBKDF2",
    },
    false,
    ["deriveBits"]
  );
  const stretchedMasterKey = crypto.subtle
    .deriveBits(
      {
        name: "HKDF",
        hash: "SHA-256",
        salt: salt_byte,
        info: encoder.encode("stretch"),
      },
      masterKey_for_stretch,
      256,
      false
    )
    .then((stretched_key) => {
      return encode(stretched_key);
    });
  const masterPasswordHash = crypto.subtle
    .deriveBits(
      {
        name: "PBKDF2",
        salt: password_byte,
        iterations: 1,
        hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      masterKey_for_hash,
      256
    )
    .then((hash) => {
      return encode(hash);
    });
  return Promise.all([stretchedMasterKey, masterPasswordHash]);
};
