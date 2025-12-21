import re
import json

def parse_questions(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by "Q.[number]."
    # Regex lookahead to find "Q." followed by digits and a dot, but keep the delimiter
    questions_raw = re.split(r'(?=Q\.\d+\.)', content)
    
    parsed_questions = []
    
    for q_raw in questions_raw:
        if not q_raw.strip():
            continue
            
        # 1. Extract Question Text
        # Usually from start until "A."
        # But we need to be careful about "A." appearing in the text. 
        # The options usually start with "A." on a new line or clearly separated.
        
        # Regex to find Options A, B, C, D
        # Assuming format: A. ... B. ... C. ... D. ...
        
        # A bit loose regex to capture the main parts
        match = re.search(r'(Q\.\d+\..*?)(?=A\.)(.*)', q_raw, re.DOTALL)
        if not match:
             # Try stricter if A. is not found (maybe stuck together)
             continue

        q_text_full = match.group(1).strip()
        # Remove "Q.1. " prefix
        q_text = re.sub(r'^Q\.\d+\.\s*', '', q_text_full).strip()
        
        rest = match.group(2).strip()
        
        # Extract Options
        # Logic: Find A., then look for B., C., D.
        # Options might contain newlines or be on same line
        
        # We can split by the Option markers
        # Use regex split but keep delimiters to know which is which? no, simpler:
        
        opt_matches = list(re.finditer(r'([A-D]\.)', rest))
        
        if len(opt_matches) < 4:
            # Fallback or skip
            continue
            
        # Get indices
        start_a = opt_matches[0].start()
        start_b = opt_matches[1].start()
        start_c = opt_matches[2].start()
        start_d = opt_matches[3].start()
        
        # Check for "Correct Answer:" or "Answer:" to end option D
        ans_match = re.search(r'(Correct Answer:|Answer:)', rest)
        end_d = ans_match.start() if ans_match else len(rest)
        
        opt_a = rest[start_a+2:start_b].strip()
        opt_b = rest[start_b+2:start_c].strip()
        opt_c = rest[start_c+2:start_d].strip()
        opt_d = rest[start_d+2:end_d].strip()
        
        options = [opt_a, opt_b, opt_c, opt_d]
        
        # Extract Answer
        ans_section = rest[end_d:]
        # Find "Correct Answer: X"
        ans_char_match = re.search(r'(?:Correct Answer:|Answer:)\s*([A-D])', ans_section)
        if ans_char_match:
            ans_char = ans_char_match.group(1)
            ans_index = ord(ans_char) - ord('A')
        else:
            ans_index = 0 # Default fallback
            
        # Extract Explanation
        # "Explanation: ..."
        exp_match = re.search(r'Explanation:\s*(.*)', ans_section, re.DOTALL)
        explanation = exp_match.group(1).strip() if exp_match else "See explanation."
        
        parsed_questions.append({
            "q": q_text,
            "o": options,
            "a": ans_index,
            "e": explanation
        })
        
    return parsed_questions

data = parse_questions('pmla_raw.txt')
print("const PMLA_QUESTIONS = " + json.dumps(data, indent=4) + ";")
