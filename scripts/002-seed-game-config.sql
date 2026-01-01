-- Insertar datos iniciales de civilizaciones
INSERT INTO civilizations (id, name, expansion, specialty, icon) VALUES
('aztecs', 'Aztecs', 'conquerors', 'Infantry & Monks', '/aztec-warrior-shield-icon.jpg'),
('berbers', 'Berbers', 'african', 'Cavalry & Navy', '/berber-camel-cavalry-icon.jpg'),
('bohemians', 'Bohemians', 'dlc', 'Monks & Gunpowder', '/bohemian-medieval-crest-icon.jpg'),
('britons', 'Britons', 'base', 'Archers', '/british-longbow-archer-icon.jpg'),
('bulgarians', 'Bulgarians', 'dlc', 'Infantry & Cavalry', '/bulgarian-medieval-knight-icon.jpg'),
('burgundians', 'Burgundians', 'dlc', 'Cavalry', '/burgundian-knight-heraldry-icon.jpg'),
('burmese', 'Burmese', 'rajas', 'Monks & Elephants', '/burmese-elephant-warrior-icon.jpg'),
('byzantines', 'Byzantines', 'base', 'Defense', '/byzantine-empire-eagle-icon.jpg'),
('celts', 'Celts', 'base', 'Infantry & Siege', '/celtic-warrior-knot-icon.jpg'),
('chinese', 'Chinese', 'base', 'Archers', '/chinese-dragon-warrior-icon.jpg'),
('cumans', 'Cumans', 'dlc', 'Cavalry', '/cuman-horse-archer-icon.jpg'),
('dravidians', 'Dravidians', 'dynasties', 'Infantry & Navy', '/dravidian-temple-warrior-icon.jpg'),
('ethiopians', 'Ethiopians', 'african', 'Archers & Siege', '/ethiopian-shotel-warrior-icon.jpg'),
('franks', 'Franks', 'base', 'Cavalry', '/frankish-knight-fleur-de-lis-icon.jpg'),
('goths', 'Goths', 'base', 'Infantry', '/goth-barbarian-warrior-icon.jpg'),
('gurjaras', 'Gurjaras', 'dynasties', 'Cavalry & Camels', '/placeholder.svg?height=64&width=64'),
('hindustanis', 'Hindustanis', 'dynasties', 'Gunpowder & Camels', '/placeholder.svg?height=64&width=64'),
('huns', 'Huns', 'conquerors', 'Cavalry', '/placeholder.svg?height=64&width=64'),
('incas', 'Incas', 'forgotten', 'Infantry', '/placeholder.svg?height=64&width=64'),
('italians', 'Italians', 'forgotten', 'Archers & Navy', '/placeholder.svg?height=64&width=64'),
('japanese', 'Japanese', 'base', 'Infantry', '/placeholder.svg?height=64&width=64'),
('khmer', 'Khmer', 'khmer', 'Elephants & Siege', '/placeholder.svg?height=64&width=64'),
('koreans', 'Koreans', 'conquerors', 'Towers & Navy', '/placeholder.svg?height=64&width=64'),
('lithuanians', 'Lithuanians', 'dlc', 'Cavalry & Monks', '/placeholder.svg?height=64&width=64'),
('magyars', 'Magyars', 'forgotten', 'Cavalry', '/placeholder.svg?height=64&width=64'),
('malay', 'Malay', 'rajas', 'Navy & Elephants', '/placeholder.svg?height=64&width=64'),
('malians', 'Malians', 'african', 'Infantry', '/placeholder.svg?height=64&width=64'),
('mayans', 'Mayans', 'conquerors', 'Archers', '/placeholder.svg?height=64&width=64'),
('mongols', 'Mongols', 'base', 'Cavalry Archers', '/placeholder.svg?height=64&width=64'),
('persians', 'Persians', 'base', 'Cavalry', '/placeholder.svg?height=64&width=64'),
('poles', 'Poles', 'dlc', 'Cavalry', '/placeholder.svg?height=64&width=64'),
('portuguese', 'Portuguese', 'african', 'Navy & Gunpowder', '/placeholder.svg?height=64&width=64'),
('romans', 'Romans', 'dlc', 'Infantry', '/placeholder.svg?height=64&width=64'),
('saracens', 'Saracens', 'base', 'Camels & Navy', '/placeholder.svg?height=64&width=64'),
('sicilians', 'Sicilians', 'dlc', 'Cavalry', '/placeholder.svg?height=64&width=64'),
('slavs', 'Slavs', 'forgotten', 'Infantry & Siege', '/placeholder.svg?height=64&width=64'),
('spanish', 'Spanish', 'conquerors', 'Gunpowder & Monks', '/placeholder.svg?height=64&width=64'),
('tatars', 'Tatars', 'dlc', 'Cavalry Archers', '/placeholder.svg?height=64&width=64'),
('teutons', 'Teutons', 'base', 'Infantry', '/placeholder.svg?height=64&width=64'),
('turks', 'Turks', 'base', 'Gunpowder', '/placeholder.svg?height=64&width=64'),
('vietnamese', 'Vietnamese', 'rajas', 'Archers', '/placeholder.svg?height=64&width=64'),
('vikings', 'Vikings', 'base', 'Infantry & Navy', '/placeholder.svg?height=64&width=64')
ON CONFLICT (id) DO NOTHING;

