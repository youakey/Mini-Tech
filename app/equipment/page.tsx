import type { Metadata } from 'next';
import { EquipmentSection } from '@/components/sections/EquipmentSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schemas';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Наша техника — аренда мини-экскаваторов в Бресте',
  description: 'Volvo EC 25, Messersi M-18BE и XCMG XE-35U с оператором. Фотографии, возможности и условия аренды в Бресте и Брестской области.',
  alternates: { canonical: `${SITE.url}/equipment/` },
};

export default function EquipmentCatalogPage() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: 'Главная', href: '/' }, { name: 'Техника', href: '/equipment/' }])} />
    <EquipmentSection catalog />
  </main>;
}
