MM CONSULTING ENGINEERING — GUIDE COMPLET DU PROJET
===================================================

Version du guide : 2.0
Dernière mise à jour : 14 novembre 2026
Langue : français

Ce document est le guide principal du projet. Il décrit l'application cliente,
l'API Node.js, PostgreSQL, le
développement local, la sécurité, les mises à jour et le déploiement.

Le dépôt est un monorepo npm composé de trois parties :
1. client/ : site public React/Vite et interface d'administration ;
  2. server/ : API REST Node.js/Express ;
  3. PostgreSQL : stockage de l'API, géré par Prisma.

Le client public peut afficher ses données de secours sans serveur. Les
formulaires, la connexion administrateur et le tableau de bord nécessitent
l'API et la base PostgreSQL.


SOMMAIRE
--------
 1. Présentation et fonctionnement général
 2. Fonctionnalités du site et limites actuelles
 3. Technologies utilisées
 4. Organisation des fichiers
 5. Prérequis
 6. Voir le site sans API ni base de données
 7. Installation complète en local
 8. Configuration des variables d'environnement
 9. Client web : développement et production
10. API Node.js : démarrage et fonctionnement
11. PostgreSQL et Prisma
12. Compte administrateur et sécurité des données
13. Routes web
14. API REST
15. Images, contenu, SEO et performance
16. Vérification et compilation
17. Déploiement Cloudflare Pages
18. Déploiement GitHub Pages
19. Déploiement Netlify
20. Déploiement du serveur Node.js et de la base
21. Intégration continue GitHub Actions
22. Mettre à jour le projet
23. Dépannage
24. Contrôles avant publication
25. Références et contacts


1. PRÉSENTATION ET FONCTIONNEMENT GÉNÉRAL
=========================================

MM Consulting Engineering est un site vitrine pour un cabinet d'ingénierie
civile basé à Brazzaville, en République du Congo. Le site public présente le
cabinet, ses expertises et ses réalisations. Une zone d'administration permet
aux utilisateurs autorisés de consulter les demandes et de gérer certaines
actions éditoriales.

Architecture :

  Navigateur / téléphone
          |
          | HTTPS, requêtes JSON
          v
  Client React compilé en fichiers statiques
          |
          | HTTPS /api
          v
  API Node.js + Express
          |
          | Prisma + connexion privée
          v
  Base PostgreSQL

Le client et l'API sont deux applications séparées et se déploient
indépendamment. L'API Node.js ne tourne pas dans GitHub Pages ou Cloudflare
Pages en tant que processus permanent. Ces plateformes hébergent les fichiers
statiques du client. Il faut héberger l'API et PostgreSQL sur des services
compatibles séparés.

Mode avec données de secours : le client lit les données intégrées dans
client/src/data/fallback.ts si les requêtes de contenu à l'API échouent. Le
site public reste ainsi consultable, mais les formulaires et l'administration
ne peuvent pas enregistrer ou lire des données sans API opérationnelle.


2. FONCTIONNALITÉS DU SITE ET LIMITES ACTUELLES
==============================================

Pages publiques :
  - Accueil ;
  - À propos / présentation du cabinet ;
  - Services et expertises ;
  - Liste des réalisations et filtres par catégorie ;
  - Fiche détaillée d'une réalisation ;
  - Contact et demande de devis ;
  - Carrières ;
  - Mentions légales et politique de confidentialité ;
  - Plan du site et page 404.

Fonctions d'interface : navigation adaptative aux téléphones et ordinateurs,
thème clair/sombre, bouton WhatsApp, chargement différé des images et
animations réduites lorsque le navigateur demande moins de mouvement.

Administration :
  - connexion par e-mail et mot de passe ;
  - indicateurs de messages, devis, réalisations, services, témoignages et
    membres d'équipe ;
  - consultation, changement de statut et suppression des messages ;
  - consultation, changement de statut et suppression des devis ;
  - mise en avant ou retrait de la une des réalisations ;
  - accès aux fiches publiques et suppression d'une réalisation.

Limites à connaître : l'interface admin actuelle ne fournit pas de formulaire
complet d'ajout ou d'édition pour les services, les témoignages et les
membres d'équipe. Les routes de l'API proposent les opérations CRUD
correspondantes, mais l'interface ne les expose pas. Les photos de projets
sont référencées par URL ou chemin de fichier ; aucun téléversement de fichier
dans le tableau de bord n'est implémenté. Les candidatures de la page Carrières
utilisent les coordonnées affichées et ne sont pas stockées comme dossiers
dans la base par une route dédiée.

