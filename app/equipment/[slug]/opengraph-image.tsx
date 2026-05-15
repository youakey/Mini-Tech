import { ImageResponse } from 'next/og';
import { EQUIPMENT_DATA } from '@/data/equipment';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return EQUIPMENT_DATA.map((e) => ({ slug: e.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const equipment = EQUIPMENT_DATA.find((e) => e.slug === slug);

  const name = equipment?.name ?? 'Аренда техники';
  const price = equipment?.priceDisplay ?? '';
  const category = equipment?.category ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#F59E0B' }} />

        {/* Логотип */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 60,
              height: 60,
              background: '#F59E0B',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: '#0A0A0A',
            }}
          >
            МТ
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#A1A1AA' }}>
            МиниТех Брест
          </span>
        </div>

        {/* Категория */}
        <div style={{ display: 'flex', marginBottom: 12 }}>
          <span style={{ fontSize: 24, color: '#F59E0B', fontWeight: 600, textTransform: 'uppercase' }}>
            {category}
          </span>
        </div>

        {/* Название техники */}
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <span style={{ fontSize: 64, fontWeight: 800, color: '#F5F5F5', lineHeight: 1.1 }}>
            {name}
          </span>
        </div>

        {/* Бейджи цены */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#141414',
              border: '2px solid #27272A',
              borderRadius: 16,
              padding: '16px 32px',
            }}
          >
            <span style={{ fontSize: 20, color: '#A1A1AA', marginBottom: 4 }}>Аренда от</span>
            <span style={{ fontSize: 36, fontWeight: 700, color: '#F59E0B' }}>{price}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#141414',
              border: '2px solid #27272A',
              borderRadius: 16,
              padding: '16px 32px',
            }}
          >
            <span style={{ fontSize: 20, color: '#A1A1AA', marginBottom: 4 }}>Мин. смена</span>
            <span style={{ fontSize: 36, fontWeight: 700, color: '#F5F5F5' }}>4 часа</span>
          </div>
        </div>

        <div style={{ display: 'flex', position: 'absolute', bottom: 40, right: 80 }}>
          <span style={{ fontSize: 22, color: '#A1A1AA' }}>Брест и Брестская область</span>
        </div>
      </div>
    ),
    size
  );
}
