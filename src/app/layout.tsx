import type { Metadata, Viewport } from 'next';

import { Provider } from '@/components/ui/provider';
import { Layout } from '@/lib/layout';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'namiki-packing-display';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | namiki-packing-display' },
  description: 'Next.js + chakra-ui + TypeScript template',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://namiki-packing-display.sznm.dev',
    title: 'namiki-packing-display',
    // description: 'Next.js + chakra-ui + TypeScript template',
    description: '単一コンテナ積み付け問題 - 作業支援 (Namiki)',
    images: {
      url: 'https://og-image.sznm.dev/**namiki-packing-display**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'namiki-packing-display.sznm.dev og-image',
    },
  },
  twitter: {
    creator: '@agstnsnathaniel',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
