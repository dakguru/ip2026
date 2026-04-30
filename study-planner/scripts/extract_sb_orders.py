from pypdf import PdfReader
import sys

pdf_path = r"D:\IP 2026\Dak Sutra Source\SB_Order_2019-25_English-07032026.pdf"
output_path = r"d:\IP 2026\study-planner\scratch\sb_orders_text.txt"

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
