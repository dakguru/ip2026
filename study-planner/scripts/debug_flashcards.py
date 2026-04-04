
import re

def check_quotes(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if line.count('"') % 2 != 0:
                print(f"Line {i+1}: {line.strip()}")

check_quotes('src/data/flashcards/generated_from_mcq.ts')
check_quotes('src/data/flashcards/postalManualVolVII.ts')
check_quotes('src/data/flashcards/postalManualVolVIPartI.ts')
