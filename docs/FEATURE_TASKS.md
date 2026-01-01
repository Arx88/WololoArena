# Wololo Arena - Feature Tasks Tracker

## Estado de Features

### 1. SISTEMA DE HYPE EN TORNEOS ✅ COMPLETADO
- [x] Crear tabla `tournament_hype` en la base de datos
- [x] Crear componente `HypeButton` para dar hype
- [x] Crear componente `MostHypedSection` para landing
- [x] Integrar hype en tarjetas de torneos (página de torneos)
- [x] Integrar hype en detalle de torneo
- [x] Agregar traducciones para hype
- [x] Soporte para modo demo (localStorage)

---

### 2. SISTEMA DE NOTIFICACIONES EN TIEMPO REAL ✅ COMPLETADO
**Estado:** ✅ COMPLETADO
- [x] Hook `useDraftNotifications` para manejar notificaciones
- [x] Notificaciones push/browser cuando es tu turno
- [x] Sonido de alerta
- [x] Vibración en móvil
- [x] Componente `NotificationSettings` para configurar preferencias
- [x] Integración en DraftHeader
- [x] Traducciones en/es
- [ ] Notificaciones por Discord/Telegram (webhook) - PENDIENTE PARA FUTURO

---

### 3. CHAT EN VIVO DURANTE DRAFT ✅ COMPLETADO
**Estado:** ✅ COMPLETADO
- [x] Crear tabla `draft_messages` en la base de datos
- [x] Hook `useDraftChat` para mensajes en tiempo real
- [x] Componente `DraftChat` flotante con UI atractiva
- [x] Emojis/reacciones rápidas (8 emojis predefinidos)
- [x] Contador de mensajes no leídos
- [x] Minimizar/maximizar chat
- [x] Soporte para modo demo con respuestas simuladas
- [x] Traducciones en/es
- [x] Integración en DraftInterface
- [x] Permisos RLS: Solo participantes del draft y admins pueden chatear
- [x] Modo espectador: solo lectura para no-participantes
- [x] Fix: Optimistic updates y scroll automático mejorado
- [ ] Chat de lobby antes de empezar - PENDIENTE PARA FUTURO

---

### 4. MODO ESPECTADOR MEJORADO ✅ COMPLETADO
**Estado:** ✅ COMPLETADO
- [x] Predicciones: "¿Qué civilización elegirá?"
- [x] Hook `useSpectatorPredictions` para predicciones
- [x] Componente `SpectatorPanel` con tabs interactivos
- [x] Hook `useCivStats` para estadísticas de win rate
- [x] Ver estadísticas en tiempo real (win rates, popularidad)
- [x] Tabla SQL para predicciones y votos
- [ ] Votar picks favoritos (disponible post-draft) - PENDIENTE PARA FUTURO
- [ ] Overlay para streamers - PENDIENTE PARA FUTURO

---

### 5. HISTORIAL Y REPLAY DE DRAFTS ✅ COMPLETADO
**Estado:** ✅ COMPLETADO
- [x] Ver cualquier draft anterior jugada por jugada
- [x] Página `/draft/history` con lista de drafts
- [x] Página `/draft/replay/[code]` para replay interactivo
- [x] Controles de playback (play/pause, step, velocidad)
- [x] Compartir link del draft
- [x] Estadísticas: civs más baneadas/pickeadas
- [x] SQL para draft_actions y share_code
- [x] Soporte para modo demo
- [ ] Exportar imagen del resultado final - PENDIENTE PARA FUTURO

---

### 6. SISTEMA DE DRAFT ASISTIDO ✅ COMPLETADO
**Estado:** ✅ COMPLETADO
- [x] Base de datos de meta (CIV_MAP_META)
- [x] Sistema de tiers (S, A, B, C, D) por mapa
- [x] Datos de win rates por civ/mapa
- [x] Sistema de matchups (CIV_MATCHUPS)
- [x] Counter-picks recomendados
- [x] Función `getDraftSuggestions` para sugerencias inteligentes
- [x] Componente `DraftAssistPanel` con UI interactiva
- [x] Tooltips con información detallada
- [x] Integración en DraftInterface
- [ ] Estadísticas de win rate en tiempo real desde DB - PENDIENTE PARA FUTURO
- [ ] "Estas civilizaciones van bien en X mapa" - INCLUIDO
- [ ] Alertas: "¡Cuidado! Tu oponente es fuerte con X" - INCLUIDO

