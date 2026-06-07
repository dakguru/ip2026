"""One-off generator: build src/data/flashcards/currentAffairs/apr2026.ts
from DakGuru_CurrentAffairs_April2026_400_Flashcards.docx.

Each card is a 2x2 table: [Q#, question, "A", answer+notes].
The answer cell blends a concise answer with short notes; we split the
first sentence as `answer` and keep the remainder as `explanation`,
mirroring the mar2026.ts shape.
"""
import re
import json
import docx

DOCX = r"../../Current Affairs/DakGuru_CurrentAffairs_April2026_400_Flashcards.docx"
OUT = r"../src/data/flashcards/currentAffairs/apr2026.ts"

# 8 categories, 50 cards each, in document order.
CATS = [
    ("apr2026MostImportant", "Apr 2026 - Most Important", "Most Important", "High",
     "APRIL 2026 – MOST IMPORTANT CURRENT AFFAIRS"),
    ("apr2026Banking", "Apr 2026 - Banking & Finance", "Banking & Finance", "Medium",
     "APRIL 2026 – BANKING, ECONOMY, BUSINESS & FINANCE"),
    ("apr2026GovtSchemes", "Apr 2026 - Govt Schemes", "Govt Schemes", "Medium",
     "APRIL 2026 – GOVERNMENT SCHEMES"),
    ("apr2026NationalNews", "Apr 2026 - National News", "National News", "Medium",
     "APRIL 2026 – NATIONAL NEWS"),
    ("apr2026Sports", "Apr 2026 - Sports", "Sports", "Medium",
     "APRIL 2026 – SPORTS"),
    ("apr2026MoU", "Apr 2026 - MoUs & Agreements", "MoUs & Agreements", "Medium",
     "APRIL 2026 – MoU's & AGREEMENTS"),
    ("apr2026International", "Apr 2026 - International Affairs", "International", "Medium",
     "APRIL 2026 – INTERNATIONAL AFFAIRS"),
    ("apr2026ScienceTech", "Apr 2026 - Science & Tech", "Science & Tech", "Medium",
     "APRIL 2026 – SCIENCE AND TECHNOLOGY"),
]

STOP = {
    "The", "This", "That", "These", "Those", "It", "Its", "A", "An", "In", "On",
    "At", "Of", "For", "And", "Or", "To", "With", "By", "From", "As", "Is",
    "Was", "Were", "Are", "He", "She", "They", "Who", "What", "When", "Where",
    "Which", "India", "Indian",
}


def split_answer(text):
    """Return (answer, explanation). First sentence -> answer, rest -> explanation."""
    text = re.sub(r"\s+", " ", text).strip()
    # Find a sentence boundary: period/?/! followed by space + capital/quote/number,
    # but not a decimal (digit . digit) and not a single-letter abbreviation.
    for m in re.finditer(r"([.?!])\s+(?=[\"‘’A-Z0-9₹])", text):
        i = m.start()
        # skip decimals like 1.6
        if text[i] == "." and i > 0 and text[i - 1].isdigit() and i + 1 < len(text) and text[i + 1].isdigit():
            continue
        # skip single uppercase-letter abbreviations (e.g. "U.S")
        if i >= 1 and text[i - 1].isupper() and (i < 2 or not text[i - 2].isalpha()):
            continue
        ans = text[: i + 1].strip()
        rest = text[i + 1:].strip()
        # avoid tiny fragments as the answer
        if len(ans) < 12:
            continue
        return ans, rest
    return text, ""


def extract_keywords(question, answer):
    """Grab up to 3 distinct multi-word/proper-noun phrases for search."""
    src = answer + " " + question
    phrases = re.findall(r"\b([A-Z][\w&'\-]*(?:\s+[A-Z][\w&'\-]*){0,3})", src)
    out = []
    for p in phrases:
        p = p.strip(" .,'")
        if len(p) < 3:
            continue
        if p in STOP and " " not in p:
            continue
        if p not in out:
            out.append(p)
        if len(out) >= 3:
            break
    if not out:
        out = ["April 2026"]
    return out


def js(s):
    return json.dumps(s, ensure_ascii=False)


def main():
    d = docx.Document(DOCX)
    tables = d.tables
    assert len(tables) == 400, len(tables)

    lines = ['import { FlashCard } from "../../../types";', ""]
    for ci, (var, pdf_title, topic, weight, banner) in enumerate(CATS):
        block = tables[ci * 50:(ci + 1) * 50]
        lines.append("// " + "─" * 77)
        lines.append("// " + banner)
        lines.append("// " + "─" * 77)
        lines.append(f"export const {var}: FlashCard[] = [")
        for idx, t in enumerate(block, start=1):
            cells = [c.text.strip() for r in t.rows for c in r.cells]
            question = re.sub(r"\s+", " ", cells[1]).strip()
            answer, explanation = split_answer(cells[3])
            kws = extract_keywords(question, answer)
            obj = (
                f'    {{ pdf_title: {js(pdf_title)}, topic: {js(topic)}, '
                f'card_no: {idx}, question: {js(question)}, answer: {js(answer)}, '
                f'explanation: {js(explanation)}, exam_weight: {js(weight)}, '
                f'keywords: {js(kws)} }},'
            )
            lines.append(obj)
        lines.append("];")
        lines.append("")

    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines))
    print("wrote", OUT)


if __name__ == "__main__":
    main()
