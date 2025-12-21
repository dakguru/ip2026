import re
import json

def parse_questions(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by "Q.number." patterns
    # Regex lookahead to find "Q." followed by digits and a dot
    # The input format uses "**Q.1.**" or "Q.1."
    
    # We will use a regex that matches the start of a question.
    # It seems they are mostly like "**Q.X."
    
    questions_raw = re.split(r'(?=\*\*Q\.\d+\.|Q\.\d+\.)', content)
    
    parsed_questions = []
    
    for q_raw in questions_raw:
        if not q_raw.strip():
            continue
            
        # Remove "Part X: ..." header if it exists at the start of the chunk (it might be attached to previous chunk or start of this one)
        # Actually split might leave it in the previous chunk, but checking just in case.
        
        # 1. Extract Question Text
        # Find start of options. Options start with "A."
        # Use regex to separate Question Text from Options
        
        match = re.search(r'((\*\*Q\.|Q\.)\d+\..*?)(?=\s*[A]\.)(.*)', q_raw, re.DOTALL)
        if not match:
             continue

        q_text_full = match.group(1).strip()
        
        # Clean up Question Text
        # Remove the leading "**Q.1.** " or "Q.1. "
        q_text = re.sub(r'^(\*\*Q\.|Q\.)\d+\.(\*\*)?\s*', '', q_text_full).strip()
        
        # Determine if there are list items (1. 2. 3.) in the text and ensure newlines are preserved
        # The raw read should preserve newlines.
        
        rest = match.group(3).strip()
        
        # Extract Options
        # Logic: Find A., then look for B., C., D.
        
        opt_matches = list(re.finditer(r'(\s*[A-D]\.\s)', rest))
        
        if len(opt_matches) < 4:
            continue
            
        start_a = opt_matches[0].start()
        start_b = opt_matches[1].start()
        start_c = opt_matches[2].start()
        start_d = opt_matches[3].start()
        
        # End of D is where "Correct Answer" starts
        ans_match = re.search(r'(\*\*Correct Answer:|Correct Answer:)', rest)
        end_d = ans_match.start() if ans_match else len(rest)
        
        opt_a = rest[start_a:start_b].strip() # keeps "A. "
        opt_b = rest[start_b:start_c].strip()
        opt_c = rest[start_c:start_d].strip()
        opt_d = rest[start_d:end_d].strip()
        
        # Remove "A. ", "B. " etc from options if desired, or keep them. 
        # Usually checking previous data, we remove them.
        opt_a = re.sub(r'^[A-D]\.\s*', '', opt_a)
        opt_b = re.sub(r'^[A-D]\.\s*', '', opt_b)
        opt_c = re.sub(r'^[A-D]\.\s*', '', opt_c)
        opt_d = re.sub(r'^[A-D]\.\s*', '', opt_d)
        
        options = [opt_a, opt_b, opt_c, opt_d]
        
        # Extract Answer
        ans_section = rest[end_d:]
        ans_char_match = re.search(r'(?:Correct Answer:)\s*(\*\*|)?([A-D])', ans_section)
        if ans_char_match:
            ans_char = ans_char_match.group(2)
            ans_index = ord(ans_char) - ord('A')
        else:
            ans_index = 0
            
        # Extract Explanation
        exp_match = re.search(r'(?:Explanation:)(.*)', ans_section, re.DOTALL)
        if exp_match:
            explanation = exp_match.group(1).strip()
            # Remove leading "**" if present
            explanation = explanation.replace('**', '')
        else:
            explanation = "See explanation."
        
        parsed_questions.append({
            "q": q_text,
            "o": options,
            "a": ans_index,
            "e": explanation
        })
        
    return parsed_questions

data = parse_questions('cpa_raw.txt')
print("const CPA_QUESTIONS = " + json.dumps(data, indent=4) + ";")
