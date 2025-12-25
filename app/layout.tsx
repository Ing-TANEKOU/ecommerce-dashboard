import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'E-commerce Dashboard',
    template: '%s | E-commerce Dashboard',
  },
  description: 'Plateforme de gestion e-commerce complète avec Next.js 15',
  keywords: ['e-commerce', 'dashboard', 'Next.js', 'React', 'gestion produits'],
  authors: [{ name: 'Votre Nom' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-url.vercel.app',
    title: 'E-commerce Dashboard',
    description: 'Gestion e-commerce moderne',
    siteName: 'E-commerce Dashboard',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce Dashboard',
    description: 'Gestion e-commerce moderne',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}