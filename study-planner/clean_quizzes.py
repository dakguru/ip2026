
path = 'src/data/quizzes.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    ("According to the document ,", "According to the PMLA, 2002,"),
    ("Based on the table provided in the document:", "As per the PMLA guidelines:"),
    ("According to the Gazette Notification (Source 1),", "According to the Consumer Protection Act, 2019,"),
    ("According to the Act text in the Gazette,", "According to the Consumer Protection Act, 2019,"),
    ("According to the study material (Source 2),", "According to the Consumer Protection Act, 2019,"),
    ("According to the study notes (Source 2),", "According to the Consumer Protection Act, 2019,"),
    ("(Source 2 Specific)", ""),
    ("Source 2 defines", "The Act defines"),
    ("Source 2 lists matters", "The Act lists matters"),
    ("*(Note: While Source 2 mentions 50 Lakhs in its summary table, the primary Act text in Source 1 explicitly states One Crore).*", ""),
    ("Here is the regenerated set of high-quality MCQs (Part 17 to Part 25), refined to be direct and exam-oriented, strictly removing references to \"study notes\" or \"source material.\"", ""),
    ("Source 2 mentions", "The Consumer Protection Act, 2019 mentions"), 
    # Catch any remaining Source 1/2 in explanations
    ("Source 1", "The Consumer Protection Act, 2019"),
    ("Source 2", "The Consumer Protection Act, 2019"),
]

for old, new in replacements:
    content = content.replace(old, new)

# Cleanup double spaces or weird punctuation potentially left behind
content = content.replace("  ", " ")
content = content.replace(" ,", ",")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned quizzes.ts")
