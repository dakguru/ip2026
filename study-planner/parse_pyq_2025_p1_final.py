
import json
import re

INPUT_FILE = 'pyq_2025_p1_final_raw.txt'
OUTPUT_FILE = 'pyq_2025_p1_final.json'

def parse_answer_table(lines):
    # Find where the table starts
    table_start_idx = -1
    for i, line in enumerate(lines):
        if "Q. No." in line and "Answer" in line:
            table_start_idx = i
            break
            
    if table_start_idx == -1:
        print("Could not find answer table start.")
        return {}
        
    answers = {}
    
    # Process lines after header
    for line in lines[table_start_idx+1:]:
        line = line.strip()
        if not line: continue
        
        # Split by whitespace/tabs
        parts = re.split(r'\s+', line)
        
        # Should be pairs of (QNo, Ans)
        # e.g. 1 A 26 A 51 B ...
        
        # Iterate in steps of 2
        for i in range(0, len(parts), 2):
            if i+1 < len(parts):
                q_num_str = parts[i]
                ans_char = parts[i+1]
                
                # Verify q_num is a number
                if q_num_str.isdigit():
                    answers[int(q_num_str)] = ans_char
                    
    return answers, table_start_idx

def parse_questions(lines, end_idx):
    questions_data = []
    
    full_text = "\n".join(lines[:end_idx])
    
    # Split by Question Number pattern "1 ", "2 ", etc.
    # Regex: `\n\d+ ` or `^\d+ `
    
    # Normalized split
    # We'll use a regex lookahead to split but keep the delimiter? No, split consumes.
    # Let's find all starts.
    
    # Pattern: Digit(s) Space (Start of question)
    
    # Let's try matching each question block.
    # Questions start with `^\d+ ` (at start of line) usually
    
    # Let's re-read line by line to build blocks
    
    current_q_num = None
    current_block = []
    
    blocks = {}
    
    for line in lines[:end_idx]:
        line = line.strip()
        if not line: continue
        
        # Check if line starts with number
        match = re.match(r'^(\d+)\s+(.*)', line)
        if match:
            # New question
            if current_q_num is not None:
                blocks[current_q_num] = "\n".join(current_block)
            
            current_q_num = int(match.group(1))
            current_block = [match.group(2)]
        else:
            if current_q_num is not None:
                current_block.append(line)
                
    # Last block
    if current_q_num is not None:
        blocks[current_q_num] = "\n".join(current_block)
        
    parsed_qs = []
    
    for q_num in sorted(blocks.keys()):
        text = blocks[q_num]
        
        # Extract Options (A) ... (B) ...
        # Regex for options. 
        # Sometimes options are on new lines, sometimes inline.
        
        # We look for (A), (B), (C), (D)
        
        # Let's use a regex to split.
        # Pattern: `\((A|B|C|D|a|b|c|d)\)`
        
        # Note: Some texts might have `(i)`, `(ii)` etc. so be careful not to split on those if they are part of question.
        # But usually options are strictly (A)...
        
        # Robust strategy: Find indices of (A), (B), (C), (D)
        # They should be in order.
        
        # Regex to find all option starts
        opt_matches = list(re.finditer(r'\(([A-D])\)', text))
        
        if len(opt_matches) < 4:
            # Maybe options are just A. B. C. D. ?(Sample uses (A))
            # Or maybe fewer options? (Rare)
            # Log warning
            print(f"Warning: Q{q_num} has fewer than 4 options detected.")
            pass
            
        # We assume the last 4 matches are the options if there are more (e.g. if question text has (A) inside it? unlikely)
        # But usually question text uses (i) (ii).
        
        # Let's take the last 4 matches that look like options A, B, C, D in order?
        # Or just take all matches and try to parse.
        
        # Simple approach: Split by `(A) `
        
        # Let's try to locate the Start of (A)
        
        parts = re.split(r'\s*\([A-D]\)\s+', text)
        # parts[0] is question text
        # parts[1] is Option A content
        # parts[2] is Option B...
        
        # But `re.split` consumes the delimiter. We want to know which option is which.
        
        # Use finditer to get positions
        
        # We expect (A), (B), (C), (D)
        
        idx_a = text.find('(A)')
        idx_b = text.find('(B)')
        idx_c = text.find('(C)')
        idx_d = text.find('(D)')
        
        if idx_a == -1 or idx_b == -1 or idx_c == -1 or idx_d == -1:
             # Fallback or error
             print(f"Error parsing options for Q{q_num}")
             continue
             
        # Extract substrings
        q_text = text[:idx_a].strip()
        
        # Use sorted indices to handle if they occupy different order (unlikely) or just to slice safely
        indices = [(idx_a, 'A'), (idx_b, 'B'), (idx_c, 'C'), (idx_d, 'D')]
        indices.sort()
        
        options = []
        for i in range(len(indices)):
            start = indices[i][0] + 3 # Len of (X) is 3
            if i < len(indices) - 1:
                end = indices[i+1][0]
            else:
                end = len(text)
            
            opt_text = text[start:end].strip()
            # Clean trailing punctuation?
            options.append(opt_text)
            
        parsed_qs.append({
            'id': q_num,
            'q': q_text,
            'o': options
        })
        
    return parsed_qs

def main():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    answers, table_start_idx = parse_answer_table(lines)
    print(f"Found {len(answers)} answers.")
    
    # Only parse up to table start
    questions = parse_questions(lines, table_start_idx)
    print(f"Parsed {len(questions)} questions.")
    
    final_data = []
    
    for q in questions:
        q_num = q['id']
        ans_char = answers.get(q_num, 'A') # Default to A if missing
        
        # Convert Char to Index
        ans_idx = ord(ans_char.upper()) - ord('A')
        if ans_idx < 0 or ans_idx > 3:
            ans_idx = 0
            
        final_data.append({
            'q': q['q'],
            'o': q['o'],
            'a': ans_idx,
            'e': f"Correct Answer: {ans_char}"
        })
        
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=2)
        
    print(f"Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
