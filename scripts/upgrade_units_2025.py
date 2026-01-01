import re
import os

file_path = os.path.join(os.getcwd(), "lib/data/unique-units.ts")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_units = [
    {
        "id": "white_feather_guard", "name": "White Feather Guard", "civilization": "Shu", "type": "infantry",
        "armorClasses": ["infantry", "unique_unit"], "image": "/images/units/placeholder_white_feather.png",
        "description": "Archer-support infantry.", "specialAbility": "Slows enemy units on hit",
        "stats": {
            "castle": {"hp": 60, "attack": 10, "meleeArmor": 2, "pierceArmor": 2, "speed": 1.1, "reloadTime": 2.0},
            "imperial": {"hp": 75, "attack": 14, "meleeArmor": 4, "pierceArmor": 4, "speed": 1.1, "reloadTime": 2.0}
        },
        "bonuses": [], "strengths": ["Cavalry", "Archers"], "weaknesses": ["Hand Cannoneers"]
    },
    {
        "id": "tiger_cavalry", "name": "Tiger Cavalry", "civilization": "Wei", "type": "cavalry",
        "armorClasses": ["cavalry", "unique_unit"], "image": "/images/units/placeholder_tiger_cav.png",
        "description": "Shock cavalry.", "specialAbility": "Charge attack (+15 damage)",
        "stats": {
            "castle": {"hp": 120, "attack": 12, "meleeArmor": 2, "pierceArmor": 2, "speed": 1.45, "reloadTime": 1.9},
            "imperial": {"hp": 150, "attack": 15, "meleeArmor": 3, "pierceArmor": 3, "speed": 1.45, "reloadTime": 1.9}
        },
        "bonuses": [], "strengths": ["Archers", "Siege"], "weaknesses": ["Halberdiers"]
    },
    {
        "id": "jian_swordsman", "name": "Jian Swordsman", "civilization": "Wu", "type": "infantry",
        "armorClasses": ["infantry", "unique_unit"], "image": "/images/units/placeholder_jian.png",
        "description": "Berzerk-like infantry.", "specialAbility": "Regenerates HP, faster move speed",
        "stats": {
            "castle": {"hp": 65, "attack": 11, "meleeArmor": 1, "pierceArmor": 3, "speed": 1.2, "reloadTime": 2.0},
            "imperial": {"hp": 80, "attack": 14, "meleeArmor": 2, "pierceArmor": 5, "speed": 1.2, "reloadTime": 2.0}
        },
        "bonuses": [], "strengths": ["Archers", "Skirmishers"], "weaknesses": ["Heavy Cavalry"]
    },
    {
        "id": "iron_pagoda", "name": "Iron Pagoda", "civilization": "Jurchens", "type": "cavalry",
        "armorClasses": ["cavalry", "unique_unit"], "image": "/images/units/placeholder_pagoda.png",
        "description": "Super heavy cavalry.", "specialAbility": "Can block melee attacks completely (chance)",
        "stats": {
            "castle": {"hp": 140, "attack": 14, "meleeArmor": 5, "pierceArmor": 3, "speed": 1.3, "reloadTime": 2.1},
            "imperial": {"hp": 180, "attack": 18, "meleeArmor": 7, "pierceArmor": 5, "speed": 1.3, "reloadTime": 2.1}
        },
        "bonuses": [], "strengths": ["Infantry", "Archers"], "weaknesses": ["Monks", "Halberdiers"]
    },
    {
        "id": "liao_dao", "name": "Liao Dao", "civilization": "Khitans", "type": "infantry",
        "armorClasses": ["infantry", "unique_unit"], "image": "/images/units/placeholder_liao.png",
        "description": "Bleed-damage infantry.", "specialAbility": "Deals damage over time after hit",
        "stats": {
            "castle": {"hp": 60, "attack": 9, "meleeArmor": 1, "pierceArmor": 1, "speed": 1.15, "reloadTime": 2.0},
            "imperial": {"hp": 75, "attack": 12, "meleeArmor": 2, "pierceArmor": 2, "speed": 1.15, "reloadTime": 2.0}
        },
        "bonuses": [], "strengths": ["High HP units"], "weaknesses": ["Archers"]
    }
]

def format_unit(u):
    return f"""
  {{
    id: \"{u['id']}\",
    name: \"{u['name']}\",
    civilization: \"{u['civilization']}\",
    type: \"{u['type']}\",
    armorClasses: {u['armorClasses']},
    image: \"{u['image']}\",
    description: \"{u['description']}\",
    specialAbility: \"{u['specialAbility']}\",
    stats: {{
      castle: {u['stats']['castle']},
      imperial: {u['stats']['imperial']}
    }},
    bonuses: {u['bonuses']},
    strengths: {u['strengths']},
    weaknesses: {u['weaknesses']}
  }},"""

new_units_str = "\n".join([format_unit(u) for u in new_units])

if "white_feather_guard" not in content:
    content = re.sub(r'}}\\s*,\\s*]', '}} ,\n' + new_units_str + '\n]', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated unique-units.ts with Three Kingdoms units.")
