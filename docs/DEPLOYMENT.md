# Déploiement et vérification avant publication

Le site se compose de deux applications distinctes : le client React/Vite, qui
peut être servi comme fichiers statiques, et l'API Express, qui doit tourner
dans un environnement Node.js. Les formulaires et le back-office ont besoin
de l'API et de PostgreSQL. Le site public peut afficher son contenu de secours
sans ces services.

## Préparer la production

1. Choisir une URL HTTPS stable pour le site et une URL HTTPS pour l'API.
2. Créer une base PostgreSQL, puis déployer le schéma avec
   `npm run db:deploy` depuis un environnement qui possède `DATABASE_URL`.
3. Déployer l'API Node.js. Configurer `DATABASE_URL`, `JWT_SECRET`,
   `JWT_EXPIRES_IN=12h`, `CLIENT_ORIGINS` (origine exacte du site, sans chemin)
   et `ADMIN_PASSWORD` (secret fort). Vérifier `/api/health`.
4. Construire le client avec `VITE_API_URL=https://<api>/api`.
5. Exécuter `npm run db:seed` avec `NODE_ENV=production` et le même
   `ADMIN_PASSWORD` pour créer ou mettre à jour le compte administrateur.
6. Vérifier les formulaires, l'authentification et le tableau de bord depuis
   l'origine de production.

Ne jamais publier les secrets dans Git, dans le client, ni dans les journaux.
Une URL `VITE_API_URL` est intégrée au JavaScript public et ne doit contenir
aucun secret.

## Cloudflare Pages

Cloudflare Pages sert le client statique. Il ne fait pas tourner directement
ce serveur Express/Prisma comme un processus Node.js permanent ; héberger l'API
sur Render ou un serveur Node.js et garder PostgreSQL accessible à cette API.

Dans Pages, connecter le dépôt GitHub et configurer :

- répertoire racine : dépôt (racine du monorepo) ;
- commande de build : `npm ci && npm run build:client` ;
- répertoire de sortie : `client/dist` ;
- variable de build `VITE_API_URL` : `https://<api>/api` ;
- version Node : 22.

Cloudflare Pages sert les routes de cette SPA via `index.html`. Après le premier
déploiement, ajouter l'origine HTTPS exacte de Pages ou du domaine personnalisé
à `CLIENT_ORIGINS`, puis contrôler `/api/health`, les formulaires et le login.

## GitHub Pages

GitHub Pages peut héberger le client, jamais l'API ni la base. L'API Node.js
reste nécessaire aux formulaires et à l'administration. Ce projet utilise des
URLs d'assets à partir de la racine ; pour éviter les images et scripts cassés,
utiliser un domaine personnalisé à la racine (recommandé) ou le dépôt
`<compte>.github.io`, plutôt qu'une URL de projet imbriquée.

1. Ajouter la variable de dépôt `VITE_API_URL` dans **Settings → Secrets and
   variables → Actions → Variables** avec `https://<api>/api`.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source.
3. Pousser sur `main` ou `master`. Le workflow
   `.github/workflows/github-pages.yml` construit le client, prépare le
   fallback SPA `404.html` et publie `client/dist`.
4. Ajouter l'origine GitHub Pages ou le domaine personnalisé dans
   `CLIENT_ORIGINS` côté API.

Un domaine personnalisé racine est préférable pour les routes React, les
assets absolus, les URL canoniques et le sitemap. Tant que l'API n'est pas
déployée et autorisée par CORS, le contenu public reste consultable avec ses
données de secours mais les formulaires et le back-office ne fonctionneront
pas.

## Serveur Node.js

`server/` est l'application Node.js de l'API. Sur un hébergeur Node (Render,
VPS ou équivalent), depuis la racine du dépôt :

```bash
npm ci
npm run db:generate
npm run build:server
npm run db:deploy
npm run start -w server
```

Définir les variables listées dans `server/.env.example` dans le gestionnaire
de secrets de l'hébergeur. Le processus écoute le port fourni par `PORT` (4000
en local). Configurer HTTPS, les redémarrages automatiques, les sauvegardes de
la base et un health check sur `/api/health`. `render.yaml` contient une
configuration de départ pour Render.

## Vérifications avant déploiement

### Ordinateur, téléphone et réseaux

- Contrôler les pages principales en largeur mobile et ordinateur, en portrait
  et paysage : navigation, textes, boutons, cartes, formulaires et photos.
- Tester une vraie connexion Wi-Fi puis les données mobiles ; vérifier le
  temps de chargement, l'accès aux images et la stabilité des formulaires.
- Vérifier les liens téléphone, e-mail, WhatsApp et carte sur un téléphone.
- Vérifier le focus clavier, les libellés de formulaires, le contraste et la
  préférence `prefers-reduced-motion`.
- Refaire ces contrôles sur les URL publiées : le serveur local ne permet pas
  de valider le DNS, le certificat HTTPS, le CORS de production ou l'accès
  mobile depuis l'extérieur.

### Rapidité et fiabilité

- Lancer `npm run typecheck` et `npm run build`.
- Vérifier que les images de production sont locales ou sous contrôle du
  cabinet, avec des tailles adaptées, un texte alternatif utile et le
  chargement différé sous la ligne de flottaison.
- Mesurer les pages publiées avec Lighthouse sur mobile et ordinateur ;
  corriger les erreurs de performance, accessibilité et SEO avant lancement.
- Vérifier les réponses API, CORS, erreurs réseau, formulaire de contact,
  demande de devis, connexion admin et health check.
- Vérifier les en-têtes HTTPS, la mise en cache des assets, les journaux et la
  procédure de restauration PostgreSQL.

### Indexation et moteurs de recherche

- Garder une URL canonique HTTPS cohérente dans `SITE.url`, `client/index.html`,
  les JSON-LD, `client/public/robots.txt` et `client/public/sitemap.xml`.
- Vérifier que le sitemap ne référence que des pages publiques en ligne et que
  les routes profondes renvoient l'application SPA.
- Contrôler titres, descriptions, langue française, liens internes, données
  structurées et image Open Graph sur les pages publiées.
- Déclarer le sitemap dans Google Search Console et Bing Webmaster Tools ;
  demander une exploration après publication. L'indexation par les moteurs
  dépend de leurs robots et ne peut pas être garantie par un build.

## Commandes de validation

```bash
npm run typecheck
npm run build
```
