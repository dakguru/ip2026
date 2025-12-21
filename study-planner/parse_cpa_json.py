import re
import json

def parse_questions(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    questions_raw = re.split(r'(?=\*\*Q\.\d+\.|Q\.\d+\.)', content)
    
    parsed_questions = []
    
    for q_raw in questions_raw:
        if not q_raw.strip():
            continue
            
        match = re.search(r'((\*\*Q\.|Q\.)\d+\..*?)(?=\s*[A]\.)(.*)', q_raw, re.DOTALL)
        if not match:
             continue

        q_text_full = match.group(1).strip()
        q_text = re.sub(r'^(\*\*Q\.|Q\.)\d+\.(\*\*)?\s*', '', q_text_full).strip()
        
        rest = match.group(3).strip()
        
        opt_matches = list(re.finditer(r'(\s*[A-D]\.\s)', rest))
        
        if len(opt_matches) < 4:
            continue
            
        start_a = opt_matches[0].start()
        start_b = opt_matches[1].start()
        start_c = opt_matches[2].start()
        start_d = opt_matches[3].start()
        
        ans_match = re.search(r'(\*\*Correct Answer:|Correct Answer:)', rest)
        end_d = ans_match.start() if ans_match else len(rest)
        
        opt_a = rest[start_a:start_b].strip()
        opt_b = rest[start_b:start_c].strip()
        opt_c = rest[start_c:start_d].strip()
        opt_d = rest[start_d:end_d].strip()
        
        opt_a = re.sub(r'^[A-D]\.\s*', '', opt_a)
        opt_b = re.sub(r'^[A-D]\.\s*', '', opt_b)
        opt_c = re.sub(r'^[A-D]\.\s*', '', opt_c)
        opt_d = re.sub(r'^[A-D]\.\s*', '', opt_d)
        
        options = [opt_a, opt_b, opt_c, opt_d]
        
        ans_section = rest[end_d:]
        ans_char_match = re.search(r'(?:Correct Answer:)\s*(\*\*|)?([A-D])', ans_section)
        if ans_char_match:
            ans_char = ans_char_match.group(2)
            ans_index = ord(ans_char) - ord('A')
        else:
            ans_index = 0
            
        exp_match = re.search(r'(?:Explanation:)(.*)', ans_section, re.DOTALL)
        if exp_match:
            explanation = exp_match.group(1).strip()
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
with open('cpa_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)