Les fiches comportant une photo publique d'archive ou une photo de référence
indiquent sa provenance. Une photo de référence ne doit pas être présentée
comme la photographie du chantier concerné. Vérifier les droits de réutilisation
et les crédits avant toute publication commerciale.


3. TECHNOLOGIES UTILISÉES
========================

Client (client/) :
  - React 19 et TypeScript ;
  - Vite 6 pour le serveur local et la compilation ;
  - Tailwind CSS 4 ;
  - React Router 6 pour les routes ;
  - Framer Motion pour les animations ;
  - Lucide React pour les icônes.

Serveur (server/) :
  - Node.js 20 ou supérieur ; Node 22 est recommandé ;
  - Express 4 et TypeScript ;
  - Prisma 6 pour les accès PostgreSQL et les migrations ;
  - Zod pour valider les requêtes ;
  - bcryptjs et JWT pour l'authentification ;
  - Helmet, CORS et compression pour les réponses HTTP ;
  - express-rate-limit pour limiter certaines requêtes ;
  - Morgan pour les journaux en environnement non-production.

Données : PostgreSQL 16. Docker Compose fournit une base locale de
développement. En production, une base PostgreSQL managée (Neon, Supabase ou
service équivalent) peut être utilisée.

Les versions exactes des paquets installés sont enregistrées dans
package-lock.json. Utiliser npm ci dans les environnements de déploiement et
de CI pour installer ces versions.


4. ORGANISATION DES FICHIERS
===========================

  client/                         Application web React
    public/                       Photos, icônes, sitemap, robots.txt,
                                  manifest, redirections SPA
    src/components/               Composants, sections et mise en page
    src/context/                  État d'authentification et thème
    src/data/fallback.ts          Contenu local et coordonnées du site
    src/lib/api.ts                Accès à l'API et données de secours
    src/lib/seo.ts                Métadonnées des pages
    src/pages/                    Pages publiques et administration
    index.html                    Document HTML et métadonnées initiales
    vite.config.ts                Serveur local, proxy API et port

  server/                         API Express
    prisma/schema.prisma          Modèles de données PostgreSQL
    prisma/migrations/            Migrations versionnées
    prisma/seed.ts                 Compte admin et données initiales
    src/config/env.ts             Lecture et validation de configuration
    src/routes/                   Routes REST
    src/middleware/               Authentification, validation, limites
    src/validators/schemas.ts     Schémas de validation Zod
    src/app.ts                    Configuration Express et routes
    src/index.ts                  Démarrage et arrêt du serveur
    .env.example                  Exemple de variables locales

  .github/workflows/ci.yml        Compilation et vérification CI
  .github/workflows/github-pages.yml
                                  Publication du client GitHub Pages
  docker-compose.yml              PostgreSQL local
  netlify.toml                    Paramètres du site Netlify
  render.yaml                     Exemple de déploiement de l'API sur Render
  docs/DEPLOYMENT.md              Procédures et contrôles de déploiement
  docs/PLAN.md                    Plan directeur technique
  package.json                    Workspaces et commandes globales
  package-lock.json               Versions verrouillées des dépendances
  README.txt                      Guide détaillé (ce document)


5. PRÉREQUIS
============

Pour consulter le site :
  - Node.js version 20 ou supérieure ; Node.js 22 conseillé ;
  - npm, installé avec Node.js.

Pour lancer aussi l'API et la base en local :
  - Docker Desktop avec Docker Compose, ou une base PostgreSQL accessible ;
  - port 5173 disponible pour le client ;
  - port 4000 disponible pour l'API ;
  - port 5432 disponible pour PostgreSQL si Docker local est utilisé.

Vérifier les outils depuis un terminal :

  node --version
  npm --version
  docker --version


6. VOIR LE SITE SANS API NI BASE DE DONNÉES
===========================================

Depuis la racine du dépôt :

  npm install
  npm run dev:client

Ouvrir http://localhost:5173 dans le navigateur. Cette méthode sert le site
public avec les données de secours de client/src/data/fallback.ts. Elle ne
permet pas l'envoi effectif des formulaires, l'authentification ni la lecture
des données administratives.