-- Insertar datos iniciales de mapas
INSERT INTO maps (id, name, category, description, image) VALUES
('arabia', 'Arabia', 'land', 'Open land map with scattered resources', '/placeholder.svg?height=120&width=200'),
('arena', 'Arena', 'land', 'Walled starting positions', '/placeholder.svg?height=120&width=200'),
('black_forest', 'Black Forest', 'land', 'Dense forest with chokepoints', '/placeholder.svg?height=120&width=200'),
('islands', 'Islands', 'water', 'Separated islands requiring navy', '/placeholder.svg?height=120&width=200'),
('nomad', 'Nomad', 'special', 'No starting town center', '/placeholder.svg?height=120&width=200'),
('team_islands', 'Team Islands', 'water', 'Team-based island warfare', '/placeholder.svg?height=120&width=200'),
('gold_rush', 'Gold Rush', 'land', 'Central gold deposit', '/placeholder.svg?height=120&width=200'),
('hideout', 'Hideout', 'land', 'Forest hideouts with openings', '/placeholder.svg?height=120&width=200'),
('four_lakes', 'Four Lakes', 'hybrid', 'Four lakes in corners', '/placeholder.svg?height=120&width=200'),
('megarandom', 'MegaRandom', 'special', 'Completely random generation', '/placeholder.svg?height=120&width=200'),
('runestones', 'Runestones', 'land', 'Viking-themed with stone relics', '/placeholder.svg?height=120&width=200'),
('socotra', 'Socotra', 'land', 'Aggressive close-quarters map', '/placeholder.svg?height=120&width=200'),
('african_clearing', 'African Clearing', 'land', 'Savanna with clearings', '/placeholder.svg?height=120&width=200'),
('baltic', 'Baltic', 'hybrid', 'Central sea with land bridges', '/placeholder.svg?height=120&width=200'),
('continental', 'Continental', 'hybrid', 'Large landmass with coastal waters', '/placeholder.svg?height=120&width=200')
ON CONFLICT (id) DO NOTHING;

-- Insertar datos iniciales de modos de juego
INSERT INTO game_modes (id, name, description, icon) VALUES
('random_map', 'Random Map', 'Standard game mode starting from Dark Age', '/placeholder.svg?height=48&width=48'),
('empire_wars', 'Empire Wars', 'Start in Feudal Age with pre-built economy', '/placeholder.svg?height=48&width=48'),
('death_match', 'Death Match', 'Maximum resources from the start', '/placeholder.svg?height=48&width=48'),
('regicide', 'Regicide', 'Protect your King to survive', '/placeholder.svg?height=48&width=48'),
('king_of_the_hill', 'King of the Hill', 'Control the monument to win', '/placeholder.svg?height=48&width=48'),
('wonder_race', 'Wonder Race', 'First to build a Wonder wins', '/placeholder.svg?height=48&width=48')
ON CONFLICT (id) DO NOTHING;
