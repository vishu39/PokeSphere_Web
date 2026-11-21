// Puts the newest PgSphere build on the website (run by PgSphere's tools\release.ps1, or `npm run sync-apk`).
//
// What it does, in order:
//   1. Finds PgSphere's newest release build: <PgSphere folder>\app\android\app\build\outputs\apk\release\app-release.apk,
//      with its version number from output-metadata.json (written by Gradle at every build).
//      The PgSphere folder: see findPgSphereRoot() below (release.ps1 passes it).
//   2. Copies it to public/downloads/PokeSphere.apk (the website's Download button).
//   3. Writes public/update.json: what the PgSphere app reads to show "New update available" (AppUpdater.kt).
//   4. Updates src/data/downloadData.ts (version, date, size, SHA-256 shown on the website).
//
// On Vercel this script also runs (package.json "prebuild"), but there is no PgSphere folder there. Then it changes
// nothing and the files already in git are used.
//
// ⚠️ Keep this version (2026-11-19): the older script did not write update.json, and the app's Update card needs it.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, '..');
const pgSphereRoot = findPgSphereRoot();
console.log(`PgSphere folder: ${pgSphereRoot}`);

// Finds PgSphere's folder (the one whose build goes on the website).
//   1. release.ps1 gives it as the first argument: node scripts/sync-apk.mjs "<PgSphere folder>".
//   2. Without it (npm run sync-apk): PgSphere inside PgSphere-Suite (in use from 2026-11-21).
//   3. Else the old ..\PgSphere folder.
// Why: the old ..\PgSphere folder still exists as a backup with an OLD build. On 2026-11-21 the script took that old
// build instead of the new one from the suite, and release.ps1 stopped ("the sync did not use this build").
function findPgSphereRoot() {
  const fromArgument = process.argv[2];
  if (fromArgument) {
    return path.resolve(fromArgument);
  }
  const insideSuite = path.resolve(webRoot, '..', 'PgSphere-Suite', 'PgSphere');
  if (fs.existsSync(insideSuite)) {
    return insideSuite;
  }
  return path.resolve(webRoot, '..', 'PgSphere');
}

const buildDir = path.join(pgSphereRoot, 'app', 'android', 'app', 'build', 'outputs', 'apk', 'release');
const builtApkPath = path.join(buildDir, 'app-release.apk');
const metadataPath = path.join(buildDir, 'output-metadata.json');

const targetApkPath = path.join(webRoot, 'public', 'downloads', 'PokeSphere.apk');
const updateJsonPath = path.join(webRoot, 'public', 'update.json');
const dataFilePath = path.join(webRoot, 'src', 'data', 'downloadData.ts');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'];

// ---------- 1. The newest PgSphere build ----------

if (!fs.existsSync(builtApkPath) || !fs.existsSync(metadataPath)) {
  console.log('No PgSphere build here (normal on Vercel): the website keeps its current APK and update.json.');
  process.exit(0);
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const element = metadata.elements[0];
const versionCode = element.versionCode;   // a bigger number at every build (PgSphere build.gradle)
const versionName = element.versionName;   // like "2026.11.19-1130"
console.log(`Found PgSphere build ${versionName} (version code ${versionCode})`);

// ---------- 2. Copy it to the Download button ----------

fs.mkdirSync(path.dirname(targetApkPath), { recursive: true });
fs.copyFileSync(builtApkPath, targetApkPath);
console.log(`Copied -> ${targetApkPath}`);

// Size and SHA-256 (the file's fingerprint: the app checks it after downloading).
const sizeBytes = fs.statSync(targetApkPath).size;
const sizeText = (sizeBytes / (1024 * 1024)).toFixed(1) + ' MB';
const sha256 = crypto.createHash('sha256').update(fs.readFileSync(targetApkPath)).digest('hex').toUpperCase();
const now = new Date();
const dateText = `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

// ---------- 3. update.json for the app ----------

const updateInfo = {
  versionCode: versionCode,
  versionName: versionName,
  apkUrl: '/downloads/PokeSphere.apk',
  sha256: sha256,
  size: sizeText,
  sizeBytes: sizeBytes,
  date: dateText,
};
fs.writeFileSync(updateJsonPath, JSON.stringify(updateInfo, null, 2) + '\n', 'utf8');
console.log(`Wrote ${updateJsonPath}`);

// ---------- 4. The website's own release box ----------

let content = fs.readFileSync(dataFilePath, 'utf8');
content = content.replace(/fileSize:\s*"[^"]*"/, `fileSize: "${sizeText}"`);
content = content.replace(/sha256:\s*"[^"]*"/, `sha256: "${sha256}"`);
content = content.replace(/date:\s*"[^"]*"/, `date: "${dateText}"`);
content = content.replace(/version:\s*"[^"]*"/, `version: "${versionName}"`);
content = content.replace(/tag:\s*"[^"]*"/, `tag: "v${versionName}"`);
fs.writeFileSync(dataFilePath, content, 'utf8');

console.log('\nAPK info:');
console.log(`  Version: ${versionName} (code ${versionCode})`);
console.log(`  Size:    ${sizeText} (${sizeBytes} bytes)`);
console.log(`  SHA-256: ${sha256}`);
console.log(`  Date:    ${dateText}`);
console.log(`Updated ${dataFilePath}`);
