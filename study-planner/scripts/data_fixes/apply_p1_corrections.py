
import json
import re

QUIZZES_FILE = 'src/data/quizzes.ts'
JSON_FILE = 'pyq_2025_p1_final.json'
ANSWERS_FILE = 'p1_new_answers.txt'

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_answers(path):
    answers = {}
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line: continue
            # Format: "1. A" or "1 A"
            parts = re.split(r'[\.\s]+', line)
            if len(parts) >= 2:
                q_num = int(parts[0])
                ans = parts[1].upper()
                answers[q_num] = ans
    return answers

def generate_set_string(set_id, questions):
    # Generates:   22: [\n    {...},\n  ],
    lines = []
    lines.append(f"  {set_id}: [")
    for q in questions:
        q_json = json.dumps(q['q'])
        o_json = json.dumps(q['o'])
        a_idx = q['a']
        e_val = q.get('e', '')
        # Always update explanation to reflect new correct answer if it's generic
        # Or just regenerate it
        # The stored explanation might be "Correct Answer: B" from previous run.
        # We should just regenerate it to be safe.
        
        # Check valid index
        if 0 <= a_idx < len(q['o']):
             e_val = f"Correct Answer: {q['o'][a_idx]}."
        else:
             e_val = "Correct Answer: (Data Error)"
             
        e_json = json.dumps(e_val)
        
        lines.append(f"    {{ q: {q_json}, o: {o_json}, a: {a_idx}, e: {e_json} }},")
    lines.append("  ],")
    return "\n".join(lines)

def main():
    # 1. Update JSON with new answers
    data = load_json(JSON_FILE)
    new_answers = parse_answers(ANSWERS_FILE)
    
    print(f"Loaded {len(data)} questions and {len(new_answers)} new answers.")
    
    for i, item in enumerate(data):
        q_num = i + 1
        if q_num in new_answers:
            ans_char = new_answers[q_num]
            # Convert char to index
            ans_idx = ord(ans_char) - ord('A')
            if 0 <= ans_idx <= 3:
                item['a'] = ans_idx
                # Update explanation (will be handled in generate_set_string roughly, but update here too)
                item['e'] = f"Correct Answer: {ans_char}"
            else:
                print(f"Warning: Invalid answer char {ans_char} for Q{q_num}")
                
    # Save back updated JSON
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
        
    print("Updated JSON file with new answers.")
    
    # 2. Update Quizzes.ts
    with open(QUIZZES_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
        
    chunk_size = 25
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    
    updated_content = content
    start_id = 22
    
    for i, chunk in enumerate(chunks):
        current_id = start_id + i
        new_set_str = generate_set_string(current_id, chunk)
        
        # Regex to find existing set block
        # We look for `  22: [ ... ],`
        # Using DOTALL
        
        pattern = f"\\s+{current_id}: \\[.*?\n\\s+\\],"
        
        # Check for trailing comma match first
        match = re.search(pattern, updated_content, re.DOTALL)
        if match:
             updated_content = re.sub(pattern, "\n" + new_set_str, updated_content, flags=re.DOTALL, count=1)
        else:
             # Try without trailing comma
             pattern2 = f"\\s+{current_id}: \\[.*?\n\\s+\\]"
             match2 = re.search(pattern2, updated_content, re.DOTALL)
             if match2:
                  updated_content = re.sub(pattern2, "\n" + new_set_str, updated_content, flags=re.DOTALL, count=1)
             else:
                  print(f"Could not find set {current_id} to update.")
                  
    with open(QUIZZES_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)
        
    print("Updated quizzes.ts with corrected answers.")

if __name__ == "__main__":
    main()
