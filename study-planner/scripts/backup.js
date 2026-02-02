const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const archiver = require('archiver');
const chalk = require('chalk');
const dotenv = require('dotenv');

// Setup Paths
const PROJECT_ROOT = path.resolve(__dirname, '../');
const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
const envPath = path.join(PROJECT_ROOT, '.env');

// Load Env
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
} else {
    dotenv.config({ path: envPath });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error(chalk.red('❌ Error: MONGODB_URI not found in .env or .env.local'));
    process.exit(1);
}

const BACKUPS_DIR = path.join(PROJECT_ROOT, 'backups');
const TEMP_BACKUP_DIR = path.join(PROJECT_ROOT, 'temp_backup');

// Create backups directory if it doesn't exist
if (!fs.existsSync(BACKUPS_DIR)) {
    fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

// Function to get current date formatted for filename
function getTimestamp() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const HH = String(now.getHours()).padStart(2, '0');
    const MM = String(now.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}-${HH}-${MM}`;
}

const timestamp = getTimestamp();
const zipFileName = `FULL-PROJECT-BACKUP-${timestamp}.zip`;
const zipFilePath = path.join(BACKUPS_DIR, zipFileName);

console.log(chalk.blue(`🚀 Starting COMPLETE Project Backup (Code + Assets + DB)...`));

// 1. Run mongodump
const mongoDumpExec = '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump.exe"';
const dumpCommand = `${mongoDumpExec} --uri="${MONGODB_URI}" --out="${TEMP_BACKUP_DIR}"`;

console.log(chalk.gray(`Step 1/3: Dumping Database...`));

exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(chalk.red(`❌ Error running mongodump: ${error.message}`));
        return;
    }

    if (!fs.existsSync(TEMP_BACKUP_DIR)) {
        console.error(chalk.red(`❌ Error: temp_backup directory was not created.`));
        return;
    }

    console.log(chalk.green(`✓ Database dump finished.`));
    console.log(chalk.gray(`Step 2/3: Archiving Project Files & Database to ${zipFileName}...`));

    // 2. Zip the folder
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Highest compression
    });

    output.on('close', function () {
        const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
        console.log(chalk.green(`✓ Backup compressed: ${sizeMB} MB`));

        // 3. Cleanup temp folder
        console.log(chalk.gray(`Step 3/3: Cleaning up temp files...`));
        fs.rm(TEMP_BACKUP_DIR, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error(chalk.yellow(`⚠️ Warning: Could not delete temp folder: ${err.message}`));
            } else {
                console.log(chalk.green(`✓ Cleanup complete.`));
            }
            pruneOldBackups();
        });
    });

    archive.on('error', function (err) {
        console.error(chalk.red(`❌ Archiving error: ${err.message}`));
    });

    archive.pipe(output);

    // --- ADD CONTENT TO ZIP ---

    // A. Add Database Dump
    archive.directory(TEMP_BACKUP_DIR, 'database_backup');
    console.log(chalk.cyan(`   + Added Database Dump`));

    // B. Add Key Project Directories
    const directoriesToInclude = ['src', 'public', 'scripts', 'android', 'docs'];
    directoriesToInclude.forEach(dir => {
        const fullPath = path.join(PROJECT_ROOT, dir);
        if (fs.existsSync(fullPath)) {
            archive.directory(fullPath, dir);
            console.log(chalk.cyan(`   + Added Directory: ${dir}`));
        }
    });

    // C. Add Root Files (Config, Readmes, Env, Scripts)
    // We match any file in root, excluding directories and specific ignored files
    archive.glob('*', {
        cwd: PROJECT_ROOT,
        nodir: true,
        dot: true, // Include .env, .gitignore etc.
        ignore: ['backup-*.zip', '*.log', '.DS_Store']
    });
    console.log(chalk.cyan(`   + Added Root Configuration Files`));

    archive.finalize();
});

function pruneOldBackups() {
    console.log(chalk.gray(`Checking for old backups (> 30 days)...`));

    fs.readdir(BACKUPS_DIR, (err, files) => {
        if (err) {
            console.error(chalk.yellow(`⚠️ Warning: Could not list backups directory: ${err.message}`));
            finish();
            return;
        }

        const now = Date.now();
        const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
        let deletedCount = 0;

        files.forEach(file => {
            if (file.endsWith('.zip')) {
                const filePath = path.join(BACKUPS_DIR, file);
                try {
                    const stats = fs.statSync(filePath);
                    if (now - stats.mtimeMs > THIRTY_DAYS_MS) {
                        fs.unlinkSync(filePath);
                        console.log(chalk.gray(`Deleted old backup: ${file}`));
                        deletedCount++;
                    }
                } catch (e) {
                    console.error(chalk.yellow(`⚠️ Could not check/delete file ${file}: ${e.message}`));
                }
            }
        });

        if (deletedCount > 0) {
            console.log(chalk.green(`✓ Pruned ${deletedCount} old backup(s).`));
        }

        finish();
    });
}

function finish() {
    console.log('\n');
    console.log(chalk.bgGreen.bold.white(" ✅ FULL PROJECT BACKUP COMPLETE! "));
    console.log(chalk.greenBright.bold(`File: ${zipFileName}`));
    console.log(chalk.white("This zip contains: Source Code (src), Assets (public/notes), Scripts, Android Project, and MongoDB Dump."));
    console.log(chalk.yellow("IMPORTANT: Download this file from the 'backups' folder immediately."));
}
