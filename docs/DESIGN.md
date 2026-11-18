# Design system « Clay »

Le style est du claymorphism : des éléments en relief doux, avec des bords blancs épais, de grands arrondis, des doubles ombres (extérieure et intérieure) et des fonds pastel. Il a été choisi avec la skill UI/UX Pro Max (profil « Online Course / E-learning »).

Toutes les variables sont dans [src/assets/styles/main.scss](../src/assets/styles/main.scss).

## Couleurs

| Rôle | Variable | Valeur | Usage |
|------|----------|--------|-------|
| Marque | `--color-primary` | `#14b8a6` | Fonds de boutons, jauges, puces actives (texte `--color-on-primary` dessus) |
| Texte vert | `--color-primary-ink` | `#0f766e` | Liens et textes verts sur fond clair (5,3:1) |
| Réussite | `--color-achievement` | `#fb923c` | Bouton `.btn-accent`, badges de mise en avant |
| Texte | `--color-text` / `-secondary` / `-muted` | `#134e4a` / `#3f5f5c` / `#56716e` | Tous au-dessus de 4,5:1 |
| Fond | `--color-bg` | `#f0fdfa` | Avec des halos pastel fixes |
| Pastels | `--pastel-mint`, `-sky`, `-lilac`, `-peach`, `-butter` | — | Fonds des icônes et des pastilles |

Dans une zone sombre (footer, bandeaux de la fiche cours et du tableau de bord), on redéfinit localement `--color-primary` et `--color-primary-ink` en `#5eead4`. Si une carte blanche est posée dans une zone sombre, elle doit remettre les valeurs claires (voir `.pricing-floating-card`).

## Formes et ombres

- **Arrondis** : `--radius-sm` 10px, `-md` 16px, `-lg` 24px, `-xl` 32px.
- **Carte clay** : `border: 3px solid rgba(255,255,255,.95)` et `box-shadow: var(--shadow-md)`. La classe `.clay` fait les deux.
- **Zone en creux** (champs, tuiles intérieures) : `box-shadow: var(--shadow-pressed)` sur `--color-surface-3`. La classe `.clay-input` l'applique aux champs de formulaire.
- **Ombres en relief** : `--shadow-sm` → `--shadow-xl`, toutes avec un reflet intérieur (`--clay-inner`).

## Typographie

- **Titres** : Nunito, graisses 800 et 900.
- **Texte** : DM Sans.
- **Code** : JetBrains Mono.

## Mouvement

- **Survol** : les cartes montent avec `--ease-bounce`.
- **Clic** : les boutons s'enfoncent légèrement.
- **Accessibilité** : toutes les animations sont coupées si l'option système « réduire les animations » est active.

## Icônes

- **Grandes icônes** : 3D, via le composant [Icon3d](../src/components/ui/Icon3d.vue). Les images sont dans `public/img/3d/` et viennent de 3dicons.co (licence CC0). Elles s'affichent sur un fond pastel clair, car elles utilisent `mix-blend-mode: multiply`.
- **Petites icônes** (coches, flèches) : vectorielles, via `AppIcon`.

## Ajouter une page

1. Rendre l'en-tête transparent pour laisser voir le fond pastel.
2. Donner aux cartes un bord blanc épais et une ombre clay.
3. Placer les grandes icônes dans une boîte pastel de 60 à 72 px.
4. Vérifier le contraste de chaque texte (au moins 4,5:1).
