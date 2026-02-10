# Gestion des Formations - Dashboard Angular

## Description

Cette application web permet la gestion de formations et d'utilisateurs avec Angular.  
Elle offre différentes fonctionnalités selon le type d'utilisateur : non connecté, connecté ou administrateur.  
Le backend est simulé via une API REST sur un fichier JSON.

---

## Fonctionnalités

### Pour un utilisateur non connecté

- Créer un compte
- Ajouter des formations dans un panier

### Pour un utilisateur connecté

- Finaliser son panier et passer une commande
- Afficher ses commandes
- Se déconnecter

### Pour l'administrateur

- Afficher toutes les formations
- Ajouter une nouvelle formation
- Modifier les informations d'une formation
- Supprimer une formation
- Afficher la liste des utilisateurs
- Supprimer des utilisateurs

---

## Bonnes pratiques mises en place

- **Authentification et guards** : Les routes et fonctionnalités sont protégées selon le rôle de l'utilisateur (USER / ADMIN).
- **Protection du mot de passe** : Le mot de passe est crypté lors de la création d'un nouvel utilisateur.
- **Formulaires réactifs** : Tous les formulaires utilisent `ReactiveFormsModule` avec vérification des champs (`Validators`) pour sécuriser la saisie.
- **Gestion du panier** : Le service `CartService` maintient l'état du panier et les signaux Angular permettent une mise à jour automatique de l'affichage.
- **CRUD avec l'API** : Les services `ApiUserService` et `ApiTrainingService` communiquent avec le backend JSON pour récupérer, ajouter, modifier et supprimer des données.
- **Mises à jour en temps réel** : Les modifications de formations ou de commandes sont reflétées immédiatement dans l'interface grâce à la détection de changements (`ChangeDetectorRef`) et aux signaux Angular.

---

## Installation

1. **Cloner le projet**

```bash
git clone https://github.com/AmandineGrardLaurent/trainings-front-app.git
cd trainings-front-app
git pull origin angular_avanced
```

2. **Installer les dépendances**

```bash
npm i
```

3. **Lancer le back-end JSON**

```bash
npx json-server --watch db.json --port 3000
```

3. **Lancer l'application Angular**

```bash
ng serve
```

L'application sera disponible sur http://localhost:4200

---

## Utilisation

- Créez un compte ou connectez-vous si vous êtes déjà inscrit.

- Parcourez les formations et ajoutez-les au panier.

- Finalisez le panier pour créer une commande.

- En tant qu'administrateur, accédez au dashboard pour gérer les formations et les utilisateurs (email: test@gmail.com, mdp: Coucou1234\*)