Arrêt : Ctrl+C dans le terminal qui exécute Vite.


7. INSTALLATION COMPLÈTE EN LOCAL
================================

Toutes les commandes suivantes sont lancées depuis la racine du dépôt.

Étape 1 — Installer les dépendances :

  npm install

Les dépendances des workspaces client et server sont installées. Le script
postinstall du serveur génère le client Prisma.

Étape 2 — Démarrer PostgreSQL :

  docker compose up -d

La configuration locale de docker-compose.yml crée :
  base       mm_consulting
  utilisateur mm
  port       5432

Le mot de passe mm_secret présent dans Compose est réservé au développement
local. Il ne faut pas le réutiliser sur un serveur public.

Étape 3 — Créer les fichiers de configuration locaux :

PowerShell :
  Copy-Item server/.env.example server/.env
  Copy-Item client/.env.example client/.env

macOS / Linux :
  cp server/.env.example server/.env
  cp client/.env.example client/.env

Les fichiers .env ne doivent pas être ajoutés à Git. .gitignore les exclut.
Pour une instance PostgreSQL différente, modifier DATABASE_URL dans
server/.env. Pour le client local, VITE_API_URL=/api et le proxy Vite envoie
les appels à http://localhost:4000.

Étape 4 — Préparer la base :

Pour une base de développement vierge, appliquer la migration versionnée :
  npm run db:deploy

Cette commande applique les migrations dans server/prisma/migrations. Pour
modifier le schéma en développement et créer une nouvelle migration, utiliser
plutôt :
  npm run db:migrate

Étape 5 — Charger les données initiales si nécessaire :

  npm run db:seed

Le seed est idempotent pour les éléments qu'il gère, mais met à jour certains
enregistrements portant les mêmes identifiants ou slugs. Ne pas l'exécuter
sans examen sur une base contenant des données éditoriales de production.

Étape 6 — Démarrer l'ensemble :

  npm run dev

Adresses locales :
  Site                    http://localhost:5173
  API                     http://localhost:4000/api
  Contrôle de santé API   http://localhost:4000/api/health
  Connexion admin         http://localhost:5173/admin/login

Le script npm run dev démarre aussi le service mDNS local qui tente d'exposer
mm-consulting.local sur le réseau. Le nom mDNS dépend de la configuration du
réseau et du pare-feu ; l'adresse IP locale du PC reste une alternative.


8. CONFIGURATION DES VARIABLES D'ENVIRONNEMENT
==============================================

Serveur : copier server/.env.example vers server/.env puis configurer :

  NODE_ENV=development
      En local, laisser development. En production, définir production.

  PORT=4000
      Port HTTP de l'API. L'hébergeur peut fournir sa propre valeur PORT.

  DATABASE_URL="postgresql://mm:mm_secret@localhost:5432/mm_consulting?schema=public"
      Chaîne PostgreSQL. En production, utiliser la chaîne TLS fournie par
      l'hébergeur de base. Cette valeur reste exclusivement côté serveur.

  JWT_SECRET="une-longue-valeur-aleatoire"
      Secret de signature des sessions. Choisir une valeur aléatoire longue,
      différente dans chaque environnement. Ne jamais placer dans le client.

  JWT_EXPIRES_IN=12h
      Durée de validité des jetons.

  CLIENT_ORIGINS="http://localhost:5173"
      Liste séparée par des virgules des origines clientes autorisées. En
      production, inclure l'origine HTTPS exacte du site, sans chemin.

  ADMIN_PASSWORD=
      Mot de passe initial optionnel en local. En production, le seed exige
      cette variable et refuse le mot de passe de démonstration.

Client : client/.env.example contient :

  VITE_API_URL="/api"

En développement, Vite proxifie /api vers localhost:4000. En production,
définir VITE_API_URL avec l'URL HTTPS publique complète, par exemple
https://api.exemple.cg/api. Toute variable VITE_* est intégrée dans le
JavaScript public : n'y placer aucun secret, mot de passe ou chaîne privée.

Les valeurs de .env.example sont des exemples de développement. Les secrets
de production doivent être enregistrés dans les variables secrètes de
l'hébergeur, jamais dans un fichier committé.


