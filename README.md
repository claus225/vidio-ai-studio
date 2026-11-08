# Vidio AI Studio

Interface web responsive en français pour préparer des vidéos à partir d'un prompt ou d'une image.

## Démarrer l'interface

1. Installer Node.js 20 ou supérieur.
2. Lancer `npm install`.
3. Lancer `npm run dev`.
4. Ouvrir l'adresse locale affichée par Vite.

## État réel du projet

- **Disponible :** interface responsive, modes texte/image, aperçu de l'image importée, durée 5/10 secondes, formats 16:9, 9:16 et 1:1.
- **Ajouté sur la branche `codex/supabase-foundation` :** première migration Supabase pour les tâches vidéo, règles Row Level Security et stockage privé des images et vidéos.
- **Pas encore opérationnel :** connexion de l'interface à Supabase, inscription/connexion, dépôt des fichiers depuis l'application, génération vidéo réelle, historique utilisateur, téléchargement et déploiement public.

Aucune génération vidéo ne doit être annoncée comme réussie tant qu'un fournisseur n'a pas réellement produit le fichier vidéo et que celui-ci n'a pas été enregistré.

## Fondation Supabase

Consulter [le guide de configuration Supabase](docs/SUPABASE_SETUP.md).

Les variables navigateur autorisées sont `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`. Ne jamais placer une clé `service_role` ou une clé de fournisseur vidéo dans une variable `VITE_` ou dans le dépôt.

## Prochaines étapes

1. Connecter Supabase Auth à l'interface.
2. Tester l'application des migrations et les règles d'accès avec deux comptes distincts.
3. Ajouter un endpoint serveur authentifié pour créer et suivre les tâches.
4. Choisir un fournisseur vidéo compatible avec le budget avant d'intégrer son API.
5. Ajouter l'historique, les téléchargements, les tests et le déploiement.

Le moteur vidéo n'est pas encore connecté. Les coûts et limites du fournisseur devront être vérifiés avant tout lancement.
