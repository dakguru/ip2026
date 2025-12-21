
import json
import re

QUIZZES_FILE = 'src/data/quizzes.ts'
NEW_DATA_FILE = 'pyq_2025_p1_final.json'

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_set_string(set_id, questions):
    # Generates:   22: [\n    {...},\n  ],
    lines = []
    lines.append(f"  {set_id}: [")
    for q in questions:
        q_json = json.dumps(q['q'])
        o_json = json.dumps(q['o'])
        a_idx = q['a']
        e_val = q.get('e', '')
        if not e_val:
            e_val = f"Correct Answer: {q['o'][a_idx]}."
        e_json = json.dumps(e_val)
        
        lines.append(f"    {{ q: {q_json}, o: {o_json}, a: {a_idx}, e: {e_json} }},")
    lines.append("  ],")
    return "\n".join(lines)

def main():
    with open(QUIZZES_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_data = load_json(NEW_DATA_FILE)
    
    # Chunk into 5 sets (25 qs each)
    # Total 125 qs
    chunk_size = 25
    chunks = [new_data[i:i + chunk_size] for i in range(0, len(new_data), chunk_size)]
    
    # IDs: 22, 23, 24, 25, 26
    start_id = 22
    
    updated_content = content
    
    for i, chunk in enumerate(chunks):
        current_id = start_id + i
        
        new_set_str = generate_set_string(current_id, chunk)
        
        # Regex to find existing set block
        # Pattern:   22: \[.*?  \],
        # We need to be careful about matching square brackets and lazy quantification
        # Assuming indentation is 2 spaces
        
        pattern = f"\\s+{current_id}: \\[.*?\n\\s+\\],"
        
        # Check if set exists
        match = re.search(pattern, updated_content, re.DOTALL)
        
        if match:
            print(f"Replacing Set {current_id}...")
            updated_content = re.sub(pattern, "\n" + new_set_str, updated_content, flags=re.DOTALL, count=1)
        else:
            print(f"Set {current_id} not found to replace! (This might happen if it was the last item without comma?)")
            # If not found, maybe we should insert it?
            # But we expect it to exist from previous steps.
            # If it's the very last set, it might look slightly different (no trailing comma?)
            # But 26 is followed by 27 in my file, so it should have comma.
            
            # Alternative: If not found, look for pattern without trailing comma?
            pattern2 = f"\\s+{current_id}: \\[.*?\n\\s+\\]"
            match2 = re.search(pattern2, updated_content, re.DOTALL)
            if match2:
                print(f"Replacing Set {current_id} (Variant 2)...")
                updated_content = re.sub(pattern2, "\n" + new_set_str, updated_content, flags=re.DOTALL, count=1)
            else:
                print(f"CRITICAL: Could not find Set {current_id} in file.")

    with open(QUIZZES_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)
        
    print("Done updating quizzes.ts")

if __name__ == "__main__":
    main()
