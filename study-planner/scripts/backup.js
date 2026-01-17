const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const archiver = require('archiver');
const chalk = require('chalk');
const dotenv = require('dotenv');

// Load environment variables from .env.local
// (Next.js typically uses .env.local, but standard dotenv looks for .env.
// We'll explicitly check .env.local first as per usual Next.js setup)
const envLocalPath = path.resolve(__dirname, '../.env.local');
const envPath = path.resolve(__dirname, '../.env');

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

const BACKUPS_DIR = path.resolve(__dirname, '../backups');
const TEMP_BACKUP_DIR = path.resolve(__dirname, '../temp_backup');

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
const zipFileName = `backup-${timestamp}.zip`;
const zipFilePath = path.join(BACKUPS_DIR, zipFileName);

console.log(chalk.blue(`🚀 Starting DB Backup...`));

// 1. Run mongodump
// WE FOUND THE PATH HERE: C:\Program Files\MongoDB\Tools\100\bin\mongodump.exe
// We use quotes around the executable path because it contains spaces ("Program Files")
const mongoDumpExec = '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump.exe"';
const dumpCommand = `${mongoDumpExec} --uri="${MONGODB_URI}" --out="${TEMP_BACKUP_DIR}"`;

console.log(chalk.gray(`Running mongodump...`));

exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(chalk.red(`❌ Error running mongodump: ${error.message}`));
        return;
    }

    // Check if temp dir exists and has content (basic check)
    if (!fs.existsSync(TEMP_BACKUP_DIR)) {
        console.error(chalk.red(`❌ Error: temp_backup directory was not created. Check if mongodump is installed and URI is correct.`));
        return;
    }

    console.log(chalk.green(`✓ Mongodump finished.`));
    console.log(chalk.gray(`Zipping backup to ${zipFileName}...`));

    // 2. Zip the folder
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    output.on('close', function () {
        console.log(chalk.green(`✓ Backup compressed: ${archive.pointer()} total bytes`));

        // 3. Cleanup temp folder
        console.log(chalk.gray(`Cleaning up temp files...`));
        fs.rm(TEMP_BACKUP_DIR, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error(chalk.yellow(`⚠️ Warning: Could not delete temp folder: ${err.message}`));
            } else {
                console.log(chalk.green(`✓ Temp folder cleaned.`));
            }

            // 4. Auto-prune old backups
            pruneOldBackups();
        });
    });

    archive.on('error', function (err) {
        console.error(chalk.red(`❌ Archiving error: ${err.message}`));
    });

    archive.pipe(output);
    archive.directory(TEMP_BACKUP_DIR, false);
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
        } else {
            console.log(chalk.gray(`No old backups to prune.`));
        }

        finish();
    });
}

function finish() {
    console.log('\n');
    console.log(chalk.bgGreen.bold.white(" ✅ BACKUP COMPLETE! "));
    console.log(chalk.greenBright.bold("IMPORTANT: Right-click the new .zip file in the 'backups' folder and DOWNLOAD it to your computer immediately. This cloud environment is not permanent!"));
}
