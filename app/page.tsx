import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HeroVideo } from '@/components/hero/HeroVideo';
import { HeroOverlay } from '@/components/hero/HeroOverlay';
import { EquipmentSection } from '@/components/sections/EquipmentSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { HowWeWorkSection } from '@/components/sections/HowWeWorkSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { CTAFormSection } from '@/components/sections/CTAFormSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { localBusinessSchema, faqPageSchema } from '@/lib/schemas';
import { FAQ_ITEMS } from '@/lib/faq';
import { SEO, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: SEO.defaultTitle,
  description: SEO.defaultDescription,
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: SITE.url,
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: LocalBusiness + FAQPage */}
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />

      {/* Hero — полный экран с фоновым видео.
          -mt-16/-mt-20 компенсирует pt main, чтобы видео уходило под прозрачный header */}
      <section
        className="relative -mt-16 sm:-mt-20 h-[100svh] min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden"
        aria-label="Главный баннер"
      >
        <HeroVideo
          posterSrc="/images/hero-poster.webp"
          webmSrc="/videos/hero-bg.webm"
          mp4Src="/videos/hero-bg.mp4"
        />
        <HeroOverlay />
      </section>

      {/* Секция техники */}
      <EquipmentSection />

      {/* Секция услуг */}
      <ServicesSection />

      {/* Почему мы */}
      <WhyUsSection />

      {/* Как мы работаем */}
      <HowWeWorkSection />

      {/* Отзывы */}
      <Suspense fallback={null}>
        <ReviewsSection />
      </Suspense>

      {/* CTA-форма */}
      <CTAFormSection />

      {/* FAQ */}
      <FAQSection />
    </>
  );
}
