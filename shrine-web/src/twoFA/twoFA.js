import base32Decode from "base32-decode";

/*
  https://github.com/google/google-authenticator/wiki/Key-Uri-Format
  Assumptions (based from Google Authenticator):
    Algorithm: SHA1
    Digits: 6
    Period: 30s
*/

const computeHOTP = async (secret, counter) => {
  if (secret.length === 0) return "NaN";
  // https://tools.ietf.org/html/rfc4226#section-5.1
  let formatCounter = (counter) => {
    let binStr = ("0".repeat(64) + counter.toString(2)).slice(-64);
    let intArr = [];

    for (let i = 0; i < 8; i++) {
      intArr[i] = parseInt(binStr.slice(i * 8, i * 8 + 8), 2);
    }

    return Uint8Array.from(intArr).buffer;
  };

  // https://tools.ietf.org/html/rfc4226#section-5.4
  let truncate = (buffer) => {
    let offset = buffer[buffer.length - 1] & 0xf;
    return (
      ((buffer[offset] & 0x7f) << 24) |
      ((buffer[offset + 1] & 0xff) << 16) |
      ((buffer[offset + 2] & 0xff) << 8) |
      (buffer[offset + 3] & 0xff)
    );
  };

  const resultKey = await crypto.subtle.importKey(
    "raw",
    base32Decode(secret, "RFC4648"),
    { name: "HMAC", hash: { name: "SHA-1" } },
    false,
    ["sign"]
  );
  const result = await crypto.subtle.sign(
    "HMAC",
    resultKey,
    formatCounter(counter)
  );
  return ("000000" + (truncate(new Uint8Array(result)) % 10 ** 6)).slice(-6);
};

const computeTOTP = (secret) => {
  const counter = Math.floor(Date.now() / 30000);
  return computeHOTP(secret, counter);
};

export { computeHOTP, computeTOTP };