9. CLIENT WEB : DÉVELOPPEMENT ET PRODUCTION
===========================================

Le client est une application monopage (SPA) React. React Router gère les
routes dans le navigateur ; la plateforme web doit rediriger les routes
inconnues vers index.html ou fournir un fallback équivalent.

Commandes :
  npm run dev:client       Démarre Vite seul, port 5173
  npm run build:client     Vérifie TypeScript puis produit client/dist
  npm run preview -w client
                           Sert localement le build, port Vite 4173

Pour le mobile sur le même Wi-Fi, le serveur Vite écoute sur le réseau local.
Dans le navigateur du téléphone, ouvrir http://<IP-locale-du-PC>:5173. Les
deux appareils doivent être sur le même réseau et le pare-feu du PC doit
autoriser Node.js sur le réseau privé.

Pour un accès temporaire depuis les données mobiles, lancer le site et, dans
un autre terminal, npm run tunnel. Le tunnel Cloudflare temporaire affiche une
URL HTTPS. Cette URL de développement n'est pas un déploiement durable ; ne
pas y saisir de véritables identifiants d'administration.

Le build client se trouve dans client/dist. Ce répertoire est généré et ignoré
par Git ; il est recréé par npm run build:client sur l'hébergeur.


10. API NODE.JS : DÉMARRAGE ET FONCTIONNEMENT
============================================

L'API Express valide les entrées avec Zod, applique les règles d'accès,
effectue les opérations PostgreSQL avec Prisma et renvoie du JSON. Les
requêtes nécessitant une connexion portent un en-tête Authorization de type
Bearer avec le jeton obtenu lors de la connexion.

Commandes :
  npm run dev:server       Démarre l'API en mode watch
  npm run build:server     Compile TypeScript dans server/dist
  npm run start -w server  Démarre le serveur compilé

L'API écoute sur PORT (4000 en local). Elle expose /api/health, qui vérifie
également la connexion à la base. Une réponse 503 indique que la base n'est
pas joignable.

En production, le serveur doit disposer de DATABASE_URL, JWT_SECRET et des
origines CLIENT_ORIGINS. Il doit être servi derrière HTTPS. Prévoir des
redémarrages automatiques, la surveillance du health check et des sauvegardes
de PostgreSQL.


11. POSTGRESQL ET PRISMA
=======================

Modèles de données définis dans server/prisma/schema.prisma :

  User            Comptes de connexion et rôles ADMIN / EDITOR
  Project         Réalisations, images, catégorie, année et statut
  Service         Expertises et ordre d'affichage
  Testimonial     Témoignages et publication
  TeamMember      Membres du cabinet et informations publiques
  Message         Messages du formulaire de contact et statut
  QuoteRequest    Demandes de devis et statut de traitement

Les catégories projet sont BATIMENT, INFRASTRUCTURE, VOIRIE, HYDRAULIQUE,
INDUSTRIEL et TOPOGRAPHIE. Les contenus publiables utilisent les statuts
PUBLISHED et DRAFT lorsque le modèle le prévoit. Les formulaires produisent
des statuts NEW, puis l'administration peut les faire évoluer.

Commandes Prisma depuis la racine :

  npm run db:generate     Génère le client Prisma
  npm run db:push         Synchronise directement le schéma en développement
  npm run db:migrate      Crée/applique une migration de développement
  npm run db:deploy       Applique les migrations déjà versionnées
  npm run db:seed         Charge les données initiales
  npm run db:studio       Ouvre l'interface Prisma Studio

Utiliser db:push pour prototyper un schéma local uniquement lorsque la base
n'est pas gérée par des migrations versionnées. Pour un déploiement et une
base durable, committer la migration puis utiliser db:deploy.

Ne pas modifier manuellement une base de production pour faire correspondre
le schéma. Sauvegarder la base, examiner la migration, puis l'appliquer via
Prisma. Avant une migration qui supprime ou transforme des colonnes, préparer
une sauvegarde et un plan de retour arrière.


12. COMPTE ADMINISTRATEUR ET SÉCURITÉ DES DONNÉES
================================================

En local, le seed crée le compte de démonstration suivant :
  E-mail       admin@mmconsulting.cg
  Mot de passe Admin@2026!

