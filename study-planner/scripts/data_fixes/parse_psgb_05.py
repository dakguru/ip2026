import re

def parse_psgb_test(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    questions = []
    # Split by Q1., Q2., etc.
    blocks = re.split(r'\n(?=Q\d+\.)', '\n' + content)
    
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        
        q_num_match = re.search(r'Q(\d+)\.', block)
        if not q_num_match:
            continue
            
        q_num = q_num_match.group(1)
        
        # Extract answer
        answer_match = re.search(r'\nAnswer:\s*([A-D])', block)
        if not answer_match:
            # Maybe it's "Correct Answer: A"
            answer_match = re.search(r'\nCorrect Answer:\s*([A-D])', block)
            if not answer_match:
                print(f"Failed to find Answer for Q{q_num}")
                continue
            
        correct_opt = answer_match.group(1).strip()
        correct_idx = {'A': 0, 'B': 1, 'C': 2, 'D': 3}.get(correct_opt, 0)
        
        exp_match = re.search(r'\nExplanation:\s*(.*)', block, re.DOTALL)
        explanation = exp_match.group(1).strip() if exp_match else ""
        
        body_end = block.find('\nA. ')
        if body_end == -1:
            body_end = block.find('\nA) ')
            
        # The body starts after the first line (which contains the Q number and the tags)
        body_start = block.find('\n') + 1
        q_text = block[body_start:body_end].replace('\n', ' ').strip()
        
        # In case the tags are not in the first line but part of the text
        first_line = block[:body_start].strip()
        q_text = re.sub(r'^\(.*?\)\s*\[Difficulty:\s*.*?\]\s*', '', q_text)
        
        opts_block = block[body_end:answer_match.start()].strip()
        options = []
        for line in opts_block.split('\n'):
            line = line.strip()
            if re.match(r'^[A-D]\.\s', line):
                options.append(line[3:].strip())
            elif re.match(r'^[A-D]\)\s', line):
                options.append(line[3:].strip())
                
        if len(options) > 4:
            options = options[:4]
                
        questions.append({
            'id': f"psgb-05-q{q_num}",
            'text': q_text,
            'options': options,
            'correctAnswer': correct_idx,
            'explanation': explanation
        })

    ts_output = f"""import {{ Question }} from "./live_mock_data";

export const PSGB_MOCK_05_QUESTIONS: Question[] = [
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
    
    output_filename = "src/data/psgb_mock_data_05.ts"
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(ts_output)

    print(f"Generated {output_filename} with {len(questions)} questions.")

parse_psgb_test(r"D:\IP 2026\PS Gr B - Weekly Mock Test Series\PS Gr B - Weekly Mock Test 05.txt")
