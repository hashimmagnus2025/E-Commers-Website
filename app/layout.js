import './globals.css';
import { SiteShell } from '../components/SiteShell';

export const metadata = {
  metadataBase: new URL('https://veloce.example'),
  title: { default: 'Veloce — Contemporary Fashion Designed for Movement', template: '%s — Veloce' },
  description: 'Discover Veloce, a contemporary fashion label creating refined essentials, modern silhouettes and timeless pieces.',
  openGraph: { title: 'Veloce — Designed for the ones who move', description: 'Refined essentials for modern movement.', type: 'website' },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
