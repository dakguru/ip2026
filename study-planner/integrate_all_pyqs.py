
import json

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def clean_text(text):
    # Remove "study material" phrases if any
    phrases = ["study material", "study notes", "source 1", "source 2", "according to the document", 
               "as per the provided text", "based on the input"]
    
    # Case insensitive replacement not easy with simple replace, but let's try basic ones
    # Actually, the user already asked to remove these.
    # The PYQ parsers pull from raw text which doesn't have these phrases usually, 
    # but the generic "clean_quizzes.py" was for generated content. 
    # PYQ is from raw text, so likely clean.
    # But I will just ensure newlines are escaped in JSON dump.
    return text

def chunk_data(data, chunk_size=25):
    return [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]

def generate_ts(sets_data):
    ts_output = []
    for set_id, questions in sets_data.items():
        ts_output.append(f"  {set_id}: [")
        for q in questions:
            # Escape quotes in strings
            q_text = json.dumps(q['q']).replace('"', '\\"') # But wait, json.dumps adds quotes.
            # We want the string content.
            # json.dumps("foo") -> "\"foo\""
            # We want to embed this in `q: "..."`
            # So we strip distinct quotes
            
            # Better way: construct the python dict and dump it, then format it to TS object style?
            # Or just use json.dumps for the whole object and relax.
            # But TS keys shouldn't be quoted for style consistency? keys: q, o, a, e.
            # Existing style: { q: "...", o: ["..."], a: 0, e: "..." },
            
            q_json = json.dumps(q['q'])
            o_json = json.dumps(q['o'])
            a_idx = q['a']
            e_json = json.dumps(q['e'])
            
            ts_output.append(f"    {{ q: {q_json}, o: {o_json}, a: {a_idx}, e: {e_json} }},")
        ts_output.append("  ],")
    return "\n".join(ts_output)

def main():
    p1_data = load_json('pyq_data.json')
    p3_data = load_json('pyq_2025_p3_data.json')
    
    # Paper I Sets (Start 22)
    p1_chunks = chunk_data(p1_data, 25)
    sets_map = {}
    current_id = 22
    p1_ids = []
    
    for chunk in p1_chunks:
        sets_map[current_id] = chunk
        p1_ids.append(current_id)
        current_id += 1
        
    # Paper III Sets (Continue ID)
    p3_chunks = chunk_data(p3_data, 25)
    p3_ids = []
    
    for chunk in p3_chunks:
        sets_map[current_id] = chunk
        p3_ids.append(current_id)
        current_id += 1
        
    # Generate Code for ALL_SETS_DATA
    print("// --- LDCE IP 2025 PYQ SETS (Paper I & III) ---")
    print(generate_ts(sets_map))
    
    print("\n\n// TOPIC CONFIGURATION")
    print(f"Paper I Set IDs: {p1_ids}")
    print(f"Paper III Set IDs: {p3_ids}")

if __name__ == "__main__":
    main()
