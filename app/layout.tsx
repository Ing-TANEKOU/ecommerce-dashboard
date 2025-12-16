import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'E-commerce Dashboard',
  description: 'Gestion produits et commandes',
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