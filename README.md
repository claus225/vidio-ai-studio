# Vidio AI Studio

Interface web responsive en français pour préparer des vidéos à partir d'un prompt ou d'une image.

## Démarrer en local

1. Installer Node.js (version 20 ou supérieure).
2. Dans ce dossier, lancer `npm install`.
3. Lancer `npm run dev`.
4. Ouvrir l'adresse locale affichée par Vite.

## État du projet

Cette première étape livre l'interface de création : modes texte/image, aperçu de l'image importée, durée, format, qualité et affichage responsive.

**Important : la génération vidéo réelle n'est pas encore connectée.** Le prochain chantier est le backend sécurisé et l'intégration d'un fournisseur de génération vidéo. Les clés API devront rester côté serveur, jamais dans le navigateur.

## Prochaines étapes

- API backend pour lancer et suivre les générations.
- Connexion à un fournisseur texte-vers-vidéo et image-vers-vidéo.
- Stockage sécurisé des fichiers et historique.
- Authentification et espace utilisateur.
- Tests, déploiement et optimisation mobile.
