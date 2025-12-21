import json
import re

def update_quizzes():
    # Load new CPA data
    with open('cpa_data.json', 'r', encoding='utf-8') as f:
        cpa_questions = json.load(f)

    # Chunk into sets of 10
    chunks = [cpa_questions[i:i + 10] for i in range(0, len(cpa_questions), 10)]
    
    new_sets_str = "\n    // --- CPA 2019 SETS ---\n"
    start_id = 17
    
    for i, chunk in enumerate(chunks):
        set_id = start_id + i
        # Format chunk as JS object string
        # We need to be careful with formatting to match the file style
        # keys: q, o, a, e
        
        chunk_str = f"    {set_id}: [\n"
        for q in chunk:
            # Escape quotes in strings
            q_text = q['q'].replace('"', '\\"').replace('\n', '\\n')
            opts = q['o']
            opts_str = ", ".join([f'"{opt.replace("\"", "\\\"")}"' for opt in opts])
            ans = q['a']
            exp = q['e'].replace('"', '\\"').replace('\n', '\\n')
            
            line = f'        {{ q: "{q_text}", o: [{opts_str}], a: {ans}, e: "{exp}" }},\n'
            chunk_str += line
            
        chunk_str = chunk_str.rstrip(",\n") + "\n    ],\n"
        new_sets_str += chunk_str

    # Read existing quizzes.ts
    path = 'src/data/quizzes.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Insert new sets before the closing of ALL_SETS_DATA
    # Find the last set (16) and the closing brace
    # Regex to find the end of the object
    # It looks like: "    16: [ ... ]\n};"
    
    # We'll look for the last "};" which closes ALL_SETS_DATA
    # ALL_SETS_DATA starts at line 4 approx.
    # We can search for `const ALL_SETS_DATA: Record<number, any[]> = {` find the matching closing brace? 
    # Or just search for the specific pattern before `interface RawQuestion`
    
    pattern = r'(    16: \[.*?\]\s*};)'
    # Actually the `16: [...]` ends, then `  \n};`
    # Let's find `};` strictly before `interface RawQuestion`
    
    split_point = content.find('interface RawQuestion')
    if split_point == -1:
        print("Could not find split point")
        return

    first_part = content[:split_point]
    second_part = content[split_point:]
    
    # Find the last '};' in first_part
    last_brace = first_part.rfind('};')
    
    if last_brace == -1:
        print("Could not find closing brace")
        return
        
    # Insert new sets before the last brace
    updated_first_part = first_part[:last_brace] + new_sets_str + first_part[last_brace:]
    
    updated_content = updated_first_part + second_part
    
    # Now update the QUIZ_DATA entry for CPA
    # createTopic('p1-4', 'Consumer Protection Act, 2019', 'Paper I'),
    # Replace with:
    # createTopic('p1-4', 'Consumer Protection Act, 2019', 'Paper I', [17, 18, 19, 20, 21]),
    
    target_line = "createTopic('p1-4', 'Consumer Protection Act, 2019', 'Paper I'),"
    replacement_line = "createTopic('p1-4', 'Consumer Protection Act, 2019', 'Paper I', [17, 18, 19, 20, 21]),"
    
    if target_line in updated_content:
        updated_content = updated_content.replace(target_line, replacement_line)
    else:
        print("Could not find topic line to update")
        # Try finding it without comma if it was last? No it's in middle.
        # Maybe spaces differ?
        # Let's try regex for flexibility
        topic_regex = r"createTopic\('p1-4', 'Consumer Protection Act, 2019', 'Paper I'\)"
        updated_content = re.sub(topic_regex, "createTopic('p1-4', 'Consumer Protection Act, 2019', 'Paper I', [17, 18, 19, 20, 21])", updated_content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("Successfully updated quizzes.ts")

update_quizzes()
