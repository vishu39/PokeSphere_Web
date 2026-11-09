import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, '..');
const pgSphereRoot = path.resolve(webRoot, '..', 'PgSphere');

// 1. Find latest APK
const releaseApkDir = path.join(pgSphereRoot, 'release-apk');
const targetApkPath = path.join(webRoot, 'public', 'downloads', 'PokeSphere.apk');

let sourceApkPath = null;
let releaseDateStr = null;

if (fs.existsSync(releaseApkDir)) {
  const files = fs.readdirSync(releaseApkDir)
    .filter(f => f.endsWith('.apk'))
    .sort()
    .reverse();
  
  if (files.length > 0) {
    const latestFile = files[0];
    sourceApkPath = path.join(releaseApkDir, latestFile);
    console.log(`Found latest release APK: ${latestFile}`);
    
    // Extract date from name like PgSphere-2026-11-09.apk
    const dateMatch = latestFile.match(/PgSphere-(\d{4})-(\d{2})-(\d{2})\.apk/);
    if (dateMatch) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const mIdx = parseInt(dateMatch[2], 10) - 1;
      releaseDateStr = `${months[mIdx]} ${parseInt(dateMatch[3], 10)}, ${dateMatch[1]}`;
    }
  }
}

if (!sourceApkPath && fs.existsSync(targetApkPath)) {
  sourceApkPath = targetApkPath;
}

if (!sourceApkPath) {
  console.error('No APK found to sync.');
  process.exit(1);
}

// Copy latest APK to public/downloads/PokeSphere.apk if source is different
fs.mkdirSync(path.dirname(targetApkPath), { recursive: true });
if (sourceApkPath !== targetApkPath) {
  console.log(`Copying ${sourceApkPath} -> ${targetApkPath}`);
  fs.copyFileSync(sourceApkPath, targetApkPath);
}

// Read APK metadata
const stats = fs.statSync(targetApkPath);
const sizeBytes = stats.size;
const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1) + ' MB';

const fileBuffer = fs.readFileSync(targetApkPath);
const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex').toUpperCase();

if (!releaseDateStr) {
  const d = stats.mtime;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  releaseDateStr = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// Read version from PgSphere/app/app.json if available
let appVersion = '1.0.0';
const appJsonPath = path.join(pgSphereRoot, 'app', 'app.json');
if (fs.existsSync(appJsonPath)) {
  try {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    if (appJson.expo && appJson.expo.version) {
      appVersion = appJson.expo.version;
    }
  } catch (e) {
    console.warn('Could not parse app.json, using default version');
  }
}

console.log(`\nAPK Info:`);
console.log(`  Size:    ${sizeMB} (${sizeBytes} bytes)`);
console.log(`  SHA-256: ${sha256}`);
console.log(`  Date:    ${releaseDateStr}`);
console.log(`  Version: ${appVersion}`);

// Update downloadData.ts
const dataFilePath = path.join(webRoot, 'src', 'data', 'downloadData.ts');
let content = fs.readFileSync(dataFilePath, 'utf8');

content = content.replace(/fileSize:\s*"[^"]*"/, `fileSize: "${sizeMB}"`);
content = content.replace(/sha256:\s*"[^"]*"/, `sha256: "${sha256}"`);
content = content.replace(/date:\s*"[^"]*"/, `date: "${releaseDateStr}"`);
content = content.replace(/version:\s*"[^"]*"/, `version: "${appVersion}"`);
content = content.replace(/tag:\s*"[^"]*"/, `tag: "v${appVersion}-release"`);

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log(`\nSuccessfully updated ${dataFilePath}!`);

