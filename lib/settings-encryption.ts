import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

const algorithm = "aes-256-gcm";
const keyVersion = 1;

type EncryptedSecret = {
  ciphertext: string;
  iv: string;
  authTag: string;
  keyVersion: number;
  last4: string;
};

function encryptionKey(): Buffer {
  const value = process.env.SETTINGS_ENCRYPTION_KEY?.trim();
  if (!value) {
    throw new Error("SETTINGS_ENCRYPTION_KEY is not configured.");
  }

  const key = Buffer.from(value, "base64");
  if (key.length !== 32) {
    throw new Error("SETTINGS_ENCRYPTION_KEY must be a base64-encoded 32-byte value.");
  }

  return key;
}

export function encryptSettingSecret(value: string): EncryptedSecret {
  const secret = value.trim();
  if (!secret) throw new Error("A secret value is required.");

  const iv = randomBytes(12);
  const cipher = createCipheriv(algorithm, encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(secret, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
    keyVersion,
    last4: secret.slice(-4),
  };
}

export function decryptSettingSecret(value: Pick<EncryptedSecret, "ciphertext" | "iv" | "authTag">): string {
  const decipher = createDecipheriv(algorithm, encryptionKey(), Buffer.from(value.iv, "base64"));
  decipher.setAuthTag(Buffer.from(value.authTag, "base64"));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(value.ciphertext, "base64")),
    decipher.final(),
  ]);

  return plaintext.toString("utf8");
}
