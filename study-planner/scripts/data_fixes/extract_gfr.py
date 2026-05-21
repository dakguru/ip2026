import subprocess
import sys

# Install pypdf if needed
subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pypdf', '-q'])

from pypdf import PdfReader

pdf_path = r'D:\IP 2026\13. GFR_2017.pdf'
output_path = r'D:\IP 2026\study-planner\gfr_2017_extracted.txt'

reader = PdfReader(pdf_path)
print(f'Number of pages: {len(reader.pages)}')

text = ""
for i, page in enumerate(reader.pages):
    page_text = page.extract_text()
    text += f"\n=== PAGE {i+1} ===\n" + (page_text or '') + "\n"
    if (i+1) % 20 == 0:
        print(f'Extracted {i+1} pages...')

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(text)

print(f'Total text length: {len(text)}')
print('Done!')