Ces identifiants sont réservés au développement. Ne pas exposer une API de
démonstration sur Internet avec ce compte. En production, définir un
ADMIN_PASSWORD différent et robuste avant le seed ; server/prisma/seed.ts
refuse explicitement le mot de passe de démonstration en NODE_ENV=production.
Le seed met à jour le mot de passe du compte initial s'il existe déjà.

Mesures présentes dans l'application : mots de passe hachés avec bcrypt,
jetons signés par JWT, contrôle des routes protégées, validation Zod,
limitation des requêtes de connexion et de formulaire, Helmet, CORS,
compression et taille maximale des corps JSON. CORS doit être limité aux
origines du client de production.

Bonnes pratiques :
  - ne jamais committer .env, un export de base ou un jeton ;
  - utiliser un JWT_SECRET généré aléatoirement et le faire tourner si exposé ;
  - réserver DATABASE_URL et ADMIN_PASSWORD aux variables serveur ;
  - ne jamais inclure de secrets dans VITE_API_URL ou tout VITE_* ;
  - utiliser HTTPS et une base PostgreSQL privée avec TLS ;
  - sauvegarder et tester la restauration de la base ;
  - supprimer les données de démonstration avant d'accepter des données réelles.


13. ROUTES WEB
==============

  /                         Accueil
  /a-propos                 Le cabinet
  /services                 Expertises
  /realisations             Liste des réalisations
  /realisations/:slug       Fiche d'une réalisation
  /contact                  Formulaire de contact
  /devis                    Demande de devis
  /carrieres                Carrières
  /mentions-legales         Mentions légales
  /politique-confidentialite Politique de confidentialité
  /plan-du-site             Plan du site
  /admin/login              Connexion administrateur
  /admin                    Tableau de bord protégé

Les routes d'administration sont protégées côté client et côté API. Une
redirection de l'hébergeur vers le client SPA est requise pour les routes
profondes comme /realisations/mon-projet.


14. API REST
============

Préfixe local : http://localhost:4000/api
Préfixe production : https://<domaine-api>/api
Format : JSON. Les routes d'administration nécessitent un jeton Bearer.

Santé et connexion :
  GET  /api/health                  Santé de l'API et de PostgreSQL
  POST /api/auth/login              Connexion, renvoie le jeton et le profil
  GET  /api/auth/me                 Profil associé au jeton

Contenu public :
  GET  /api/projects                Liste publiée, paramètres facultatifs
                                    featured=true, category=BATIMENT,
                                    limit=50 (maximum 100)
  GET  /api/projects/:slug          Fiche publiée
  GET  /api/services                Liste des services
  GET  /api/team                    Membres publiés
  GET  /api/testimonials            Témoignages publiés

Messages :
  POST   /api/messages              Enregistrer un message public
  GET    /api/messages              Liste admin, filtre status facultatif
  PATCH  /api/messages/:id/status   Modifier le statut
  DELETE /api/messages/:id          Supprimer

Devis :
  POST   /api/quotes                Enregistrer une demande publique
  GET    /api/quotes                Liste admin, filtre status facultatif
  PATCH  /api/quotes/:id/status     Modifier le statut
  DELETE /api/quotes/:id            Supprimer

Administration du contenu (routes de modification protégées) :
  GET    /api/stats                Indicateurs du tableau de bord
  POST   /api/projects             Créer une réalisation
  PUT    /api/projects/:id         Modifier une réalisation
  DELETE /api/projects/:id         Supprimer une réalisation
  POST/PUT/DELETE /api/services    Gérer les services
  POST/PUT/DELETE /api/team        Gérer l'équipe
  POST/PUT/DELETE /api/testimonials Gérer les témoignages

Les méthodes POST, PUT, PATCH et DELETE qui changent les données requièrent
un jeton valide, sauf POST /messages et POST /quotes qui sont les formulaires
publics. Les données d'entrée sont limitées par les schémas de
server/src/validators/schemas.ts. Consulter ces schémas avant de créer un
client API ou d'intégrer un formulaire supplémentaire.


15. IMAGES, CONTENU, SEO ET PERFORMANCE
=======================================

Contenu : les données de secours et coordonnées sont centralisées dans
client/src/data/fallback.ts. Les données semées dans PostgreSQL se trouvent
dans server/prisma/seed.ts. Garder les slugs, descriptions, images et années
cohérents entre les deux sources lorsqu'une réalisation est modifiée.

