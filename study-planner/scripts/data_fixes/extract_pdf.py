from pypdf import PdfReader
import sys

pdf_path = r"d:\IP 2026\Paper I\Preservation Period of Records.pdf"
output_path = r"d:\IP 2026\preservation_records_full_text.txt"

try:
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Successfully extracted text to {output_path}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
