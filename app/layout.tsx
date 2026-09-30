import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { CallbackButton } from '@/components/ui/CallbackButton';
import { BackToTop } from '@/components/ui/BackToTop';
import { CookieNotice } from '@/components/ui/CookieNotice';
import { organizationSchema } from '@/lib/schemas';
import { SEO, SITE, CONTACTS, ANALYTICS } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google070df050800da1e0',
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — аренда строительной техники в Бресте`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: ['/images/og-image.webp'],
  },
  alternates: {
    canonical: SITE.url,
  },
  other: {
    'theme-color': '#0A0A0A',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#F59E0B" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#F59E0B" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="geo.region" content="BY-BR" />
        <meta name="geo.placename" content="Брест" />
        <meta name="geo.position" content={`${CONTACTS.lat};${CONTACTS.lng}`} />
        <meta name="ICBM" content={`${CONTACTS.lat}, ${CONTACTS.lng}`} />
        {ANALYTICS.plausibleDomain && (
          <script
            defer
            data-domain={ANALYTICS.plausibleDomain}
            src="https://plausible.io"
          />
        )}
      </head>
      <body>
        {/* 
          Код Google Рекламы (gtag.js). 
          Используем next/script с правильной ссылкой и dangerouslySetInnerHTML.
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18480325741"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18480325741');
            `,
          }}
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                     focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:rounded-lg
                     focus:font-semibold focus:text-sm"
        >
          Перейти к основному содержимому
        </a>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main id="main-content" className="pt-16 sm:pt-20">{children}</main>
          <Footer />
          <CallbackButton />
          <BackToTop />
          <CookieNotice />
        </ThemeProvider>

        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}