import fs from "node:fs";
import path from "node:path";
import { randomBytes, pbkdf2Sync } from "node:crypto";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vars = root + "/.dev.vars",
  login = root + "/.local-admin-login.txt";
if (fs.existsSync(vars)) {
  console.log(
    "Existing .dev.vars kept. Credentials were not printed or overwritten.",
  );
  process.exit(0);
}
const password = "Lzz-" + randomBytes(18).toString("base64url"),
  salt = randomBytes(16);
const hash = [
  "pbkdf2-sha256",
  "100000",
  salt.toString("base64"),
  pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("base64"),
].join("$");
fs.writeFileSync(
  vars,
  `TOKEN_SECRET='${randomBytes(36).toString("base64url")}'\nADMIN_PASSWORD_HASH='${hash}'\n`,
  { mode: 0o600 },
);
fs.writeFileSync(
  login,
  `仅用于本地开发，不得上传或用于线上。\n网址：http://127.0.0.1:8788/admin/\n用户名：admin\n密码：${password}\n`,
  { mode: 0o600 },
);
console.log("Local configuration generated. Login details: " + login);
