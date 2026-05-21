
import json
import datetime
import re
import os

def generate_schedule():
    file_path = r"c:\Users\arun1\OneDrive\Desktop\IP 2026\study-planner\src\app\planner\page.tsx"
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the original array content to parse it
    # We use regex to find the start and end of the array
    match = re.search(r'const FULL_SCHEDULE = \[\s*(.*?)\s*\];', content, re.DOTALL)
    if not match:
        print("Could not find FULL_SCHEDULE array")
        return

    raw_items_str = match.group(1)
    
    # Parse items manually with regex
    item_pattern = re.compile(r'{\s*date:\s*"(.*?)",\s*day:\s*"(.*?)",\s*paper:\s*"(.*?)",\s*topic:\s*"(.*?)",\s*subTopic:\s*"(.*?)",\s*duration:\s*"(.*?)"\s*}')
    
    items = []
    for m in item_pattern.finditer(raw_items_str):
        items.append({
            "date": m.group(1),
            "day": m.group(2),
            "paper": m.group(3),
            "topic": m.group(4),
            "subTopic": m.group(5),
            "duration": m.group(6)
        })

    # Step 1: Extract tasks (non-revision) and insert new day
    tasks = []
    target_topic = "PO Rules 2024 & PO Regulations 2024"
    processed_target = False
    
    for item in items:
        # Skip existing revisions/Sundays
        # Note: We must be careful not to skip "End" or special items if they are not strictly Sunday revisions
        # But looking at data, Sunday items are paper:"Revision".
        # We also need to keep the "End" item essentially as a task but it needs date recalculation too?
        # Yes, line 142 is "End". It should shift.
        if item['paper'] == 'Revision':
            continue
            
        if item['subTopic'] == target_topic:
            if not processed_target:
                # Add 3 days
                for d in range(1, 4):
                    tasks.append({
                        "paper": item['paper'],
                        "topic": item['topic'],
                        "subTopic": item['subTopic'],
                        "duration": f"Day {d} of 3"
                    })
                processed_target = True
            # Skip the original lines
        else:
            tasks.append({
                "paper": item['paper'],
                "topic": item['topic'],
                "subTopic": item['subTopic'],
                "duration": item['duration']
            })

    # Step 2: Regenerate dates
    current_date = datetime.date(2026, 1, 14) # Start date
    new_schedule_lines = []
    
    task_idx = 0
    while task_idx < len(tasks):
        day_str = current_date.strftime("%A")
        date_str = current_date.strftime("%d-%m-%Y")
        
        if day_str == "Sunday":
            # Add Revision
            new_schedule_lines.append(f'    {{ date: "{date_str}", day: "{day_str}", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" }},')
        else:
            t = tasks[task_idx]
            new_schedule_lines.append(f'    {{ date: "{date_str}", day: "{day_str}", paper: "{t["paper"]}", topic: "{t["topic"]}", subTopic: "{t["subTopic"]}", duration: "{t["duration"]}" }},')
            task_idx += 1
            
        current_date += datetime.timedelta(days=1)


    # Join lines
    new_array_content = "\n" + "\n".join(new_schedule_lines) + "\n"
    
    # Replace in file
    new_file_content = content[:match.start(1)] + new_array_content + content[match.end(1):]
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_file_content)

    print("Successfully updated planner/page.tsx")

if __name__ == "__main__":
    generate_schedule()
