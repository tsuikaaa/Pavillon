# Pavillon

Pavillon rassemble tous tes liens sur une seule page, avec une adresse unique à partager. Les liens peuvent être publics (visibles sur ta page) ou privés (réservés à toi, pour garder ceux dont tu ne sais pas encore quoi faire).

Projet réalisé dans le cadre du lab AdonisJS (BUT 3 MMI).

## Pourquoi « Pavillon » ?

Le nom vient de l'univers des "Carnets de l'apothicaire", qui m'a inspiré ce projet. Dans la série, chaque pavillon est un lieu à part, avec son identité et ses habitants. Dans l'appli, chaque page fonctionne pareil : un petit espace à soi, avec sa propre adresse, où on range nos liens.

J'ai beaucoup de liens de toutes sortes que je ne trie jamais. Je voulais un endroit où les poser sans avoir à décider tout de suite où ils vont. C'est pour ça que les liens peuvent être privés : ils servent à garder ceux que je ne sais pas encore classer, avant de les ranger dans une page ou de les partager.

## Fonctionnalités

- Inscription, connexion et déconnexion
- Dashboard avec résumé (nombre de pages et de liens, derniers liens)
- Création, modification et suppression de pages et de liens
- Liens publics ou privés
- Tri alphabétique des liens
- Page publique accessible sans compte (`/p/adresse`)
- Page 404 personnalisée
- Interface entièrement en français, thème rose à pois

## Technologies

- AdonisJS
- SQLite
- Edge (moteur de templates)
- Vite

## Installation

```bash
git clone https://github.com/tsuikaaa/Pavillon.git
cd Pavillon
npm install
cp .env.example .env
node ace generate:key
node ace migration:run
npm run dev
```

L'appli est ensuite disponible sur http://localhost:3333.

## Utilisation

1. Crée un compte, puis se connecter.
2. Crée une page depuis le dashboard.
3. Ajoute des liens et choisis s'ils sont publics ou privés.
4. Partage l'adresse `/p/adresse` : seuls les liens publics y apparaissent.