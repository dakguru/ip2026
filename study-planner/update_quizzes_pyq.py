
import json
import re

def update_quizzes_final():
    with open('pyq_data.json', 'r', encoding='utf-8') as f:
        pyq_data = json.load(f)
        
    # Filter empty questions
    valid_data = [q for q in pyq_data if q['q'] and q['q'].strip()]
    
    print(f"Total valid questions: {len(valid_data)}")
    
    # Chunk into 25s
    sets = []
    chunk_size = 25
    for i in range(0, len(valid_data), chunk_size):
        sets.append(valid_data[i:i+chunk_size])
        
    # We will use IDs 22, 23, 24, 25, 26 ...
    start_id = 22
    
    # Generate TS string
    ts_sets = "\n    // --- LDCE IP 2025 PYQ SETS ---\n"
    set_ids = []
    
    for i, chunk in enumerate(sets):
        set_id = start_id + i
        set_ids.append(set_id)
        
        ts_sets += f"    {set_id}: [\n"
        for q in chunk:
            q_text = q['q'].replace('"', '\\"').replace('\n', '\\n')
            
            opts_formatted = []
            for opt in q['o']:
                if opt:
                    opt_esc = opt.replace('"', '\\"').replace('\n', '\\n')
                    opts_formatted.append(f'"{opt_esc}"')
                else:
                    opts_formatted.append('""')
            
            opts_str = ", ".join(opts_formatted)
            
            ans = q['a']
            exp = q['e'].replace('"', '\\"').replace('\n', '\\n')
            
            line = f'        {{ q: "{q_text}", o: [{opts_str}], a: {ans}, e: "{exp}" }},\n'
            ts_sets += line
            
        ts_sets = ts_sets.rstrip(",\n") + "\n    ],\n"

    # Read quizzes.ts
    path = 'src/data/quizzes.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Insert keys before `};` of ALL_SETS_DATA
    # Find `interface RawQuestion` and back up to `};`
    split_point = content.find('interface RawQuestion')
    prev_content = content[:split_point]
    insert_pos = prev_content.rfind('};')
    
    if insert_pos == -1:
        print("Could not find insert position")
        return
        
    new_content = content[:insert_pos] + ts_sets + content[insert_pos:]
    
    # Now add the topic
    # Search for `// --- PAPER III ---` to insert before it?
    # Or just after `p1-28`
    
    topic_insert_marker = "    // --- PAPER III ---"
    topic_pos = new_content.find(topic_insert_marker)
    
    if topic_pos == -1:
        print("Could not find topic insert position")
        # Just append to the end of QUIZ_DATA array?
        # QUIZ_DATA ends with `];`
        pass
    
    new_topic_entry = f"    createTopic('p1-29', 'Paper I - LDCE IP 2025 PYQ', 'Paper I', {set_ids}),\n"
    
    new_content = new_content[:topic_pos] + new_topic_entry + new_content[topic_pos:]
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Updated quizzes.ts with PYQ 2025")

update_quizzes_final()