Images : les ressources locales publiques se trouvent dans client/public et
sont accessibles à partir de la racine, par exemple /project-cmvb-adiac.jpg.
Vérifier chaque chemin dans fallback.ts et dans le seed si la base l'utilise.
Les images de référence comportent une légende et un lien source dans les
fiches concernées. Préférer des images compressées de dimensions adaptées,
avec droit de publication et texte alternatif descriptif. Les images de
galerie sont chargées de façon différée lorsqu'elles ne sont pas visibles.

SEO :
  - métadonnées par page et URL canonique gérées par client/src/lib/seo.ts ;
  - métadonnées initiales et JSON-LD dans client/index.html ;
  - robots.txt et sitemap.xml dans client/public ;
  - données structurées pour le site et ses réalisations ;
  - pages et espace d'administration à indexer selon leur configuration.

Avant de changer de domaine, rechercher l'ancienne URL dans SITE.url,
client/index.html, client/public/sitemap.xml et client/public/robots.txt.
Publier uniquement des routes publiques dans le sitemap. Après mise en ligne,
déclarer le sitemap dans Google Search Console et Bing Webmaster Tools ;
l'exploration et l'indexation dépendent des moteurs et ne sont pas garanties.

Performance : le client est compilé, les routes sont chargées à la demande,
les images sont stockées localement dans le dépôt et certaines sont déjà
compressées. Mesurer néanmoins le site publié avec Lighthouse sur téléphone,
réseau mobile et ordinateur ; un build local ne valide pas le débit de l'API,
le CDN, le DNS ni la latence de la base distante.


16. VÉRIFICATION ET COMPILATION
===============================

Commandes depuis la racine :

  npm run typecheck       Vérifie TypeScript client et serveur
  npm run build           Compile serveur puis client
  npm run build:server    Compile l'API dans server/dist
  npm run build:client    Compile le client dans client/dist
  git diff --check        Repère les espaces/erreurs de patch dans Git

Le projet ne définit actuellement pas de script automatisé de tests unitaires
ou de tests de navigateur. Une compilation réussie ne remplace pas les
vérifications fonctionnelles des formulaires, du login, des routes profondes
et de l'affichage sur téléphone.


17. DÉPLOIEMENT CLOUDFLARE PAGES
===============================

Cloudflare Pages héberge le client statique. L'API doit être hébergée sur un
serveur Node.js compatible et la base doit rester accessible à cette API.

Paramètres Pages depuis le dépôt racine :
  commande de build    npm ci && npm run build:client
  dossier de sortie    client/dist
  version Node         22
  variable de build    VITE_API_URL=https://<domaine-api>/api

Ne pas renseigner de secret dans VITE_API_URL. Dans CLIENT_ORIGINS côté API,
ajouter l'origine HTTPS exacte fournie par Pages ou le domaine personnalisé.
Configurer le fallback SPA si nécessaire, puis vérifier les routes profondes,
les images, /api/health, les formulaires et le login.


18. DÉPLOIEMENT GITHUB PAGES
============================

GitHub Pages héberge uniquement les fichiers du client, pas l'API Express ni
PostgreSQL. Le workflow .github/workflows/github-pages.yml construit client/
sur les branches main ou master, prépare client/dist/404.html pour les routes
SPA puis publie le site.

Configuration nécessaire :
  1. Dans GitHub, choisir GitHub Actions comme source de publication Pages.
  2. Ajouter la variable Actions VITE_API_URL avec l'URL HTTPS de l'API.
  3. Autoriser l'origine publique Pages dans CLIENT_ORIGINS de l'API.
  4. Pousser la branche main ou master pour lancer le workflow.

Le workflow échoue volontairement si VITE_API_URL n'est pas définie. Le
projet utilise des chemins absolus à partir de la racine. Une URL de dépôt
imbriquée du type owner.github.io/nom-du-depot peut donc casser les ressources
ou les routes ; préférer un domaine personnalisé à la racine ou le dépôt
owner.github.io. Les formulaires et le back-office restent indisponibles tant
que l'API n'est pas déployée et autorisée par CORS.


19. DÉPLOIEMENT NETLIFY
=======================

netlify.toml contient les paramètres de build, les en-têtes HTTP et la règle
de fallback de l'application monopage.

