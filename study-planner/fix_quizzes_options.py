import json
import re

def fix_quizzes():
    # Load CPA data
    with open('cpa_data.json', 'r', encoding='utf-8') as f:
        cpa_questions = json.load(f)

    # Chunk
    chunks = [cpa_questions[i:i + 10] for i in range(0, len(cpa_questions), 10)]
    
    new_sets_str = "// --- CPA 2019 SETS ---\n"
    start_id = 17
    
    for i, chunk in enumerate(chunks):
        set_id = start_id + i
        chunk_str = f"    {set_id}: [\n"
        for q in chunk:
            q_text = q['q'].replace('"', '\\"').replace('\n', '\\n')
            
            # FIX: Escape newlines in options too
            opts = q['o']
            # Escape " and \n
            opts_formatted = []
            for opt in opts:
                opt_esc = opt.replace('"', '\\"').replace('\n', '\\n')
                opts_formatted.append(f'"{opt_esc}"')
            
            opts_str = ", ".join(opts_formatted)
            
            ans = q['a']
            exp = q['e'].replace('"', '\\"').replace('\n', '\\n')
            
            line = f'        {{ q: "{q_text}", o: [{opts_str}], a: {ans}, e: "{exp}" }},\n'
            chunk_str += line
            
        chunk_str = chunk_str.rstrip(",\n") + "\n    ],\n"
        new_sets_str += chunk_str

    # Remove the last comma and newline from the very last set entry if needed?
    # No, it's inside an object, so trailing comma is fine/good.
    # But strictly, the last item in object doesn't need it, but TS allows it.
    
    # Read file
    path = 'src/data/quizzes.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the start of the bad block
    marker = "// --- CPA 2019 SETS ---"
    start_idx = content.find(marker)
    
    if start_idx == -1:
        print("Could not find marker")
        return

    # Find the end of the ALL_SETS_DATA object.
    # It ends with `};`
    # We can search for `};` starting from start_idx
    
    # However, `createTopic` calls also contain `}`, `);` etc.
    # ALL_SETS_DATA is defined as `const ALL_SETS_DATA ... = { ... };`
    # So we are looking for the closing `};` of that object.
    
    # We can assume the sets 17-21 go on until the `interface RawQuestion`?
    # No, `interface RawQuestion` is AFTER `ALL_SETS_DATA`.
    
    end_marker_idx = content.find('interface RawQuestion')
    if end_marker_idx == -1:
         # Maybe searched incorrectly?
         # Let's verify by just looking for the closing brace before `interface RawQuestion`
         pass
         
    # Let's look for `};` before `interface RawQuestion`
    split_point = content.find('interface RawQuestion')
    prev_content = content[:split_point]
    end_idx = prev_content.rfind('};')
    
    if end_idx == -1:
        print("Could not find end of object")
        return
        
    # Replace content between start_idx and end_idx
    # But wait, `new_sets_str` includes `// --- CPA ...`
    # So we replace from start_idx to end_idx (exclusive of `};`)
    
    # Ensure correct content
    # The existing file has:
    # ...
    #     ],
    # 
    #     // --- CPA 2019 SETS ---
    #     17: [ ...
    # ...
    # };
    
    # We want to replace from `// --- CPA ...` up to (but not including) `};`
    
    new_content = content[:start_idx] + new_sets_str + content[end_idx:]
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Fixed quizzes.ts options escaping.")

fix_quizzes()
