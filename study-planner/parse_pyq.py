
import json
import re

# Answer Key Mapping (1-125)
ANSWER_KEY = {
    1: 'A', 2: 'A', 3: 'D', 4: 'D', 5: 'A', 6: 'D', 7: 'B', 8: 'C', 9: 'D', 10: 'A',
    11: 'D', 12: 'A', 13: 'B', 14: 'C', 15: 'A', 16: 'A', 17: 'B', 18: 'D', 19: 'C', 20: 'D',
    21: 'B', 22: 'B', 23: 'D', 24: 'C', 25: 'A', 26: 'A', 27: 'D', 28: 'C', 29: 'D', 30: 'D',
    31: 'D', 32: 'D', 33: 'A', 34: 'D', 35: 'B', 36: 'A', 37: 'C', 38: 'B', 39: 'C', 40: 'D',
    41: 'C', 42: 'D', 43: 'D', 44: 'A', 45: 'C', 46: 'B', 47: 'A', 48: 'D', 49: 'C', 50: 'D',
    51: 'B', 52: 'C', 53: 'A', 54: 'D', 55: 'C', 56: 'C', 57: 'A', 58: 'D', 59: 'C', 60: 'A',
    61: 'C', 62: 'A', 63: 'B', 64: 'B', 65: 'A', 66: 'B', 67: 'A', 68: 'B', 69: 'C', 70: 'A',
    71: 'C', 72: 'D', 73: 'C', 74: 'A', 75: 'A', 76: 'C', 77: 'D', 78: 'D', 79: 'B', 80: 'A',
    81: 'B', 82: 'C', 83: 'A', 84: 'D', 85: 'C', 86: 'C', 87: 'A', 88: 'D', 89: 'B', 90: 'D',
    91: 'C', 92: 'D', 93: 'A', 94: 'D', 95: 'B', 96: 'A', 97: 'D', 98: 'D', 99: 'C', 100: 'B',
    101: 'B', 102: 'D', 103: 'C', 104: 'B', 105: 'A', 106: 'C', 107: 'A', 108: 'C', 109: 'B', 110: 'A',
    111: 'B', 112: 'D', 113: 'B', 114: 'A', 115: 'C', 116: 'B', 117: 'A', 118: 'D', 119: 'D', 120: 'A',
    121: 'D', 122: 'A', 123: 'D', 124: 'A', 125: 'C'
}

OPT_MAP = {'A': 0, 'B': 1, 'C': 2, 'D': 3}

def parse_pyq_text():
    with open('pyq_raw.txt', 'r', encoding='utf-8') as f:
        text = f.read()

    # Pre-cleaning
    text = re.sub(r'Page \d+ - \d+', ' ', text)
    
    # Specific fix for repetitive numbers
    text = re.sub(r'11111\.', '1.', text)
    text = re.sub(r'222210\.', '10.', text)
    text = re.sub(r'333321\.', '21.', text)
    text = re.sub(r'444431\.', '31.', text)
    text = re.sub(r'555541\.', '41.', text)
    text = re.sub(r'666651\.', '51.', text)
    text = re.sub(r'777762\.', '62.', text)
    text = re.sub(r'888874\.', '74.', text)
    text = re.sub(r'9999999985\.', '85.', text)
    text = re.sub(r'1010101095\.', '95.', text)
    text = re.sub(r'11111111105\.', '105.', text)
    text = re.sub(r'121212121212121212116\.', '116.', text)
    text = re.sub(r'121212121212121212\.', '', text) 

    text = text.replace('\n', ' ')
    
    # Text Numbering Fixes
    text = text.replace('27. (Printed as 27 in document, likely Q23)', '23.')
    text = text.replace('(Unnumbered/Likely 24).', '24.')
    text = text.replace('58. (Printed as 58 in document)', '56.')
    text = text.replace('57. (Printed as 57 in document)', '57.')
    
    # Remove excessive spaces
    text = re.sub(r'\s+', ' ', text)
    
    # Check for "Section XX" followed by dot which might look like question.
    # We will handle this in scanning.
    
    segments = text.split('(A)')
    
    final_data = []
    
    # Segment 0: Question 1
    seg0_match = re.search(r'(\d+)\.\s+(.*?)$', segments[0])
    if not seg0_match:
        print("Could not find Q1 start")
        return
        
    current_q_text = seg0_match.group(2).strip()
    current_q_num = 1
    
    for i in range(1, len(segments)):
        chunk = segments[i]
        
        # Split options B, C, D
        # Use lookahead or simple regex match?
        # Chunk format: `Option A Text (B) Option B Text (C) Option C Text (D) Tail`
        
        m_opts = re.match(r'(.*?)\(B\)\s+(.*?)\(C\)\s+(.*?)\(D\)\s+(.*)', chunk)
        if not m_opts:
            # Maybe last question has no (D)? No, 125 has (D) implicitly or explicitly.
            # Answer key for 125 is C.
            # If Q125 has A, B, C, D:
            # Chunk for 125: `Option A ... (B) ... (C) ... (D) ... [EOF]`
            # If mismatch, try looser?
            # Q125 text in raw file ends with `(D) One Hundred days`. So it has D.
            print(f"Segment {i} malformed (options split)")
            # Try to recover:
            op_a = chunk
            op_b = ""
            op_c = ""
            tail = ""
        else:
            op_a = m_opts.group(1).strip()
            op_b = m_opts.group(2).strip()
            op_c = m_opts.group(3).strip()
            tail = m_opts.group(4).strip()
            
        next_q_text = ""
        
        if i < len(segments) - 1:
            next_num = current_q_num + 1
            
            # Find next_num in tail
            # Try word boundary first
            split_m = re.search(rf'\b{next_num}\.', tail)
            
            if not split_m:
                 # Try strict search without boundary
                 split_m = re.search(rf'{next_num}\.', tail)
                 # But verify it is not "Section 12."
                 # If `split_m` found, check chars before it.
                 # If needed. But with sequential numbering, "Section 23." is unlikely (Section 23 is PMLA etc).
                 # We'll assume the number `next_num` followed by dot is the question start.
            
            if split_m:
                idx = split_m.start()
                op_d = tail[:idx].strip()
                next_part = tail[idx:]
                nm = re.match(r'(\d+)\.\s*(.*)', next_part, re.DOTALL)
                if nm:
                    next_q_text = nm.group(2).strip()
                    current_q_num = int(nm.group(1))
            else:
                # Still failed?
                print(f"Warning: No start number {next_num} found in tail of Q{current_q_num}")
                op_d = tail
        else:
             op_d = tail
             
        ans_char = ANSWER_KEY.get(i, 'A')
        ans_idx = OPT_MAP.get(ans_char, 0)
        
        # Clean phrases
        clean_text = current_q_text
        for phrase in ["According to the study notes", "Based on study material", "according to this document"]:
             clean_text = re.sub(phrase, "According to regulations", clean_text, flags=re.IGNORECASE)

        q_obj = {
            'q': clean_text,
            'o': [op_a, op_b, op_c, op_d],
            'a': ans_idx,
            'e': f"Correct Answer: {ans_char}"
        }
        final_data.append(q_obj)
        
        current_q_text = next_q_text

    print(f"Parsed {len(final_data)} questions.")
    with open('pyq_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=4)

parse_pyq_text()
