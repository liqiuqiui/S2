const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nextVersion = process.argv[2];

const packageEntry = process.cwd();

const packageName = path.basename(packageEntry);
const srcEntry = path.resolve(packageEntry, './src/index.ts');

function generateNextVersion() {
  const versionCode = `\nexport const version = '${nextVersion}';\n`;
  fs.writeFileSync(srcEntry, versionCode, { encoding: 'utf8', flag: 'a+' });
}

function build() {
  execSync(`pnpm build`, {
    stdio: 'inherit',
  });
}

function restoreVersionChange() {
  execSync(`git restore ${srcEntry}`, { stdio: 'inherit' });
}

console.log(`🔖 ${packageName} 添加 nextVersion: ${nextVersion}\n`);

generateNextVersion();
build();
restoreVersionChange();

console.log(`✅ ${packageName} nextVersion(${nextVersion}) 添加成功 \n`);
