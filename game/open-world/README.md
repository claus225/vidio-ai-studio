# NEON RUSH — prototype monde ouvert

Cette branche ajoute un prototype séparé de monde ouvert 3D, sans modifier le runner existant `game/index.html`.

## État
- Petite ville 3D générée côté navigateur (routes, bâtiments et éclairage néon).
- Déplacement à pied avec clavier et boutons tactiles.
- Véhicule conduisible à proximité (E / bouton mobile).
- Caméra de suivi et limites de zone.
- Three.js 0.181.1 chargé depuis jsDelivr.

## Commandes
- PC : WASD ou flèches.
- Entrer / sortir du véhicule : E.
- Android : boutons à l'écran, puis ENTRER.

## Limites connues
- Démonstrateur local côté navigateur : pas encore de missions, sauvegarde, collisions détaillées, personnages non-joueurs, compte, serveur ou multijoueur.
- Le rendu dépend du CDN Three.js et d'une connexion Internet.
- Les performances réelles doivent encore être vérifiées sur téléphone Android et ordinateur.
- Ce prototype est une implémentation originale inspirée du genre monde ouvert. Aucun code source de CruiseWay n'est copié dans ce dossier. CruiseWay a été étudié comme référence d'architecture et de fonctionnalités.

## Référence étudiée
- CruiseWay : https://github.com/Kaustubh-Negi-01/CruiseWay
- Licence consultée : MIT. Toute intégration future de son code devra conserver l'avis de copyright et le texte de licence dans les fichiers redistribués.
