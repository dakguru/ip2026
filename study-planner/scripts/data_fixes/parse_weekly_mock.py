import re
import json

def parse_mock_test(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into Question Paper and Answer Key
    # Split into Question Paper and Answer Key
    if "### **SECTION 2: ANSWER KEY & DETAILED EXPLANATIONS**" in content:
        parts = content.split("### **SECTION 2: ANSWER KEY & DETAILED EXPLANATIONS**")
    elif "**PART 2: ANSWER KEY & DETAILED EXPLANATIONS**" in content:
        parts = content.split("**PART 2: ANSWER KEY & DETAILED EXPLANATIONS**")
    else:
        parts = [content]

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
        
        # Find the start of options "A." or "A)"
        options_start = full_q_text.find("A. ")
        if options_start == -1:
             # Try newline A.
             options_start = full_q_text.find("\nA.")
        if options_start == -1:
             options_start = full_q_text.find("A) ")
        if options_start == -1:
             options_start = full_q_text.find("\nA)")
        
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
                elif line.startswith("A) ") or line.startswith("B) ") or line.startswith("C) ") or line.startswith("D) "):
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
    # Format 1: **Q1: B**
    # Format 2: **Q1: Correct Answer [B]**
    
    # Unified Regex to capture both
    # Group 1: Q Number
    # Group 2: Option (Single letter)
    # Group 3: Option (Inside brackets)
    a_pattern = re.compile(r'\*\*Q(\d+):\s+(?:([A-D])|Correct Answer \[([A-D])\])\*\*')
    a_matches = list(a_pattern.finditer(answers_part))
    
    for i in range(len(a_matches)):
        a_match = a_matches[i]
        q_num = a_match.group(1)
        correct_opt = a_match.group(2) if a_match.group(2) else a_match.group(3)
        
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
                
    
    # Generate Output based on file name or argument
    output_filename = 'src/data/weekly_mock_data_02.ts' if '02' in file_path else 'src/data/weekly_mock_data_01.ts'
    variable_name = 'WEEKLY_MOCK_02_QUESTIONS' if '02' in file_path else 'WEEKLY_MOCK_01_QUESTIONS'
    id_prefix = 'weekly-02' if '02' in file_path else 'weekly-01'

    # Update IDs in questions list
    for q in questions:
        q['id'] = q['id'].replace("weekly-01", id_prefix)

    # Clean up and Format for TS
    ts_output = f"""import {{ Question }} from "./live_mock_data";

export const {variable_name}: Question[] = [
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
    
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(ts_output)

    print(f"Generated {output_filename} with {len(questions)} questions.")

if __name__ == "__main__":
    # parse_mock_test(r"C:\Users\arun1\OneDrive\Desktop\IP 2026\Weekly Mock Test - 01.txt")
    parse_mock_test(r"D:\IP 2026\Weekly Mock Test - 02.txt")