Paramètres :
  commande de build    npm run build:client
  dossier publié       client/dist
  version Node         22
  variable             VITE_API_URL=https://<domaine-api>/api

Ajouter l'origine Netlify exacte à CLIENT_ORIGINS sur l'API. Contrôler le
fallback SPA, les en-têtes, l'API, les formulaires et la connexion admin sur
le domaine publié.


20. DÉPLOIEMENT DU SERVEUR NODE.JS ET DE LA BASE
===============================================

render.yaml fournit un exemple de service Node.js sur Render. Il compile
l'API et définit les variables nécessaires, mais la base PostgreSQL distante
doit être créée et sa chaîne DATABASE_URL fournie. Toute valeur marquée
sync:false doit être saisie dans le tableau de bord de l'hébergeur.

Variables serveur à définir dans le gestionnaire de secrets :
  NODE_ENV=production
  PORT (fourni par l'hébergeur)
  DATABASE_URL (chaîne PostgreSQL TLS)
  JWT_SECRET (secret long et aléatoire)
  JWT_EXPIRES_IN=12h (ou durée choisie)
  CLIENT_ORIGINS (origine HTTPS du site)
  ADMIN_PASSWORD (mot de passe initial fort)

Procédure type, depuis un environnement dont DATABASE_URL pointe vers la
base cible :

  npm ci
  npm run db:generate
  npm run build:server
  npm run db:deploy
  npm run db:seed

Le seed de production exige ADMIN_PASSWORD et refuse le mot de passe local de
démonstration. Avant de l'exécuter, vérifier l'effet de ses upserts sur les
projets et services existants. Sauvegarder la base avant la migration et le
chargement initial. Démarrer ensuite avec :

  npm run start -w server

Configurer l'health check sur /api/health. Activer HTTPS, journaux et
redémarrage automatique. Vérifier le CORS depuis le domaine du client ainsi
que l'envoi d'un message, d'un devis, le login et les opérations admin.


21. INTÉGRATION CONTINUE GITHUB ACTIONS
=======================================

.github/workflows/ci.yml s'exécute lors d'un push sur main/master ou d'une
pull request. Il installe les paquets avec npm ci, génère le client Prisma,
vérifie TypeScript et compile le serveur et le client.

.github/workflows/github-pages.yml publie le client lors d'un push sur
main/master ou lors d'un lancement manuel depuis l'onglet Actions. Il nécessite
la variable de dépôt VITE_API_URL et la publication GitHub Pages activée.

Les vérifications s'exécutent dans GitHub Actions après le push. Vérifier
l'onglet Actions avant de communiquer l'URL de production.


22. METTRE À JOUR LE PROJET
===========================

Modification du contenu affiché sans édition depuis l'admin :
  1. Modifier les données correspondantes dans client/src/data/fallback.ts.
  2. Si l'API est utilisée, mettre aussi à jour server/prisma/seed.ts ou
     effectuer la modification éditoriale dans la base avec un outil autorisé.
  3. Pour les images, déposer des fichiers optimisés dans client/public et
     utiliser leur chemin public dans les données concernées.
  4. Vérifier les crédits, les droits et les textes alternatifs des photos.
  5. Lancer npm run typecheck puis npm run build.
  6. Pousser la modification sur la branche configurée ; attendre la CI et le
     déploiement de la plateforme d'hébergement.

Modification du modèle PostgreSQL :
  1. Modifier server/prisma/schema.prisma.
  2. En développement, lancer npm run db:migrate et fournir un nom descriptif
     pour la migration.
  3. Examiner et versionner la migration créée dans server/prisma/migrations.
  4. Vérifier le serveur et le build.
  5. Déployer le code puis appliquer les migrations avec npm run db:deploy sur
     la base cible, selon la procédure de l'hébergeur.

Après une mise à jour frontend, le CDN peut conserver temporairement certains
fichiers. Les assets de build ont des noms versionnés ; si l'ancien écran reste
visible, recharger sans cache ou vider le cache du navigateur.


23. DÉPANNAGE
=============

Le site s'ouvre, mais les formulaires échouent :
  - vérifier que l'API tourne sur le port 4000 en local ;
  - ouvrir /api/health et vérifier l'état PostgreSQL ;
  - contrôler VITE_API_URL et le proxy /api de Vite ;
  - en production, vérifier CLIENT_ORIGINS et le certificat HTTPS.

Erreur « variable d'environnement manquante » :
  - vérifier que server/.env existe et contient DATABASE_URL et JWT_SECRET ;
  - ne pas confondre server/.env.example et server/.env ;
  - redémarrer le serveur après une modification.

Erreur de connexion à PostgreSQL :
  - démarrer Docker avec docker compose up -d ;
  - contrôler le port, l'utilisateur, le mot de passe et le nom de base ;
  - tester la chaîne DATABASE_URL ;
  - générer le client Prisma avec npm run db:generate ;
  - vérifier que les migrations sont appliquées.

Une URL profonde renvoie une 404 sur l'hébergeur :
  - configurer le fallback SPA vers index.html ;
  - vérifier les redirections Netlify, Pages ou Cloudflare ;
  - pour GitHub Pages, vérifier également la présence du 404.html produit par
    le workflow et utiliser un domaine à la racine.

L'application ne peut pas être jointe sur téléphone :
  - connecter téléphone et ordinateur au même Wi-Fi ;
  - remplacer localhost par l'IP locale de l'ordinateur ;
  - autoriser le trafic Node.js dans le pare-feu du réseau privé ;
  - pour des données mobiles, utiliser un tunnel HTTPS ou une vraie URL publiée.

Le déploiement GitHub Pages s'arrête sur VITE_API_URL :
  - ajouter cette variable dans Settings > Secrets and variables > Actions >
    Variables ;
  - vérifier qu'elle contient l'URL publique de l'API terminée par /api.


24. CONTRÔLES AVANT PUBLICATION
===============================

Code et données :
  [ ] npm ci et npm run typecheck réussissent.
  [ ] npm run build réussit pour le serveur et le client.
  [ ] les fichiers .env et secrets ne sont pas suivis par Git.
  [ ] les migrations versionnées sont présentes et examinées.
  [ ] les données de démonstration ont été vérifiées avant le seed.
  [ ] les coordonnées, mentions légales et politique de confidentialité sont
      celles de l'organisation qui publie le site.
  [ ] toutes les photos ont les crédits et autorisations requis.

Hébergement et API :
  [ ] VITE_API_URL désigne l'API HTTPS de production.
  [ ] CLIENT_ORIGINS correspond au domaine exact du client.
  [ ] DATABASE_URL et JWT_SECRET sont définis uniquement côté serveur.
  [ ] ADMIN_PASSWORD est fort et différent de la valeur de démonstration.
  [ ] /api/health répond avec PostgreSQL disponible.
  [ ] formulaires, login, statuts admin et déconnexion sont vérifiés.
  [ ] sauvegarde et restauration PostgreSQL sont documentées.

Affichage et découverte :
  [ ] vérifier téléphone, tablette et ordinateur ; portrait et paysage.
  [ ] vérifier les images, liens téléphoniques, e-mail et WhatsApp.
  [ ] tester clavier, libellés, contraste et réduction des animations.
  [ ] tester sur Wi-Fi et réseau mobile une fois le site publié.
  [ ] contrôler routes profondes, URL canonique, titres, description, sitemap,
      robots.txt et données structurées.
  [ ] mesurer le site publié avec Lighthouse mobile et ordinateur.
  [ ] déclarer le sitemap aux outils Google et Bing après mise en ligne.

Un build local ne garantit pas le fonctionnement du DNS, de HTTPS, du CORS, du
réseau mobile, de l'API distante ou de l'indexation par les moteurs. Ces points
se vérifient sur les URL de production.


25. RÉFÉRENCES ET CONTACTS
==========================

  Plan d'architecture       docs/PLAN.md
  Procédures de déploiement docs/DEPLOYMENT.md
  Exemple serveur           server/.env.example
  Exemple client            client/.env.example
  Schéma de données         server/prisma/schema.prisma
  Données de secours        client/src/data/fallback.ts
  Seed de base              server/prisma/seed.ts

  Site local                http://localhost:5173
  API locale                http://localhost:4000/api
  Santé API                 http://localhost:4000/api/health
  Connexion admin locale    http://localhost:5173/admin/login

Les coordonnées actuellement inscrites dans le contenu du site sont à
confirmer avec le cabinet avant la mise en production. Remplacer toute valeur
de démonstration et faire valider les informations juridiques publiées.

FIN DU GUIDE
============
