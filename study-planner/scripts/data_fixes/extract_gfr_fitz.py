import fitz

doc = fitz.open(r"D:\IP 2026\13. GFR_2017.pdf")
text = ""
for page in doc:
    text += page.get_text("text")

print(f"Extracted {len(text)} characters using PyMuPDF.")
with open(r"D:\IP 2026\study-planner\pymupdf_gfr.txt", "w", encoding="utf-8") as f:
    f.write(text)
