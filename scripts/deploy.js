/* eslint-env node */

import FtpDeploy from "ftp-deploy";
import process from "node:process";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = process.env.FTP_REMOTE_PATH;

const baseConfig = {
  host: process.env.FTP_SERVER,
  port: process.env.FTP_PORT,
  sftp: process.env.FTP_SFTP,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  deleteRemote: false,
  forcePasv: true,
};

const files = [
  { file: "style.css", remoteDir: "css/" },
  { file: "script.js", remoteDir: "js/" },
];

async function deploy() {
  console.log("🚀 Deploying to", baseConfig.host);

  for (const { file, remoteDir } of files) {
    const ftpDeploy = new FtpDeploy();

    await ftpDeploy.deploy({
      ...baseConfig,
      localRoot: path.resolve(__dirname, "../dist/assets"),
      remoteRoot: basePath + remoteDir,
      include: [file],
    });

    console.log(`✓ ${file} → ${basePath}${remoteDir}${file}`);
  }

  console.log("✅ Done!");
}

deploy().catch(err => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
