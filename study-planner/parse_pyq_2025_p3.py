
import json
import re

OPT_MAP = {'A': 0, 'B': 1, 'C': 2, 'D': 3}

# Answer Key will be extracted from file content itself if possible, OR we hardcode it based on the prompt.
# The user provided the answer key at the bottom of the raw file text I saved.
# I will read the file, split the Q&A section and the Answer Key section.

def parse_pyq_p3():
    with open('pyq_2025_p3_raw.txt', 'r', encoding='utf-8') as f:
        content = f.read()

    # Split Content and Key
    # Look for "Answer Key"
    # The file has "Answer Key" followed by table-like data.
    
    parts = content.split('Answer Key')
    if len(parts) < 2:
        print("Could not find Answer Key section")
        return

    q_text_block = parts[0]
    key_text_block = parts[1]
    
    # Parse Answer Key
    # Format: Q.No Answer Citation / Reasoning
    # 1 (D) ...
    # 2 (D) ...
    
    answer_map = {}
    
    # Regex for lines in key: `^(\d+)\s+\(([A-D])\)\s+(.*)`
    # Or tab separated
    
    # Let's clean key block first
    key_lines = key_text_block.strip().split('\n')
    for line in key_lines:
        line = line.strip()
        if not line or line.startswith('Q.No'):
            continue
            
        # Match `1 (D)` or `1(D)` or `1\t(D)`
        m = re.match(r'^(\d+)\s*\(?([A-D])\)?', line)
        if m:
            q_num = int(m.group(1))
            ans_char = m.group(2)
            # reasoning is the rest
            # But wait, looking at the raw file I saved:
            # 1	(D)	Article 311(2)...
            # It might be tab separated or space.
            
            # Find the answer part
            # The line might be `1 (D) Article...`
            # We captured 1 and D.
            
            answer_map[q_num] = ans_char
            
            # We can also extract explanation if we want!
            # The rest of the line after (D) is explanation.
            # But the raw text has `1\t(D)\tCitation...` likely.
            
            # Let's try to grab explanation
            # `line`
            # remove q_num and ans_char
            # simpler to split by (A)/(B)/(C)/(D)? No.
            
            # Just find where (D) is and take next.
            # actually `re.split` might work.
            pass
        else:
            # Maybe the line didn't match start?
            # 54(B) case
           m2 = re.match(r'^(\d+)\(?([A-D])\)?', line)
           if m2:
               answer_map[int(m2.group(1))] = m2.group(2)

    # Parse Questions
    # Pattern:
    # 1. Question text ...
    # (A) ...
    # (B) ...
    # (C) ...
    # (D) ...
    # [Empty line] or [Next Number]
    
    # We can split by `\n\d+\. `
    # But first, normalize start lines.
    
    # Regex to find start of questions: `\n(\d+)\.\s`
    # We adding a newline to start of q_text_block to ensure first Q matches
    q_text_block = "\n" + q_text_block
    
    # Split by `\n\d+\. `
    # re.split returns [preamble, q1_body, q2_body...]
    # Capture group `(\d+)` included in split result? No, unless in capturing group.
    # If we use `(\n\d+\.)` we get the delimiter too.
    
    segments = re.split(r'\n(\d+)\.\s', q_text_block)
    
    # segments[0] is empty or preamble.
    # segments[1] is number '1'
    # segments[2] is body of Q1
    # segments[3] is number '2'
    # segments[4] is body of Q2
    
    final_data = []
    
    count = 0
    # Iterate in steps of 2
    for i in range(1, len(segments), 2):
        q_num = int(segments[i])
        body = segments[i+1]
        
        # Parse body for text and options
        # Body contains Question Text \n (A) ... \n (B) ...
        
        # Split by options
        # We look for `\n(A)` or `(A)` at start of line
        
        # Regex for options: `\([A-D]\)`
        # Note: Sometimes they are on new lines, sometimes not?
        # In the provided text, they seem to be on new lines.
        
        # Now find the indices of (A), (B), (C), (D)
        # Use simple finding or regex split
        
        # Pattern: `\n\([A-D]\)` 
        # But we need to separate Q text from A.
        # We also need to handle the case where the first option (A) is at the start of the body or after a newline.
        
        # Use regex to find all options
        # We look for `(A)`, `(B)`, `(C)`, `(D)` that are at start of line or string
        
        # It's better to split by the specific pattern `\n\([A-D]\)` or `^\([A-D]\)`
        parts = re.split(r'(?:^|[\n\r]+)\(([A-D])\)', body)
        # parts[0] = Question Text
        # parts[1] = 'A', parts[2] = Option A Text
        # parts[3] = 'B', parts[4] = Option B Text
        
        q_text = parts[0].strip()
        options = {}
        
        # Loop through remainder
        current_opt = None
        for j in range(1, len(parts), 2):
            opt_label = parts[j]
            opt_text = parts[j+1].strip()
            options[opt_label] = opt_text
            
        # Ensure we have A, B, C, D
        if len(options) < 4:
            print(f"Warning: Q{q_num} missing options")
            # Try to salvage if possible or skip
            # If D is missing?
            
        op_list = [
            options.get('A', ''),
            options.get('B', ''),
            options.get('C', ''),
            options.get('D', '')
        ]
        
        ans_char = answer_map.get(q_num, 'A') # Default A if missing
        ans_idx = OPT_MAP.get(ans_char, 0)
        
        # Find explanation from key block?
        # We need to re-parse key block to get exact line explanation
        # For now, simplistic explanation
        
        expl = f"Correct Answer: {ans_char}"
        # detailed_expl = ... # Extract from key_text_block if we want better quality
        
        # Extract Explanation from Key Text
        # We iterate lines again.
        for k_line in key_lines:
             # loose match `^q_num (ans_char) (.*)`
             # Escape parenthesis for regex
             pat = rf'^{q_num}\s*\(?{ans_char}\)?\s*(.*)'
             m_expl = re.search(pat, k_line)
             if m_expl:
                 found_expl = m_expl.group(1).strip()
                 if found_expl:
                     expl = found_expl
                     
        q_obj = {
            'q': q_text,
            'o': op_list,
            'a': ans_idx,
            'e': expl
        }
        final_data.append(q_obj)
        count += 1

    print(f"Parsed {count} questions.")
    
    with open('pyq_2025_p3_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=4)

if __name__ == "__main__":
    parse_pyq_p3()
