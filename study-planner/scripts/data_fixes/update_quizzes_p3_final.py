
import json
import re

QUIZZES_FILE = 'src/data/quizzes.ts'
JSON_FILE = 'pyq_2025_p3_final.json'

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_set_string(set_id, questions):
    # Generates:   27: [\n    {...},\n  ],
    lines = []
    lines.append(f"  {set_id}: [")
    for q in questions:
        q_json = json.dumps(q['q'])
        o_json = json.dumps(q['o'])
        a_idx = q['a']
        e_val = q.get('e', '')
        e_json = json.dumps(e_val)
        
        lines.append(f"    {{ q: {q_json}, o: {o_json}, a: {a_idx}, e: {e_json} }},")
    lines.append("  ],")
    return "\n".join(lines)

def main():
    data = load_json(JSON_FILE)
    
    chunk_size = 25
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    
    start_id = 27
    
    with open(QUIZZES_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
        
    updated_content = content
    
    # PROCESS SETS 27-30 (Replacements)
    for i in range(4): 
        set_id = start_id + i
        if i < len(chunks):
            chunk = chunks[i]
            new_str = generate_set_string(set_id, chunk)
            
            pattern = f"\\s+{set_id}: \\[.*?\n\\s+\\],"
            match = re.search(pattern, updated_content, re.DOTALL)
            
            if match:
                 print(f"Replacing Set {set_id}...")
                 # Use lambda to avoid re escaping issues
                 updated_content = re.sub(pattern, lambda m: "\n" + new_str, updated_content, flags=re.DOTALL, count=1)
            else:
                 print(f"Warning: Set {set_id} not found for replacement.")
                 
    # PROCESS SETS 31-32 (New Insertions)
    new_sets_str = ""
    for i in range(4, 6): 
        set_id = start_id + i
        if i < len(chunks):
             chunk = chunks[i]
             new_sets_str += generate_set_string(set_id, chunk) + "\n"
             
    if new_sets_str:
        pattern_30 = f"\\s+30: \\[.*?\n\\s+\\],"
        match_30 = re.search(pattern_30, updated_content, re.DOTALL)
        
        if match_30:
            print("Inserting Sets 31 & 32 after Set 30...")
            end_pos = match_30.end()
            updated_content = updated_content[:end_pos] + "\n" + new_sets_str + updated_content[end_pos:]
        else:
            print("Critical: Could not find Set 30 to append new sets.")
            
    # UPDATE TOPIC DEFINITION
    topic_pattern = r"(createTopic\('p3-20'.*?\[)(.*?)(\]\),)"
    match_topic = re.search(topic_pattern, updated_content)
    if match_topic:
        print("Updating Topic p3-20 definition...")
        # Use simple string replacement for this part as it is simpler and unlikely to have escapes
        old_full_str = match_topic.group(0)
        prefix = match_topic.group(1)
        suffix = match_topic.group(3)
        
        new_ids = "27, 28, 29, 30, 31, 32"
        replacement = f"{prefix}{new_ids}{suffix}"
        
        updated_content = updated_content.replace(old_full_str, replacement)
    else:
        print("Warning: Could not find Topic p3-20 definition.")
        
    with open(QUIZZES_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)
        
    print("Done updating quizzes.ts")

if __name__ == "__main__":
    main()
