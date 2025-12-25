# E-commerce Dashboard

Plateforme de gestion e-commerce construite avec Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma, NextAuth et Stripe.

## Fonctionnalités

- ✅ Authentification Google (NextAuth)
- ✅ CRUD produits complet
- ✅ Gestion commandes
- ✅ Paiements Stripe (mode test)
- ✅ Dashboard analytics
- ✅ Gestion utilisateurs
- ✅ Base de données SQLite (Prisma ORM)
- ✅ API REST sécurisée
- ✅ SEO optimisé
- ✅ Tests Jest

## Stack Technique

- **Framework**: Next.js 15.1 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **Database**: SQLite (Prisma 6.8)
- **Auth**: NextAuth 5.0
- **Paiements**: Stripe 20.0
- **Validation**: Zod 4.2
- **Tests**: Jest 29.7
- **Déploiement**: Vercel

## Installation
```bash
# Cloner le dépôt
git clone https://github.com/votre-username/ecommerce-dashboard.git
cd ecommerce-dashboard

# Installer dépendances
npm install

# Configurer variables d'environnement
cp .env.example .env
# Remplir .env avec vos clés

# Créer base de données
npx prisma migrate dev

# Peupler données de test
npm run seed

# Lancer serveur dev
npm run dev
```

## Variables d'environnement requises
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="votre-secret-32-chars"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="votre-google-client-id"
GOOGLE_CLIENT_SECRET="votre-google-secret"
STRIPE_SECRET_KEY="sk_test_votre_cle"
STRIPE_PUBLISHABLE_KEY="pk_test_votre_cle"
STRIPE_WEBHOOK_SECRET="whsec_votre_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_votre_cle"
```

## Scripts
```bash
npm run dev          # Serveur développement
npm run build        # Build production
npm run start        # Serveur production
npm test             # Tests Jest
npm run seed         # Peupler base de données
npx prisma studio    # Interface admin base de données
```

## Structure du projet
```
├── app/
│   ├── api/              # API Routes
│   ├── dashboard/        # Pages dashboard
│   ├── login/            # Page connexion
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── components/           # Composants React
├── lib/                  # Utilitaires
├── prisma/
│   ├── schema.prisma     # Schéma base de données
│   └── seed.ts           # Données de test
├── __tests__/            # Tests Jest
└── public/               # Assets statiques
```

## Auteur

Ing-TANEKOU - Formation Next.js 14-25 décembre 2025

## Licence

MIT