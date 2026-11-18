# Analyse du projet saas-formation

Les schémas sont dans [architecture.drawio](architecture.drawio). Ouvrez-le avec l'extension VS Code « Draw.io Integration » (hediet.vscode-drawio), draw.io Desktop ou https://app.diagrams.net. Le fichier contient 5 pages :

| Page | Contenu |
|------|---------|
| 1. Architecture actuelle | Modules de la SPA, store Vuex, localStorage, services externes |
| 2. Modèle de données | Entités statiques (cours, modules, leçons, quiz) et dynamiques (inscriptions, certificats) |
| 3. Parcours actuel & défauts | Parcours de l'apprenant tel que codé, avec les défauts B1 à B7 |
| 4. Architecture cible | Proposition front / API / base de données / services tiers |
| 5. Flux quiz & certificat cible | Règles de validation et d'émission corrigées |

## État actuel

- Vue 3 + TypeScript (Vue CLI 5), vue-router 4, Vuex 4, PWA.
- 10 routes, 9 vues, 7 composants, environ 13 400 lignes.
- Catalogue statique dans `src/data/courses.ts` (6 formations).
- Aucun backend : l'utilisateur est un compte de démonstration codé en dur, et la progression comme les certificats sont stockés dans `localStorage` (clé `debugger_saas_v1`).

## Défauts repérés

| # | Défaut | Où |
|---|--------|----|
| B1 | Aucun seuil de réussite : un quiz à 0 % est validé et affiche « Validation réussie » | `QuizModal.vue` → `submitQuiz()` |
| B2 | Certificat émis dès le premier quiz, même si le cours n'est pas terminé ; score forcé à 90 % minimum ; ID aléatoire entre 1000 et 9999, donc collisions possibles | `store/index.ts` → `PASS_QUIZ` |
| B3 | `requiredTier` n'est jamais lu : le volume horaire choisi ne change pas les modules accessibles | `courses.ts`, `DurationSlider.vue` |
| B4 | `/learn/:id` est accessible sans inscription ; les mutations créent l'inscription à la volée | `router/index.ts`, `store/index.ts` |
| B5 | Un certificat n'existe que dans le navigateur de l'étudiant : un tiers ne peut pas le vérifier | `CertificateView.vue` |
| B6 | La création d'une inscription est copiée dans 3 mutations | `store/index.ts` |
| B7 | Le paiement, le formulaire B2B (`alert()`) et le choix de langue n'ont aucun effet | `PlansView`, `BusinessView`, `AppNavbar` |

Autres points :
- Les bonnes réponses des quiz (`correctAnswer`) sont livrées au navigateur.
- Toutes les vues sont importées d'un bloc (pas de lazy-loading).
- Aucun test et aucun lint dans `package.json`.

## Plan d'amélioration

**Corrections rapides (front seul)**
1. Exiger un score minimum (par exemple 70 %) dans `submitQuiz()` et afficher un écran d'échec.
2. N'émettre le certificat que lorsque tous les modules du palier choisi sont validés, avec le score réel.
3. Appliquer `requiredTier` pour verrouiller les modules au-delà du palier choisi.
4. Ajouter une garde de route qui renvoie vers la fiche du cours si l'utilisateur n'est pas inscrit.
5. Regrouper la création d'inscription dans une seule fonction et charger les vues en lazy-loading.

**Backend (pages 4 et 5)**
6. Créer une API avec authentification, une base PostgreSQL, la correction des quiz côté serveur et des certificats signés vérifiables publiquement.
7. Brancher Stripe sur `/plans`, enregistrer les demandes B2B et ajouter vue-i18n.
