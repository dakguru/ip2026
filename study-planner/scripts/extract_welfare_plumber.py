import pdfplumber

pdf_path = r"D:\IP 2026\Dak Sutra Source\Welfare_measurement_of_Dept_Employee_and_GDS (1).pdf"
output_path = r"D:\IP 2026\study-planner\scratch\welfare_pdfplumber.txt"

try:
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"pdfplumber extraction successful. Output length: {len(text)}")
except Exception as e:
    print(f"Error: {e}")
