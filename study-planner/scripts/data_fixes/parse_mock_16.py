import re
import sys

def parse_mock_test(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    questions = []
    
    blocks = re.split(r'\n(?=Q\d+\.)', '\n' + content)
    
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        
        q_num_match = re.search(r'Q(\d+)\.', block)
        if not q_num_match:
            print("Failed to find Q number in block:", block[:50])
            continue
            
        q_num = q_num_match.group(1)
        
        answer_match = re.search(r'\nAnswer:\s*([A-D])', block)
        if not answer_match:
            continue
            
        correct_opt = answer_match.group(1).strip()
        correct_idx = {'A': 0, 'B': 1, 'C': 2, 'D': 3}.get(correct_opt, 0)
        
        exp_match = re.search(r'\nExplanation:\s*(.*)', block, re.DOTALL)
        explanation = exp_match.group(1).strip() if exp_match else ""
        
        body_end = block.find('\nA. ')
        if body_end == -1:
            body_end = block.find('\nA) ')
            
        body_start = block.find(' ') + 1
        q_text = block[body_start:body_end].replace('\n', ' ').strip()
        
        # Remove Topic and Difficulty from question text
        q_text = re.sub(r'^\(.*?\)\s*\[Difficulty:\s*.*?\]\s*', '', q_text)
        
        opts_block = block[body_end:answer_match.start()].strip()
        options = []
        for line in opts_block.split('\n'):
            line = line.strip()
            if line.startswith('A.') or line.startswith('B.') or line.startswith('C.') or line.startswith('D.'):
                options.append(line[3:].strip())
            elif line.startswith('A)') or line.startswith('B)') or line.startswith('C)') or line.startswith('D)'):
                options.append(line[3:].strip())
                
        questions.append({
            'id': f"weekly-16-{q_num}",
            'text': q_text,
            'options': options,
            'correctAnswer': correct_idx,
            'explanation': explanation
        })

    ts_output = f"""import {{ Question }} from "./live_mock_data";

export const WEEKLY_MOCK_16_QUESTIONS: Question[] = [
"""
    
    for q in questions:
        text_safe = q['text'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        exp_safe = q['explanation'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        opts_str = ", ".join([f'"{opt.replace("\\\\", "\\\\\\\\").replace("\"", "\\\"")}"' for opt in q['options']])
        
        ts_output += f"""    {{
        id: "{q['id']}",
        text: "{text_safe}",
        options: [{opts_str}],
        correctAnswer: {q['correctAnswer']},
        explanation: "{exp_safe}"
    }},
"""
    ts_output += "];\n"
    
    output_filename = "src/data/weekly_mock_data_16.ts"
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(ts_output)

    print(f"Generated {output_filename} with {len(questions)} questions.")

parse_mock_test(r"D:\IP 2026\LDCE IP Mock Test - 16.txt")