---

### 7. BUILD ORDERS INTEGRADOS ⭐⭐⭐⭐
**Estado:** ⬜ PENDIENTE
- [ ] Después del draft, mostrar build orders recomendadas
- [ ] Videos de tutorial de la civilización elegida
- [ ] Tips específicos para el matchup
- [ ] "Británicos vs Franks en Arabia: Guía rápida"

---

### 8. ESTADÍSTICAS AVANZADAS ⭐⭐⭐⭐
**Estado:** ⬜ PENDIENTE
- [ ] Win rate de cada civilización por mapa
- [ ] Civilizaciones más baneadas
- [ ] Picks más populares
- [ ] Tu tasa de victoria con cada civ
- [ ] Heatmaps de picks en el meta actual
- [ ] Gráficas de tendencias

---

### 9. SISTEMA DE AMIGOS Y EQUIPOS ⭐⭐⭐⭐
**Estado:** ⬜ PENDIENTE
- [ ] Lista de amigos
- [ ] Invitaciones directas a draft
- [ ] Equipos con nombre y logo
- [ ] Chat de equipo
- [ ] Estadísticas de equipo

---

### 10. PERFILES PÚBLICOS MEJORADOS ⭐⭐⭐
**Estado:** ⬜ PENDIENTE
- [ ] Biografía personalizable
- [ ] Links a Twitch/YouTube
- [ ] Estadísticas más detalladas
- [ ] Gráficos de progreso
- [ ] Achievements/logros
- [ ] Civilización "main"
- [ ] Racha de victorias actual

---

### 11. ONBOARDING PARA NUEVOS USUARIOS
**Estado:** ⬜ PENDIENTE
- [ ] Tour guiado al primer uso
- [ ] Tutorial interactivo obligatorio
- [ ] Videos explicativos
- [ ] FAQ integrada
- [ ] Tooltips contextuales

---

### 12. PANEL DE ADMINISTRACIÓN DE TORNEOS
**Estado:** ⬜ PENDIENTE
- [ ] Dashboard con vista general
- [ ] Check-in de participantes
- [ ] Reporte de resultados manual
- [ ] Descalificación de jugadores
- [ ] Reprogramación de partidas
- [ ] Generación automática de brackets
- [ ] Exportar resultados a PDF/CSV

---

### 13. SISTEMA DE CHECK-IN
**Estado:** ⬜ PENDIENTE
- [ ] Check-in obligatorio 15 mins antes
- [ ] Confirmación de asistencia
- [ ] Penalizaciones por no-show
- [ ] Sistema de reemplazos

---

## Leyenda
- ✅ Completado
- 🔄 En Progreso
- ⬜ Pendiente
- ❌ Cancelado

## Última actualización
Fecha: 2025-01-13

## Changelog Reciente
- **2025-01-13**: Completado Sistema de Draft Asistido
  - Base de datos de meta con tiers y win rates
  - Sugerencias inteligentes de bans y picks
  - Counter-picks basados en matchups
  - Panel interactivo con tooltips detallados
- **2025-01-13**: Arreglado Chat del Draft
  - Optimistic updates para mensajes
  - Scroll automático mejorado
  - Mejor manejo de errores y reconexión
- **2025-01-13**: Rediseñada página de Torneos
  - Nueva estética profesional
  - Organización por secciones (registro, en progreso, completados)
  - Mejores tarjetas con progress bars y estados visuales
- **2025-01-12**: Completado Historial y Replay de Drafts
- **2025-01-12**: Completado Modo Espectador Mejorado
