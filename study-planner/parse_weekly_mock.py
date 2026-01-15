import re
import json

def parse_mock_test(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into Question Paper and Answer Key
    parts = content.split("### **SECTION 2: ANSWER KEY & DETAILED EXPLANATIONS**")
    questions_part = parts[0]
    answers_part = parts[1] if len(parts) > 1 else ""

    questions = []
    
    # Regex for Questions: **Q1. ...**
    q_pattern = re.compile(r'\*\*Q(\d+)\.\s+(.*?)\*\*')
    
    # Regex for Options: A. ... B. ...
    opt_pattern = re.compile(r'([A-D])\.\s+(.*)')

    # Extract questions
    q_matches = list(q_pattern.finditer(questions_part))
    
    for i in range(len(q_matches)):
        q_match = q_matches[i]
        q_num = q_match.group(1)
        q_text_start = q_match.end()
        
        # Find end of this question (start of next or end of section)
        if i + 1 < len(q_matches):
            q_text_end = q_matches[i+1].start()
        else:
            q_text_end = len(questions_part)
            
        full_q_text = questions_part[q_text_start:q_text_end].strip()
        
        # Split into text and options
        # Options usually start with A. 
        # But we need to handle "1. ... 2. ..." statements before options
        
        # Find the start of options "A."
        options_start = full_q_text.find("A. ")
        if options_start == -1:
             # Try newline A.
             options_start = full_q_text.find("\nA.")
        
        if options_start != -1:
            q_body = full_q_text[:options_start].strip()
            # Append the bold title to the body
            q_body = q_match.group(2) + "\n\n" + q_body
            
            options_block = full_q_text[options_start:]
            options = []
            
            # Simple line-by-line option parsing
            lines = options_block.split('\n')
            for line in lines:
                line = line.strip()
                if line.startswith("A. ") or line.startswith("B. ") or line.startswith("C. ") or line.startswith("D. "):
                   options.append(line[3:].strip())
        else:
            q_body = q_match.group(2) + "\n" + full_q_text
            options = []

        questions.append({
            'id': f"weekly-01-{q_num}",
            'num': q_num,
            'text': q_body.strip(),
            'options': options,
            'correctAnswer': -1,
            'explanation': ""
        })

    # Parse Answers
    # Format: **Q1: B** ... * **Concept**: ...
    
    a_pattern = re.compile(r'\*\*Q(\d+):\s+([A-D])\*\*')
    a_matches = list(a_pattern.finditer(answers_part))
    
    for i in range(len(a_matches)):
        a_match = a_matches[i]
        q_num = a_match.group(1)
        correct_opt = a_match.group(2)
        
        # Map A,B,C,D to 0,1,2,3
        correct_idx = {'A': 0, 'B': 1, 'C': 2, 'D': 3}.get(correct_opt, -1)
        
        # Find explanation
        exp_start = a_match.end()
        if i + 1 < len(a_matches):
            exp_end = a_matches[i+1].start()
        else:
            exp_end = len(answers_part)
            
        explanation = answers_part[exp_start:exp_end].strip()
        
        # Find corresponding question
        for q in questions:
            if q['num'] == q_num:
                q['correctAnswer'] = correct_idx
                q['explanation'] = explanation
                break
                
    # Clean up and Format for TS
    ts_output = """import { Question } from "./live_mock_data";

export const WEEKLY_MOCK_01_QUESTIONS: Question[] = [
"""
    
    for q in questions:
        # Check for table in text
        # If text contains | ... | ... |
        # We might need to handle it manually or just leave as text if the frontend handles markdown tables (which it likely doesn't natively unless using a markdown renderer)
        # But looking at live_mock_data.ts, there is a `table` property.
        # For now, let's just dump text.
        
        # Escape quotes
        text_safe = q['text'].replace('"', '\\"').replace('\n', '\\n')
        exp_safe = q['explanation'].replace('"', '\\"').replace('\n', '\\n')
        
        opts_str = ", ".join([f'"{opt.replace('"', '\\"')}"' for opt in q['options']])
        
        ts_output += f"""    {{
        id: "{q['id']}",
        text: "{text_safe}",
        options: [{opts_str}],
        correctAnswer: {q['correctAnswer']},
        explanation: "{exp_safe}"
    }},
"""
    ts_output += "];\n"
    
    with open('src/data/weekly_mock_data_01.ts', 'w', encoding='utf-8') as f:
        f.write(ts_output)

    print(f"Generated src/data/weekly_mock_data_01.ts with {len(questions)} questions.")

if __name__ == "__main__":
    parse_mock_test(r"C:\Users\arun1\OneDrive\Desktop\IP 2026\Weekly Mock Test - 01.txt")
