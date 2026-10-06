# Sizhang Xu — Portfolio

[Visit the site](https://xuxu8421.github.io/)

A static portfolio covering software systems, AI evaluation, research, and product design. Built with HTML, CSS, and browser JavaScript; hosted on GitHub Pages.

## Run locally

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. There is no build step or package installation.

## Structure

- `index.html`: introduction, selected projects, internships, design gallery, and resume downloads.
- `styles.css`: shared layout, type, responsive styles, and reduced-motion behavior.
- `app.js`: engineering/product focus, design gallery, and keyboard interactions.
- `osa.html`, `alpha.html`, `structgraph.html`, `reader.html`, `evaluation.html`: project case studies.
- `assets/`: portfolio images and public sample outputs.
- `resumes/`: role-specific PDF resumes.

## Deployment

GitHub Pages publishes the root of the `main` branch. `.nojekyll` keeps the site buildless. Relative asset paths allow local previews and direct project-page links.

The site contains public project descriptions and selected assets; it does not include employer source code, private datasets, or API credentials. Alpha-TradingAgents builds on the open-source TradingAgents framework, with attribution retained in its case study and repository.
