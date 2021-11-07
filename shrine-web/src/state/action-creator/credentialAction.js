import {encode, decode} from "base64-arraybuffer";
import {store} from "../store"

export const setEmail = (email) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_EMAIL',
            payload: {email: email},
        });
    }
}

export const generateCredential = () => async (email, password) => {
    const encoder = new TextEncoder();
    const password_byte = encoder.encode(password);   // emit a stream of UTF-8 bytes Uint8Array
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
            length: 256
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
        ["deriveKey"]
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
    const stretchedMasterKey = await crypto.subtle.deriveKey(
        {
            name: "HKDF",
            hash: "SHA-256",
            salt: salt_byte,
            info: encoder.encode("stretch"),
        },
        masterKey_for_stretch,
        {
            name: "AES-GCM", //can be any AES algorithm ("AES-CTR", "AES-CBC", "AES-CMAC", "AES-GCM", "AES-CFB", "AES-KW", "ECDH", "DH", or "HMAC")
            //the generateKey parameters for that type of algorithm
            length: 256, //can be  128, 192, or 256
        },
        false,
        ["encrypt", "decrypt"],
    );
    const masterPasswordHash = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: password_byte,
            iterations: 1,
            hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        masterKey_for_hash,
        256,
    );
    console.log(stretchedMasterKey, masterPasswordHash);
    return (dispatch) => {
        dispatch({
            type: 'INIT_KEY_AND_HASH',
            payload: {
                stretchedMasterKey: stretchedMasterKey,
                masterPasswordHash: masterPasswordHash,
            }
        });
    }
}