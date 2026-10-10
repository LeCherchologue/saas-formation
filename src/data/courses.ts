export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'exercise';
  content: string;
  keyTakeaways?: string[];
  resources?: Array<{ name: string; type: string; size: string }>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  durationHours: number;
  requiredTier: 'express' | 'standard' | 'advanced' | 'expert';
  lessons: Lesson[];
  quiz: {
    id: string;
    title: string;
    questions: QuizQuestion[];
  };
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  categoryLabel: string;
  badge?: string;
  level: 'Débutant' | 'Intermédiaire' | 'Tous niveaux' | 'Avancé';
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  minHours: number;
  maxHours: number;
  defaultHours: number;
  accentColor: string;
  thumbnail: string;
  instructor: {
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
  skills: string[];
  benefits: string[];
  modules: CourseModule[];
}

export const CATEGORIES = [
  { id: 'all', label: 'Toutes les catégories', icon: 'sparkles' },
  { id: 'tech', label: 'Tech & Intelligence Artificielle', icon: 'bot' },
  { id: 'business', label: 'Management & Entrepreneuriat', icon: 'briefcase' },
  { id: 'design', label: 'Design UX/UI & Créativité', icon: 'palette' },
  { id: 'data', label: 'Data & Cybersécurité', icon: 'shield' },
  { id: 'health', label: 'Santé, Sport & Bien-être', icon: 'leaf' },
  { id: 'marketing', label: 'Marketing Digital & Growth', icon: 'trending-up' }
];

