import re
import os

file_path = os.path.join(os.getcwd(), "lib/data/civilizations.ts")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove the misplaced ratings inside the bonuses array
# Pattern: description: "..." ratings: { ... },
# We replace it with just description: "..."
fixed_content = re.sub(r'(description: "[^"]+")\s+ratings: \{[^}]+\},', r'\1', content)

# 2. Fix the extra braces/lines caused by the previous bad replacement
fixed_content = re.sub(r'\},\s+\},', '},', fixed_content)

# 3. Apply the REAL ratings correctly to the root level
REAL_RATINGS = {
    "armenians": {"economy": 6, "rush": 7, "lateGame": 7, "defense": 7, "mobility": 5},
    "aztecs": {"economy": 8, "rush": 9, "lateGame": 6, "defense": 6, "mobility": 6},
    "bengalis": {"economy": 8, "rush": 4, "lateGame": 8, "defense": 7, "mobility": 5},
    "berbers": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 5, "mobility": 10},
    "bohemians": {"economy": 7, "rush": 5, "lateGame": 9, "defense": 8, "mobility": 4},
    "britons": {"economy": 7, "rush": 7, "lateGame": 9, "defense": 8, "mobility": 5},
    "bulgarians": {"economy": 6, "rush": 8, "lateGame": 8, "defense": 7, "mobility": 7},
    "burgundians": {"economy": 10, "rush": 6, "lateGame": 8, "defense": 6, "mobility": 7},
    "burmese": {"economy": 7, "rush": 7, "lateGame": 7, "defense": 6, "mobility": 6},
    "byzantines": {"economy": 7, "rush": 5, "lateGame": 9, "defense": 10, "mobility": 6},
    "celts": {"economy": 8, "rush": 7, "lateGame": 8, "defense": 6, "mobility": 7},
    "chinese": {"economy": 9, "rush": 7, "lateGame": 8, "defense": 8, "mobility": 6},
    "cumans": {"economy": 9, "rush": 8, "lateGame": 7, "defense": 5, "mobility": 9},
    "dravidians": {"economy": 7, "rush": 6, "lateGame": 8, "defense": 7, "mobility": 5},
    "ethiopians": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 5, "mobility": 6},
    "franks": {"economy": 8, "rush": 9, "lateGame": 8, "defense": 6, "mobility": 9},
    "georgians": {"economy": 7, "rush": 6, "lateGame": 8, "defense": 8, "mobility": 7},
    "goths": {"economy": 6, "rush": 7, "lateGame": 10, "defense": 4, "mobility": 6},
    "gurjaras": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 6, "mobility": 9},
    "hindustanis": {"economy": 9, "rush": 7, "lateGame": 9, "defense": 6, "mobility": 8},
    "huns": {"economy": 7, "rush": 9, "lateGame": 8, "defense": 4, "mobility": 10},
    "incas": {"economy": 8, "rush": 8, "lateGame": 8, "defense": 8, "mobility": 6},
    "italians": {"economy": 8, "rush": 6, "lateGame": 8, "defense": 7, "mobility": 6},
    "japanese": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 8, "mobility": 6},
    "khmer": {"economy": 9, "rush": 6, "lateGame": 9, "defense": 6, "mobility": 7},
    "koreans": {"economy": 7, "rush": 5, "lateGame": 8, "defense": 10, "mobility": 5},
    "lithuanians": {"economy": 8, "rush": 9, "lateGame": 8, "defense": 6, "mobility": 8},
    "magyars": {"economy": 5, "rush": 9, "lateGame": 9, "defense": 5, "mobility": 10},
    "malay": {"economy": 8, "rush": 7, "lateGame": 8, "defense": 6, "mobility": 6},
    "malians": {"economy": 8, "rush": 8, "lateGame": 7, "defense": 7, "mobility": 7},
    "mayans": {"economy": 9, "rush": 8, "lateGame": 8, "defense": 8, "mobility": 7},
    "mongols": {"economy": 7, "rush": 10, "lateGame": 10, "defense": 5, "mobility": 10},
    "persians": {"economy": 9, "rush": 7, "lateGame": 9, "defense": 7, "mobility": 8},
    "poles": {"economy": 10, "rush": 7, "lateGame": 8, "defense": 6, "mobility": 8},
    "portuguese": {"economy": 8, "rush": 6, "lateGame": 10, "defense": 8, "mobility": 6},
    "romans": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 8, "mobility": 6},
    "saracens": {"economy": 7, "rush": 7, "lateGame": 9, "defense": 6, "mobility": 7},
    "sicilians": {"economy": 8, "rush": 7, "lateGame": 8, "defense": 8, "mobility": 7},
    "slavs": {"economy": 8, "rush": 7, "lateGame": 8, "defense": 7, "mobility": 6},
    "spanish": {"economy": 7, "rush": 7, "lateGame": 9, "defense": 8, "mobility": 8},
    "tatars": {"economy": 7, "rush": 7, "lateGame": 9, "defense": 6, "mobility": 9},
    "teutons": {"economy": 8, "rush": 6, "lateGame": 9, "defense": 9, "mobility": 5},
    "turks": {"economy": 7, "rush": 7, "lateGame": 10, "defense": 7, "mobility": 7},
    "vietnamese": {"economy": 8, "rush": 7, "lateGame": 8, "defense": 8, "mobility": 6},
    "vikings": {"economy": 9, "rush": 7, "lateGame": 7, "defense": 6, "mobility": 6},
    "shu": {"economy": 8, "rush": 7, "lateGame": 9, "defense": 6, "mobility": 5},
    "wei": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 6, "mobility": 9},
    "wu": {"economy": 7, "rush": 7, "lateGame": 8, "defense": 7, "mobility": 6},
    "jurchens": {"economy": 8, "rush": 8, "lateGame": 9, "defense": 6, "mobility": 8},
    "khitans": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 7, "mobility": 8},
}

def apply_ratings(match):
    block = match.group(0)
    id_match = re.search(r'id: "([^"]+)"', block)
    if not id_match: return block
    civ_id = id_match.group(1)
    
    ratings = REAL_RATINGS.get(civ_id, {"economy": 5, "rush": 5, "lateGame": 5, "defense": 5, "mobility": 5})
    new_ratings_str = f"ratings: {{ economy: {ratings['economy']}, rush: {ratings['rush']}, lateGame: {ratings['lateGame']}, defense: {ratings['defense']}, mobility: {ratings['mobility']} }},"
    
    # Replace existing root level ratings
    if "ratings:" in block:
        return re.sub(r'ratings: \{[^}]+\}\??', new_ratings_str, block)
    else:
        # Append before last brace
        last_brace = block.rfind("}")
        return block[:last_brace] + "    " + new_ratings_str + "\n  " + block[last_brace:]

# Match civilization blocks
final_content = re.sub(r'  \{[\s\S]*?\},?', apply_ratings, fixed_content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(final_content)

print("Fixed all data corruption and applied real ratings correctly.")
