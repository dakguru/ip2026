
import json
import re

QUIZZES_FILE = 'src/data/quizzes.ts'
P1_FILE = 'pyq_data.json'
P3_FILE = 'pyq_2025_p3_data.json'

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def chunk_data(data, chunk_size=25):
    return [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]

def generate_ts(sets_data):
    ts_output = []
    for set_id, questions in sets_data.items():
        ts_output.append(f"  {set_id}: [")
        for q in questions:
            # Safe JSON dump for string content
            q_json = json.dumps(q['q'])
            o_json = json.dumps(q['o'])
            a_idx = q['a']
            e_val = q.get('e', '')
            if not e_val:
                e_val = f"Correct Answer: {q['o'][a_idx]}."
            e_json = json.dumps(e_val)
            
            ts_output.append(f"    {{ q: {q_json}, o: {o_json}, a: {a_idx}, e: {e_json} }},")
        ts_output.append("  ],")
    return "\n".join(ts_output)

def main():
    p1_data = load_json(P1_FILE)
    p3_data = load_json(P3_FILE)
    
    # Paper I Sets (IDs 22, 23, 24, 25, 26)
    p1_chunks = chunk_data(p1_data, 25)
    sets_map = {}
    next_id = 22
    p1_ids = []
    for chunk in p1_chunks:
        sets_map[next_id] = chunk
        p1_ids.append(next_id)
        next_id += 1
        
    # Paper III Sets (IDs 27, 28, 29, 30)
    p3_chunks = chunk_data(p3_data, 25)
    p3_ids = []
    for chunk in p3_chunks:
        sets_map[next_id] = chunk
        p3_ids.append(next_id)
        next_id += 1
    
    new_sets_block = generate_ts(sets_map)
    
    # Read Quizzes File
    with open(QUIZZES_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 1. Update ALL_SETS_DATA
    # Find start and end
    # Start: // --- LDCE IP 2025 PYQ SETS ---
    # End: }; (marking end of ALL_SETS_DATA object)
    
    start_marker = "// --- LDCE IP 2025 PYQ SETS ---"
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Could not find start marker for PYQ sets")
        return

    # Find the closing brace of the object.
    # We assume the object ends with `};`
    # We search for `};` starting from start_idx
    end_idx = content.find("};", start_idx)
    if end_idx == -1:
        print("Could not find end of ALL_SETS_DATA")
        return
        
    # Construct new content
    # Preserve start marker
    # Insert new sets
    # Preserve content after end_idx (the };)
    
    # We need to see if start_marker line needs newline
    # content[start_idx : end_idx] is the block to replace (excluding `};`)
    
    pre_block = content[:start_idx + len(start_marker)]
    post_block = content[end_idx:]
    
    updated_content = pre_block + "\n" + new_sets_block + "\n" + post_block
    
    # 2. Update QUIZ_DATA
    # Remove old duplicate p1-29 if present
    # Regex to find: createTopic\('p1-29', 'LDCE IP 2025 - Paper I PYQ', 'Paper I', .*\),?
    
    # Actually, we want to REMOVE the one with 'Paper I' category if it conflicts or is duplicate.
    # The user instruction was to use 'PYQ' category.
    # So if I find `createTopic('p1-29', ..., 'Paper I', ...)` I should remove it.
    
    # Let's clean up `p1-29` entries first.
    # I'll replace all existing p1-29 lines with nothing, then add the new correct one at the end.
    
    # Regex for any p1-29 line
    # `\s*createTopic\('p1-29'.*?\),?`
    
    updated_content = re.sub(r'\s*createTopic\(\'p1-29\'.*?\),?', '', updated_content, flags=re.DOTALL)
    
    # Remove `p3-20` if it exists to avoid dupes
    updated_content = re.sub(r'\s*createTopic\(\'p3-20\'.*?\),?', '', updated_content, flags=re.DOTALL)
    
    # Now append the correct lines at the end of QUIZ_DATA array
    # QUIZ_DATA ends with `];`
    # We find `];` and insert before it.
    
    quiz_data_end = updated_content.rfind('];')
    if quiz_data_end == -1:
         print("Could not find end of QUIZ_DATA")
         return
         
    # Insert before `];`
    # We need to comma separate if needed. The regex removal might have left a trailing comma or not.
    # Safest is to ensure the line before has a comma, or just prepend comma.
    
    new_topics = f"\n  createTopic('p1-29', 'LDCE IP 2025 - Paper I PYQ', 'PYQ', {p1_ids}),"
    new_topics += f"\n  createTopic('p3-20', 'LDCE IP 2025 - Paper III PYQ', 'PYQ', {p3_ids}),\n"
    
    updated_content = updated_content[:quiz_data_end] + new_topics + updated_content[quiz_data_end:]
    
    with open(QUIZZES_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)
        
    print("Successfully updated quizzes.ts")

if __name__ == "__main__":
    main()
