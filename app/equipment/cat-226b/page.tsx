import type { Metadata } from 'next';
import Link from 'next/link';

// GitHub Pages не поддерживает серверные redirects Next.js.
// Сохраняем старый URL для посетителей из рекламы и закладок.
export const metadata: Metadata = {
  title: 'Актуальный парк техники',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://mini-tech.by/equipment/' },
};

export default function LegacyEquipmentPage() {
  return <main className="section container-site">
    <h1 className="section-title">Наш парк техники обновился</h1>
    <p className="section-subtitle mb-6">Выберите Volvo EC 25, Messersi M-18BE или XCMG XE-35U для вашей задачи.</p>
    <Link href="/equipment/" className="inline-flex bg-accent text-bg font-bold rounded-xl px-6 py-3">Посмотреть всю технику</Link>
  </main>;
}
