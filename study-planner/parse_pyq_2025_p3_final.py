
import json
import re

INPUT_FILE = 'pyq_2025_p3_final_raw.txt'
OUTPUT_FILE = 'pyq_2025_p3_final.json'

def parse_option_blocks(full_text):
    # Splits text into Q part, A, B, C, D content
    # Identifies trailing text (Instructions/Passages)
    
    # regex for options
    # We look for (A), (B), (C), (D)
    # Using capture groups to find indices
    
    patterns = [r'\(A\)', r'\(B\)', r'\(C\)', r'\(D\)']
    indices = []
    
    for p in patterns:
        match = re.search(p, full_text)
        if match:
            indices.append((match.start(), match.end(), p))
    
    indices.sort() # sort by position
    
    if len(indices) < 4:
        # Fallback or error
        return full_text.strip(), [], ""
        
    q_text = full_text[:indices[0][0]].strip()
    
    options = []
    trailing_text = ""
    
    for i in range(4):
        start = indices[i][1]
        if i < 3:
            end = indices[i+1][0]
            opt_content = full_text[start:end].strip()
            options.append(opt_content)
        else:
            # Last option (D)
            # Content is from matching end to... potential end of option
            # Here we need to check if there is a 'Passage' or 'Direction'
            
            rest = full_text[start:]
            
            # Common separators for Passages:
            # "Read the following passage"
            # "Read the short passage"
            # "Directions:"
            
            split_markers = [
                "Read the following passage",
                "Read the short passage",
                "DIRECTIONS", 
                "INTEGRATE ANSWERS"
            ]
            
            found_split = -1
            split_marker_str = ""
            
            for marker in split_markers:
                idx = rest.find(marker)
                if idx != -1:
                    # found a marker
                    # Take the first one found ? Or minimal index?
                    if found_split == -1 or idx < found_split:
                        found_split = idx
                        split_marker_str = marker
                        
            if found_split != -1:
                opt_content = rest[:found_split].strip()
                trailing_text = rest[found_split:].strip()
            else:
                opt_content = rest.strip()
                
            options.append(opt_content)
            
    return q_text, options, trailing_text

def main():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Phase 1: Split Questions vs Answers
    question_lines = []
    answer_lines = []
    
    # We know we have 150 questions.
    # We scan for "1. D" pattern after we have presumably finished questions.
    # Heuristic: 
    # Questions usually have significant length. Answers are short.
    # Let's look for the line "1. " appearing a second time.
    
    first_one_seen = False
    switch_to_answers = False
    
    idx_150_found = False
    
    for i, line in enumerate(lines):
        # Clean line
        stripped = line.strip()
        
        # Detect 150.
        if stripped.startswith("150."):
            idx_150_found = True
            
        # Detect Answer Key start: "1. X" after 150 found
        # Or just "1. X" if we are far enough
        
        if idx_150_found:
            # Look for 1. 
            match_ans = re.match(r'^1\.\s+[A-D]', stripped)
            if match_ans:
                switch_to_answers = True
                
        if switch_to_answers:
            answer_lines.append(line)
        else:
            question_lines.append(line)
            
    # Phase 2: Parse Questions
    # Group by "Number."
    
    valid_starts = []
    # Identify line indices where questions start
    for i, line in enumerate(question_lines):
        if re.match(r'^\d+\.', line.strip()):
            valid_starts.append(i)
            
    parsed_questions = []
    
    carry_over_text = "" # To hold Passage text
    
    for i in range(len(valid_starts)):
        start_idx = valid_starts[i]
        end_idx = valid_starts[i+1] if i+1 < len(valid_starts) else len(question_lines)
        
        block_lines = question_lines[start_idx:end_idx]
        block_text = "".join(block_lines)
        
        # Extract Number
        match_num = re.match(r'^(\d+)\.', block_text)
        if not match_num:
            continue
            
        q_id = int(match_num.group(1))
        
        # Remove "123. " from start
        content_after_num = block_text[match_num.end():]
        
        # Prepend any carry over (Passage)
        if carry_over_text:
            content_after_num = "[INSTRUCTION]: " + carry_over_text + "\n\n" + content_after_num
            carry_over_text = ""
            
        q_text, opts, trailing = parse_option_blocks(content_after_num)
        
        if trailing:
            carry_over_text = trailing
            
        # If options missing (maybe specific question types?), handle gracefully
        if not opts:
            # print(f"Warning: Q{q_id} has no options.")
            pass
            
        parsed_questions.append({
            "id": q_id,
            "q": q_text.strip(),
            "o": opts
        })
        
    # Phase 3: Parse Answer Key
    # Format: "1. D" possibly multiple per line? Or one per line.
    # The file has "1. D \n 2. A" (one per line usually)
    
    answers = {}
    
    # Just regex find all `\d+\.\s+[A-D]` in the answer section block
    ans_text_block = " ".join(answer_lines) # Join to handle generic spacing
    ans_matches = re.findall(r'(\d+)\.\s+([A-D])', ans_text_block)
    
    for num_str, char in ans_matches:
        answers[int(num_str)] = char
        
    print(f"Parsed {len(parsed_questions)} questions.")
    print(f"Parsed {len(answers)} answers.")
    
    # Phase 4: Merge
    final_output = []
    
    for q in parsed_questions:
        qid = q['id']
        ans_char = answers.get(qid, 'A') # Default A
        
        # Map char to index
        idx_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
        a_idx = idx_map.get(ans_char, 0)
        
        final_output.append({
            "q": q['q'],
            "o": q['o'],
            "a": a_idx,
            "e": f"Correct Answer: {ans_char}"
        })
        
    # Write JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_output, f, indent=2)
        
    print(f"Saved {len(final_output)} items to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
