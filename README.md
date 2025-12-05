# Unity Care Clinic – Backend (PHP 8.5 / MySQLi)

## 📌 Description du Projet
Le projet consiste à développer la première version du backend de la plateforme **Unity Care Clinic**, en utilisant **PHP 8.5 procédural** et **MySQLi**.  
L’objectif est de permettre la gestion des patients, médecins, départements ainsi que l'affichage de statistiques via un tableau de bord dynamique.

Ce backend repose sur une architecture simple, facile à comprendre et à maintenir.

---

## 🚀 Fonctionnalités Principales

### 1. Gestion des Entités (CRUD)
- Patients  
- Départements  
- Médecins  
- Association Médecin ↔ Département

### 2. Tableau de Bord & Statistiques
- Indicateurs clés (patients, médecins, départements…)  
- Graphiques via **Chart.js**  
- Données dynamiques

### 3. Internationalisation (i18n)
- Fichiers de langues : `fr.php`, `en.php`, etc.  
- Changement de langue depuis le tableau de bord

### 4. Documentation
- Scripts commentés  
- README explicatif  
- Structure du projet

### 5. Load an UI
- AJAX (actions sans rechargement)  
- Modals interactifs  
- Graphiques avancés  

---

## 📋 User Stories

- **US01** – Gestion des Patients (CRUD)  
- **US02** – Gestion des Départements  
- **US03** – Gestion des Médecins  
- **US04** – Statistiques dynamiques (Dashboard)  
- **US05** – Internationalisation  
- **US06** – Navigation fluide via AJAX  

---

## 🏗️ Structure du Projet 
 
```
/Hospital Management
│
├── Back-End/
│   ├── config/
│   │   └── config_db.php
│   │
│   └── managment/
│       ├── dashboard.php
│       ├── departements.php
│       ├── doctors.php
│       └── patients.php
│
├── SQL/
│   └── database.sql
│
├── Front-End/
│   ├── CSS/
│   │   └── style.css
│   │
│   ├── UI/
│   │   └── formValidation.js
│   │
│   ├── index.html
│   └── index.php
│
├── tailwind.config.js
└── README.md
|__ .gitignore
```
## 📦 Installation

### 1. Cloner le projet
```bash
git clone <repo-url>
cd Hospital_Management_dashboard
