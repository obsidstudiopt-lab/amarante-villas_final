# Editar Amarante Villas

## Propriedades
Editar `src/data/properties.js`.

Cada casa contém nome, localização, descrição, capacidade, quartos, casas de banho, comodidades, layout, serviços, imagens e vídeo.

As imagens de cada casa ficam em:
- `public/media/aboim/`
- `public/media/fregim/`

Os vídeos ficam em `public/media/videos/`.

Para adicionar uma nova casa, duplicar um objeto em `properties.js`, alterar `id`, `slug`, textos e caminhos de media.

## Conteúdo geral
- História e regras: `src/data/siteContent.js`
- Contactos, redes sociais e hero da homepage: `src/config.js`

## Deploy
Cloudflare Pages:
- Build: `npm install && npm run build`
- Output: `dist`
- Root: vazio
