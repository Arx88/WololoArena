import re
import json

# Definición de la matriz por defecto para evitar crasheos
DEFAULT_TECH = {
    "archery": {"arbalester": True, "thumbRing": True, "bracer": True},
    "cavalry": {"paladin": True, "bloodlines": True, "plateBarding": True},
    "infantry": {"champion": True, "halberdier": True, "plateMail": True},
    "siege": {"siegeEngineers": True, "bombardCannon": True, "siegeOnager": True},
    "economy": {"cropRotation": True, "guilds": True, "twoManSaw": True}
}

file_path = "Wololo Arena/lib/data/civilizations.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Buscamos cada objeto de civilización por su id y ratings
# Usamos un patrón que captura todo el bloque
pattern = r'(\{\s+id:\s*"[^"]+",[\s\S]+?)(ratings:\s*\{)'

def inject_matrix(match):
    prefix = match.group(1)
    suffix = match.group(2)
    
    # Si ya tiene techMatrix, no hacemos nada
    if "techMatrix:" in prefix:
        return match.group(0)
        
    # Inyectamos la matriz por defecto antes de ratings
    matrix_str = "    techMatrix: " + json.dumps(DEFAULT_TECH) + ",\n    "
    return prefix + matrix_str + suffix

new_content = re.sub(pattern, inject_matrix, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Matriz tecnológica inyectada en todas las civilizaciones.")
