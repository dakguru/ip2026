
def check_file():
    with open('src/data/quizzes.ts', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        if any(x in line for x in ["Source", "study material", "study notes", "document"]):
            print(f"{i+1}: {line.strip()}")

check_file()
