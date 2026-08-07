# @orbisite/blocks

Bibliotheque de composants React publiee comme package prive sur GitHub Packages.

## Publier le package

Le workflow `.github/workflows/release-package.yml` publie automatiquement le package lors de la creation d'une release GitHub.

### Pre-requis

- Le nom du package doit rester scope: `@orbisite/blocks`.
- Le `package.json` contient deja:
  - `publishConfig.registry = https://npm.pkg.github.com`
  - `publishConfig.access = restricted`
- Le fichier `.npmrc` du repo contient:
  - `@orbisite:registry=https://npm.pkg.github.com`

### Etapes de publication

1. Commit + push sur `main`.
2. Creer une release GitHub (tag ex: `v0.1.0`).
3. GitHub Actions execute le workflow et publie `@orbisite/blocks` dans GitHub Packages.

## Utiliser le package dans un projet public

### 1) Configurer l'authentification npm

Dans le projet consommateur, ajouter un `.npmrc`:

```ini
@orbisite:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

> `GITHUB_PACKAGES_TOKEN` doit etre un token GitHub (PAT) avec au minimum `read:packages`.

### 2) Installer

```bash
npm install @orbisite/blocks
```

### 3) Importer les composants

```jsx
import { BlocksThemeProvider, PageRenderer } from '@orbisite/blocks'

export default function Landing({ page }) {
  return (
    <BlocksThemeProvider>
      <PageRenderer page={page} />
    </BlocksThemeProvider>
  )
}
```

Exports disponibles:

- `PageRenderer`
- `blockRegistry`
- `BlocksThemeProvider`
- `useBlockPalette`

## Notes

- Les dependances React restent en `peerDependencies` pour eviter les doublons dans les apps consommatrices.
- Si vous souhaitez tester localement le package avant publication, lancez `npm pack`.
