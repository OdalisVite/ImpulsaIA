# Project memory

## Product intent & audience

- **ImpulsaIA**: learning/activity project for practicing AI-assisted error detection and correction.
- Current stage: educational, not production; user is learning debugging workflows with AI assistance.
- User communicates in Spanish; technical explanations and UI copy should remain in Spanish.

## Brand personality & voice

- Educational, clear, reassuring tone; explanations prioritize "identify before fixing."
- Transparent about what is app code vs. environment/platform behavior.

## Visual design & UX direction

- App appears to include sections, a "comparador" (comparison feature), and dark-mode support — all client-side, no backend.
- No Supabase or database integration needed for current scope; do not add one unless explicitly requested.

## Decisions, constraints & rationale

- **No Supabase / no DB**: User explicitly stated ImpulsaIA doesn't need these functions; do not add them.
- **404 on `/api/project/integrations/supabase/<id>`**: Determined to be an internal Bolt environment health-check, not from app code. No references to Supabase exist in any `.ts/.tsx/.js/.jsx/.env/config` files. `@supabase/supabase-js` is listed in `package.json` (ships with Bolt template) but is never imported — dead dependency.
- **No code changes made**: Per user instruction, investigate origin first; do not modify code until source is confirmed.
- Treat the 404 as safe to ignore for this project stage; it doesn't break app functionality.

## Open questions & assumptions

- Whether the unused `@supabase/supabase-js` dependency should be removed from `package.json` to reduce confusion (not yet requested).
- Future direction of ImpulsaIA beyond current educational scope (sections, comparador, dark mode) is unspecified.