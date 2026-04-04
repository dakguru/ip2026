const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function restore() {
    const zipPath = 'backups/FULL-PROJECT-BACKUP-2026-04-01-20-22.zip';
    const targetFile = 'src/data/flashcards/generated_from_mcq.ts';
    
    const data = fs.readFileSync(zipPath);
    const zip = await JSZip.loadAsync(data);
    
    // JSZip uses forward slashes
    const file = zip.file(targetFile);
    if (!file) {
        console.error(`❌ File not found in zip: ${targetFile}`);
        process.exit(1);
    }
    
    const content = await file.async('string');
    fs.writeFileSync(targetFile, content);
    console.log(`✅ Restored ${targetFile} from backup.`);
}

restore();