export const COURSES: Course[] = [
  {
    id: 'ai-prompt-engineering',
    slug: 'intelligence-artificielle-generative-prompting',
    title: 'Intelligence Artificielle Générative & Prompt Engineering Avancé',
    tagline: 'Maîtrisez les LLMs, l’automatisation de flux et la création d’agents autonomes pour décupler votre productivité.',
    description: 'Une formation complète conçue pour transformer la façon dont vous travaillez avec l’IA. De la formulation de prompts précis à l’orchestration de pipelines avec OpenAI, Anthropic et Google Gemini, apprenez à automatiser des tâches complexes et à intégrer l’intelligence artificielle dans votre quotidien professionnel.',
    category: 'tech',
    categoryLabel: 'Tech & IA',
    badge: 'Populaire & N°1',
    level: 'Tous niveaux',
    rating: 4.94,
    reviewsCount: 3820,
    enrolledCount: 24500,
    minHours: 4,
    maxHours: 120,
    defaultHours: 25,
    accentColor: '#2438f5',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Dr. Sarah Kerdranvat',
      title: 'Lead Research Scientist & Consultante IA',
      company: 'Ex-DeepMind Fellow',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    skills: ['Prompt Engineering', 'LLM Architectures', 'RAG (Retrieval Augmented Generation)', 'Agents Autonomes', 'Éthique & Sécurité IA'],
    benefits: [
      'Accès illimité à la bibliothèque de prompts d’élite',
      'Certificat reconnu en entreprise avec volume horaire paramétrable',
      'Cas pratiques réels basés sur les derniers modèles',
      'Support pédagogique et communauté d’apprenants active'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1 : Fondations des modèles de langage & architectures de prompt',
        durationHours: 4,
        requiredTier: 'express',
        lessons: [
          {
            id: 'l1-1',
            title: 'Anatomie des modèles de langage : tokens, contexte et température',
            duration: '25 min',
            type: 'video',
            content: `Les modèles de fondation (LLMs) ont bouleversé le paysage technologique mondial. Dans cette leçon inaugurale, nous démystifions leur fonctionnement interne :\n\n1. **La tokenisation** : comment le modèle découpe les mots en sous-unités numériques.\n2. **La fenêtre de contexte** : gérer la mémoire immédiate du modèle et éviter les pertes d'attention.\n3. **L'échantillonnage stochastique** : comprendre l'impact des hyperparamètres comme la température (créativité vs déterminisme) et le top-p.`,
            keyTakeaways: [
              'Un token équivaut en moyenne à 0,75 mot en français/anglais.',
              'Une température basse (0.1 - 0.3) garantit la cohérence factuelle pour le code et les résumés.',
              'Le prompting moderne repose sur des instructions structurées avec délimiteurs clairs.'
            ],
            resources: [
              { name: 'Cheatsheet_LLM_Architecture.pdf', type: 'PDF', size: '1.8 Mo' },
              { name: 'Guide_Optimisation_Temperature.pdf', type: 'PDF', size: '950 Ko' }
            ]
          },
          {
            id: 'l1-2',
            title: 'Les 6 principes du Few-Shot & Zero-Shot Prompting',
            duration: '35 min',
            type: 'article',
            content: `Apprenez à guider un modèle avec une précision chirurgicale sans avoir à le réentraîner. Le Few-Shot prompting consiste à fournir des exemples annotés (entrées/sorties attendues) dans le corps du prompt afin de conditionner la distribution des probabilités.\n\nNous explorerons également la décomposition d'objectifs, l'assignation de rôles (persona framing) et l'application de contraintes négatives strictes.`,
            keyTakeaways: [
              'Toujours préciser le persona, le contexte, la tâche, le format de sortie et les contraintes.',
              'Le Few-Shot élimine 80% des hallucinations sur les tâches de classification et d\'extraction de données.'
            ]
          }
        ],
        quiz: {
          id: 'q1',
          title: 'Quiz de validation : Fondations & Prompting',
          questions: [
            {
              id: 'q1-1',
              question: 'Quel paramètre contrôle le degré de créativité ou d\'aléa dans la génération d\'un LLM ?',
              options: ['Le Top-K uniquement', 'La Température', 'La taille du contexte', 'Le nombre de couches'],
              correctAnswer: 1,
              explanation: 'La température module la distribution de probabilité des tokens suivants : plus elle est basse, plus le choix est prévisible et déterministe.'
            },
            {
              id: 'q1-2',
              question: 'Qu\'est-ce que le "Few-Shot Prompting" ?',
              options: [
                'Prendre des photos du modèle',
                'Fournir des exemples de questions/réponses directement dans le prompt',
                'Réentraîner tous les poids du réseau de neurones',
                'Utiliser un prompt de moins de 10 mots'
              ],
              correctAnswer: 1,
              explanation: 'Le Few-Shot consiste à fournir quelques exemples de démonstration au modèle pour lui indiquer le style et le format attendus.'
            }
          ]
        }
      },
      {
        id: 'm2',
        title: 'Module 2 : Chain-of-Thought, Raisonnement & Réduction des Hallucinations',
        durationHours: 12,
        requiredTier: 'standard',
        lessons: [
          {
            id: 'l2-1',
            title: 'Technique de la chaîne de pensée (Chain-of-Thought Prompting)',
            duration: '40 min',
            type: 'video',
            content: `Le Chain-of-Thought (CoT) force le modèle à générer des étapes intermédiaires de raisonnement avant de fournir sa conclusion définitive. Cette technique augmente radicalement le taux de réussite sur les problèmes logiques, mathématiques et stratégiques.`,
            keyTakeaways: [
              'Inciter le modèle avec "Pensons pas à pas" ou en structurant les balises <thinking>...</thinking>.',
              'Permet d\'auditer la logique interne du modèle avant d\'exécuter une action irréversible.'
            ]
          },
          {
            id: 'l2-2',
            title: 'Méthodes de self-consistency et vérification croisée',
            duration: '30 min',
            type: 'exercise',
            content: `Atelier pratique : Écrire un pipeline qui interroge trois modèles en parallèle, compare leurs sorties et isole les contradictions logiques pour garantir une fiabilité maximale.`,
            keyTakeaways: [
              'La vérification croisée réduit considérablement les erreurs d\'inattention numérique.',
              'Idéal pour la validation de conformité juridique et de code critique.'
            ]
          }
        ],
        quiz: {
          id: 'q2',
          title: 'Quiz de validation : Raisonnement et Vérification',
          questions: [
            {
              id: 'q2-1',
              question: 'Pourquoi la technique du Chain-of-Thought est-elle si performante ?',
              options: [
                'Elle accélère le temps de réponse',
                'Elle alloue plus de tokens de calcul pour structurer le raisonnement étape par étape',
                'Elle réduit la facture d\'API',
                'Elle supprime le besoin d\'un prompt'
              ],
              correctAnswer: 1,
              explanation: 'Chaque token généré participe à l\'attention des tokens suivants, permettant une réflexion articulée étape par étape.'
            }
          ]
        }
      },
      {
        id: 'm3',
        title: 'Module 3 : RAG (Retrieval-Augmented Generation) & Bases Vectorielles',
        durationHours: 25,
        requiredTier: 'advanced',
        lessons: [
          {
            id: 'l3-1',
            title: 'Principes des Embeddings et de la recherche sémantique',
            duration: '45 min',
            type: 'video',
            content: `Comment connecter un LLM à vos propres documents privés (PDFs d'entreprise, bases Notion, tickets Jira) sans aucun risque de fuite de données ? Nous étudions les embeddings vectoriels, la similarité cosinus et les bases de données vectorielles (Pinecone, Chroma, pgvector).`,
            keyTakeaways: [
              'Les embeddings convertissent des textes en vecteurs multidimensionnels représentant le sens sémantique.',
              'Le chunking (découpage) est l\'étape la plus cruciale pour la pertinence de la recherche.'
            ]
          }
        ],
        quiz: {
          id: 'q3',
          title: 'Quiz RAG & Embeddings',
          questions: [
            {
              id: 'q3-1',
              question: 'Dans un système RAG, à quoi sert la base vectorielle ?',
              options: [
                'À entraîner un nouveau modèle propriétaire',
                'À retrouver les passages documentaires les plus pertinents par proximité sémantique',
                'À traduire le prompt en langage binaire',
                'À stocker les mots de passe des utilisateurs'
              ],
              correctAnswer: 1,
              explanation: 'La base vectorielle permet de localiser instantanément les fragments de textes sémantiquement proches de la question posée.'
            }
          ]
        }
      },
      {
        id: 'm4',
        title: 'Module 4 : Conception d’Agents Autonomes & Orchestration Multi-Outils',
        durationHours: 40,
        requiredTier: 'expert',
        lessons: [
          {
            id: 'l4-1',
            title: 'Boucle ReAct : Reasoning and Acting pour agents autonomes',
            duration: '50 min',
            type: 'video',
            content: `Concevoir un agent capable d'utiliser un navigateur web, de lancer des commandes bash, d'interroger des APIs tierces et de s'auto-corriger en cas d'erreur.`,
            keyTakeaways: [
              'L\'architecture ReAct alterne Pensée (Thought), Action (Action) et Observation (Observation).',
              'Mise en place de garde-fous stricts (human-in-the-loop) pour les actions sensibles.'
            ]
          }
        ],
        quiz: {
          id: 'q4',
          title: 'Quiz de certification finale : Agents Autonomes',
          questions: [
            {
              id: 'q4-1',
              question: 'Que signifie le pattern "ReAct" dans l\'univers des agents IA ?',
              options: [
                'React.js pour l\'interface utilisateur',
                'Reasoning and Acting (Raisonnement et Action)',
                'Reactive Auto-Correct Tool',
                'Redirection Action Callback'
              ],
              correctAnswer: 1,
              explanation: 'ReAct combine le raisonnement interne et l\'exécution d\'outils externes pour résoudre des tâches complexes.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'growth-marketing-saas',
    slug: 'growth-marketing-acquisition-saas',
    title: 'Growth Marketing & Acquisition Client B2B / B2C',
    tagline: 'Construisez un moteur d’acquisition prédictif, optimisez vos tunnels de conversion et dominez votre marché.',
    description: 'Une méthode pas-à-pas pour générer des leads qualifiés, construire des boucles de viralité et optimiser le coût d’acquisition (CAC) et la valeur vie client (LTV). Formation orientée ROI avec études de cas réels de startups à forte croissance.',
    category: 'marketing',
    categoryLabel: 'Marketing & Growth',
    badge: 'Best-Seller',
    level: 'Intermédiaire',
    rating: 4.88,
    reviewsCount: 2190,
    enrolledCount: 18200,
    minHours: 4,
    maxHours: 90,
    defaultHours: 20,
    accentColor: '#ff3385',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Alexandre Meyer',
      title: 'VP Growth & Serial Angel Investor',
      company: 'Ex-Qonto & Spendesk Advisor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    skills: ['Funnel AARRR', 'SEO Technique', 'LinkedIn Cold Outreach', 'Paid Ads Scalables', 'Tracking & Attributions'],
    benefits: [
      'Modèles de tableaux de bord Notion & Google Sheets prêts à l’emploi',
      'Calculateur interactif de CAC et LTV',
      'Certificat d’aptitude reconnu en agence et startup',
      'Accompagnement sur vos propres cas de conversion'
    ],
    modules: [
      {
        id: 'gm-m1',
        title: 'Module 1 : Le Framework AARRR revisité et la stratégie de positionnement',
        durationHours: 4,
        requiredTier: 'express',
        lessons: [
          {
            id: 'gm-l1-1',
            title: 'Identifier son Product-Market Fit et son ICP (Ideal Customer Profile)',
            duration: '30 min',
            type: 'video',
            content: `Avant d'investir un seul euro en acquisition publicitaire, la validation de votre proposition de valeur et de votre persona prioritaire est indispensable.`,
            keyTakeaways: [
              'Un bon ICP inclut les déclencheurs d\'achat (triggers) et non seulement des critères démographiques.',
              'La rétention est le meilleur indicateur de la santé de votre offre.'
            ]
          }
        ],
        quiz: {
          id: 'gm-q1',
          title: 'Quiz : Stratégie de Croissance',
          questions: [
            {
              id: 'gm-q1-1',
              question: 'Dans le framework AARRR, quelle étape est la base absolue avant d\'accélérer l\'Acquisition ?',
              options: ['Le Revenu', 'La Rétention', 'Le Referral', 'La Publicité'],
              correctAnswer: 1,
              explanation: 'Sans une forte rétention (panier percé), tout investissement en acquisition est gaspillé.'
            }
          ]
        }
      },
      {
        id: 'gm-m2',
        title: 'Module 2 : Cold Emailing B2B haute délivrabilité & Prospection automatisée',
        durationHours: 16,
        requiredTier: 'standard',
        lessons: [
          {
            id: 'gm-l2-1',
            title: 'Configuration technique DNS (SPF, DKIM, DMARC) et chauffe de domaines',
            duration: '45 min',
            type: 'article',
            content: `Guide complet pour garantir 98%+ de taux de livraison en boîte principale et éviter les filtres anti-spam.`,
            keyTakeaways: [
              'Ne jamais utiliser son domaine principal pour de la prospection à froid de masse.',
              'Limiter l\'envoi à 40 emails par jour par boîte aux lettres.'
            ]
          }
        ],
        quiz: {
          id: 'gm-q2',
          title: 'Quiz Délivrabilité',
          questions: [
            {
              id: 'gm-q2-1',
              question: 'Quel enregistrement DNS permet d\'authentifier la clé cryptographique d\'un email expéditeur ?',
              options: ['DKIM', 'CNAME', 'TXT Google', 'A Record'],
              correctAnswer: 0,
              explanation: 'DKIM (DomainKeys Identified Mail) signe numériquement vos messages pour prouver leur authenticité.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'cybersecurity-essentials',
    slug: 'cybersecurite-defense-audit-systemes',
    title: 'Cybersécurité Opérationnelle & Défense des Systèmes',
    tagline: 'Protégez les infrastructures numériques contre les menaces modernes, rançongiciels et fuites de données.',
    description: 'Une formation pratique pour comprendre les vulnérabilités courantes (OWASP Top 10), configurer une politique de sécurité robuste (Zero Trust), réaliser des audits de sécurité et réagir efficacement aux incidents de piratage.',
    category: 'data',
    categoryLabel: 'Data & Sécurité',
    badge: 'Haute Demande',
    level: 'Intermédiaire',
    rating: 4.91,
    reviewsCount: 1640,
    enrolledCount: 11200,
    minHours: 4,
    maxHours: 100,
    defaultHours: 30,
    accentColor: '#00d632',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Maxime Blanchard',
      title: 'Ethical Hacker & Consultant SSI Certifié CISSP',
      company: 'CyberSec Shield Agency',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    skills: ['OWASP Top 10', 'Architecture Zero Trust', 'Cryptographie appliquée', 'Gestion des incidents & Forensics'],
    benefits: [
      'Laboratoires virtuels de tests d’intrusion éthiques',
      'Certificat technique aux normes de conformité européennes (RGPD / NIS 2)',
      'Checklists complètes d’audit de sécurité'
    ],
    modules: [
      {
        id: 'cs-m1',
        title: 'Module 1 : Principes fondamentaux et vecteurs d\'attaque critiques',
        durationHours: 4,
        requiredTier: 'express',
        lessons: [
          {
            id: 'cs-l1-1',
            title: 'La triade CIA (Confidentialité, Intégrité, Disponibilité) et la surface d\'attaque',
            duration: '25 min',
            type: 'video',
            content: `Comprendre les piliers fondamentaux de la sécurité informatique moderne et analyser les points d'entrée des attaquants.`,
            keyTakeaways: [
              'L\'ingénierie sociale (phishing) représente plus de 80% des brèches de sécurité initiales.',
              'L\'authentification multifacteur (MFA) par clé physique ou TOTP est non négociable.'
            ]
          }
        ],
        quiz: {
          id: 'cs-q1',
          title: 'Quiz Cybersécurité : Fondations',
          questions: [
            {
              id: 'cs-q1-1',
              question: 'Que signifie la triade CIA en cybersécurité ?',
              options: [
                'Central Intelligence Agency',
                'Confidentialité, Intégrité, Disponibilité',
                'Chiffrement, Identification, Authentification',
                'Contrôle, Inspection, Audit'
              ],
              correctAnswer: 1,
              explanation: 'La Confidentialité, l\'Intégrité et la Disponibilité sont les 3 piliers de la protection des données.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'product-design-ux-ui',
    slug: 'product-design-ux-ui-figma-systemes',
    title: 'Product Design UX/UI & Design Systems sur Figma',
    tagline: 'Passez de l’idée à un produit numérique d’exception avec des méthodologies UX testées et des composants évolutifs.',
    description: 'Apprenez à mener des recherches utilisateurs approfondies, à concevoir des wireframes intuitifs et à créer des Design Systems complets avec variables, auto-layout et prototypes interactifs fidèles sur Figma.',
    category: 'design',
    categoryLabel: 'Design & Créativité',
    badge: 'Coup de Cœur',
    level: 'Tous niveaux',
    rating: 4.96,
    reviewsCount: 3100,
    enrolledCount: 19800,
    minHours: 4,
    maxHours: 80,
    defaultHours: 20,
    accentColor: '#fec901',
    thumbnail: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Camille Leroy',
      title: 'Principal Product Designer & Formatrice',
      company: 'DesignFlow Collective',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    skills: ['Figma Maîtrise', 'Design Systems & Tokens', 'User Research & Tests', 'Micro-interactions', 'Accessibilité WCAG'],
    benefits: [
      'Fichier Figma complet du Design System Debugger offert',
      'Méthode pas-à-pas de validation UX',
      'Certificat de compétences en Product Design'
    ],
    modules: [
      {
        id: 'pd-m1',
        title: 'Module 1 : Psychologie cognitive & Principes d\'ergonomie UI',
        durationHours: 4,
        requiredTier: 'express',
        lessons: [
          {
            id: 'pd-l1-1',
            title: 'Lois de Hick, Fitts et Jakob appliquées aux interfaces web',
            duration: '35 min',
            type: 'video',
            content: `Comment le cerveau humain traite l'information visuelle et comment orienter le regard de l'utilisateur avec fluidité.`,
            keyTakeaways: [
              'Loi de Hick : le temps nécessaire pour prendre une décision augmente avec le nombre d\'options.',
              'Hiérarchie visuelle stricte : taille, contraste, graisse et espacements.'
            ]
          }
        ],
        quiz: {
          id: 'pd-q1',
          title: 'Quiz UX/UI : Ergonomie et Lois',
          questions: [
            {
              id: 'pd-q1-1',
              question: 'Selon la loi de Fitts, comment rendre un bouton d\'action principal (CTA) plus facilement cliquable ?',
              options: [
                'Le rendre transparent',
                'Augmenter sa taille et réduire la distance que le curseur doit parcourir',
                'Le placer tout en bas de la page dans un sous-menu',
                'Changer sa couleur toutes les 5 secondes'
              ],
              correctAnswer: 1,
              explanation: 'La loi de Fitts stipule que le temps d\'atteinte d\'une cible dépend de sa taille et de la distance à parcourir.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'csr-sustainability',
    slug: 'rse-developpement-durable-bilan-carbone',
    title: 'Stratégie RSE, Décarbonation & Bilan Carbone d’Entreprise',
    tagline: 'Accompagnez la transition écologique des organisations et pilotez des démarches RSE à fort impact.',
    description: 'Une formation essentielle pour maîtriser la réglementation européenne (CSRD), réaliser un bilan carbone selon la méthode GHG Protocol et structurer une stratégie d’impact environnemental et social rentable et mesurable.',
    category: 'health',
    categoryLabel: 'RSE & Développement Durable',
    badge: 'Avenir & Impact',
    level: 'Débutant',
    rating: 4.89,
    reviewsCount: 940,
    enrolledCount: 7800,
    minHours: 4,
    maxHours: 60,
    defaultHours: 15,
    accentColor: '#00d632',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Antoine Dupuis',
      title: 'Directeur Transition Écologique',
      company: 'GreenImpact Advisory',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    skills: ['Bilan Carbone Scopes 1, 2, 3', 'Directive CSRD', 'Éco-conception', 'Gouvernance Responsable'],
    benefits: [
      'Gabarit certifié de calcul carbone Excel & Notion',
      'Cas pratiques d\'application en PME et grands groupes',
      'Certificat accrédité transition environnementale'
    ],
    modules: [
      {
        id: 'rse-m1',
        title: 'Module 1 : Enjeux climatiques et cartographie des émissions Scopes 1, 2 et 3',
        durationHours: 4,
        requiredTier: 'express',
        lessons: [
          {
            id: 'rse-l1-1',
            title: 'Comprendre les Scopes 1, 2 et 3 selon le GHG Protocol',
            duration: '30 min',
            type: 'video',
            content: `Détail précis des émissions directes et indirectes générées par une activité économique.`,
            keyTakeaways: [
              'Le Scope 3 (émissions indirectes amont/aval) représente souvent plus de 75% du bilan d\'une entreprise.',
              'La conformité CSRD impose désormais la double matérialité.'
            ]
          }
        ],
        quiz: {
          id: 'rse-q1',
          title: 'Quiz RSE & Décarbonation',
          questions: [
            {
              id: 'rse-q1-1',
              question: 'À quoi correspond le Scope 1 dans un bilan carbone ?',
              options: [
                'Aux trajets en avion des clients',
                'Aux émissions directes provenant des sources fixes ou mobiles de l\'entreprise (combustion sur site)',
                'À la facture d\'électricité des serveurs hébergés chez un tiers',
                'Au recyclage des déchets de bureau'
              ],
              correctAnswer: 1,
              explanation: 'Le Scope 1 mesure les émissions directes issues des équipements possédés ou contrôlés par l\'entreprise.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'management-leadership-hybride',
    slug: 'leadership-management-equipes-hybrides',
    title: 'Leadership Moderne & Management d’Équipes Hybrides',
    tagline: 'Fédérez vos collaborateurs, cultivez la confiance et améliorez la performance d’équipe en présentiel et à distance.',
    description: 'Développez les compétences managériales clés du 21e siècle : communication non-violente, feedback continu, gestion des conflits, pilotage par objectifs (OKRs) et création d’une culture d’autonomie stimulante.',
    category: 'business',
    categoryLabel: 'Business & Management',
    badge: 'Essentiel Carrière',
    level: 'Tous niveaux',
    rating: 4.93,
    reviewsCount: 2840,
    enrolledCount: 22100,
    minHours: 4,
    maxHours: 80,
    defaultHours: 20,
    accentColor: '#2438f5',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Émilie Vernier',
      title: 'Executive Coach & Auteure',
      company: 'Leadership Lab Paris',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    skills: ['Méthodologie OKRs', 'Psychological Safety', 'Feedback Constructif', 'Délégation Efficace'],
    benefits: [
      'Simulations de situations managériales complexes',
      'Guide pratique des entretiens 1-to-1 à fort impact',
      'Certificat de leadership managérial'
    ],
    modules: [
      {
        id: 'lead-m1',
        title: 'Module 1 : Sécurité psychologique et culture du feedback',
        durationHours: 4,
        requiredTier: 'express',
        lessons: [
          {
            id: 'lead-l1-1',
            title: 'La sécurité psychologique : le facteur n°1 de performance selon le projet Aristote de Google',
            duration: '25 min',
            type: 'video',
            content: `Comment créer un environnement d'équipe où chacun ose exprimer ses doutes, poser des questions et admettre ses erreurs sans crainte d'être pénalisé.`,
            keyTakeaways: [
              'La vulnérabilité du leader engendre la confiance de l\'équipe.',
              'Distinguer l\'erreur d\'expérimentation de la négligence délibérée.'
            ]
          }
        ],
        quiz: {
          id: 'lead-q1',
          title: 'Quiz Leadership & Confiance',
          questions: [
            {
              id: 'lead-q1-1',
              question: 'Quel est le facteur déterminant de la performance des équipes d\'élite selon les études managériales de Google ?',
              options: [
                'Le QI moyen des membres de l\'équipe',
                'La sécurité psychologique ressentie par les membres',
                'Le nombre d\'heures supplémentaires passées au bureau',
                'Le salaire individuel le plus élevé'
              ],
              correctAnswer: 1,
              explanation: 'La sécurité psychologique est la condition préalable indispensable à la collaboration créative et à la prise d\'initiative.'
            }
          ]
        }
      }
    ]
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find(c => c.slug === slug || c.id === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  if (!category || category === 'all') return COURSES;
  return COURSES.filter(c => c.category === category);
}
