# État du projet — 20 novembre 2026

## Prise en main

Projet MN Consulting Engineering : monorepo npm, client React/TypeScript/Vite,
API Express/TypeScript et base PostgreSQL gérée par Prisma.
Les guides de référence sont `README.txt`, `docs/PLAN.md` et `docs/DEPLOYMENT.md`.

## Vérifications effectuées

- Dépôt propre au début de la session, branche `master`.
- `npm run build` réussi pour le serveur et le client, avec vérification TypeScript.
- `npm run dev:client` lancé ; page locale répondant HTTP 200 sur
  http://localhost:5173/ ; ouverture du navigateur demandée avec succès.
- Aucun changement du code applicatif pendant cette prise en main.

Le bac à sable Windows a initialement bloqué esbuild ; le lancement et la
compilation ont réussi après exécution autorisée hors du bac à sable.

## Points restant à vérifier

- API et PostgreSQL : non démarrés ni testés durant cette session.
- Connexion administrateur, enregistrement des contacts et demandes de devis :
  à vérifier avec une API et une base opérationnelles.
- Affichage dans le navigateur et parcours mobiles : pas encore vérifiés visuellement.
- Production et déploiement distant : non vérifiés.

Le site public dispose de données de secours si l'API est indisponible.
Le démarrage local peut être relancé avec `npm run dev:client` ; le processus
actuel ne constitue pas un service permanent et ne survit pas nécessairement
à la fermeture de la session ou au redémarrage du PC.

## Priorités de reprise

1. Vérifier la configuration locale de l'API et la disponibilité de PostgreSQL.
2. Valider les parcours contact, devis et administration de bout en bout.
3. Examiner le rendu sur ordinateur et téléphone.
4. Compléter ensuite les fonctions d'administration selon les besoins métier.
