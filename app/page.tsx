import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
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
    images: [{ url: '/images/equipment/xcmg-xe35u/og.webp', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <main>
      {/* JSON-LD: LocalBusiness + FAQPage */}
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />

      <HeroSection />

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
    </main>
  );
}
