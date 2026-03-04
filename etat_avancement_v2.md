# État d'Avancement V2 (Rapport d'Ingénierie)
**Projet :** PFE Hub BTS  
**Date :** 26 Février 2026

## 1. État Technique Actuel
Le projet est passé en phase Full-Stack. L'interaction entre React et PHP est le cœur de notre travail actuel.

## 2. Tableaux de la Base de Données
Nous avons implémenté les 5 tables fondamentales :
1. **utilisateurs** : Gestion des profils (étudiant, encadrant, admin).
2. **projets** : Gestion des titres et filières.
3. **stages** : Localisation et durée en entreprise.
4. **rapports** : Suivi des fichiers PDF déposés.
5. **suivis** : Table centrale pour les commentaires et validations du professeur.

## 3. Preuve de Fonctionnement
Le système communique déjà avec MySQL. L'utilisateur suivant est déjà enregistré et fonctionnel dans la base :
- **ID 1** : youssef aotari (Rôle : Étudiant)

## 4. Défis pour le Professeur
- **Asynchronisme** : Difficulté de synchroniser les états React avec les réponses JSON du PHP.
- **Suivi Prof en temps réel** : Comment informer le professeur sans saturer l'API ? (Question ouverte pour avis).
- **Admin** : Scripts de modération en attente de finalisation.
