# Code Arcade

Learn HTML, CSS and JavaScript by playing games. Made for kids aged about 6–14. No account needed, and no server.

**Play it:** https://abdoniscreed89.github.io/code-arcade/

## What's inside
- **Story adventures:** Codeling Quest, Rift Runner (a platformer where your code builds the platforms), **Spire City** (a 3D city: climb towers, and your code builds bridges, gates and lifts), Shadowblade (CSS) and Runebound (JavaScript)
- **Mini-games** for HTML, CSS, Flexbox, Grid and JavaScript
- **63 guided projects:** build real websites step by step
- **Profiles, stars, badges and a progress report** for parents. Saves stay in your browser.

## How the project is built
The game is ONE file: `index.html`. It is made from the small source files in `src/`:

```
python3 build.py          # joins src/* (in src/MANIFEST order) into index.html
```

- `src/` holds the source pieces. `MANIFEST` sets the order.
- `tests/` holds automatic checks that run in a headless browser (Playwright). For example: `python3 tests/rift.py index.html` or `python3 tests/spire.py index.html`
- `docs/` holds the design briefs for the levels.

Do not edit `index.html` by hand. Edit `src/`, then run `build.py`.
