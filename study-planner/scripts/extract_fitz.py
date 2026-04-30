import fitz

pdf_path = r"D:\IP 2026\Dak Sutra Source\SB_Order_2019-25_English-07032026.pdf"
output_path = r"D:\IP 2026\study-planner\scratch\sb_orders_fitz.txt"

try:
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text() + "\n"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Fitz extraction successful. Output length: {len(text)}")
except Exception as e:
    print(f"Error: {e}")
