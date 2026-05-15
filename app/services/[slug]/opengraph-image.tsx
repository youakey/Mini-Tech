import { ImageResponse } from 'next/og';
import { SERVICES_DATA } from '@/data/services';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  const name = service?.name ?? 'Услуги';
  const description = service?.seo.ogDescription ?? '';
  const shortDesc = description.length > 100 ? description.slice(0, 100) + '…' : description;

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

        {/* Лейбл */}
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <span style={{ fontSize: 22, color: '#F59E0B', fontWeight: 600, textTransform: 'uppercase' }}>
            Услуги
          </span>
        </div>

        {/* Название услуги */}
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <span style={{ fontSize: 60, fontWeight: 800, color: '#F5F5F5', lineHeight: 1.15 }}>
            {name}
          </span>
        </div>

        {/* Описание */}
        {shortDesc ? (
          <div style={{ display: 'flex', marginBottom: 36 }}>
            <span style={{ fontSize: 26, color: '#A1A1AA', lineHeight: 1.4 }}>
              {shortDesc}
            </span>
          </div>
        ) : null}

        {/* Бейджи */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#141414',
              border: '2px solid #27272A',
              borderRadius: 16,
              padding: '14px 28px',
            }}
          >
            <span style={{ fontSize: 18, color: '#A1A1AA', marginBottom: 4 }}>Регион</span>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#F5F5F5' }}>Брест и область</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#141414',
              border: '2px solid #27272A',
              borderRadius: 16,
              padding: '14px 28px',
            }}
          >
            <span style={{ fontSize: 18, color: '#A1A1AA', marginBottom: 4 }}>С оператором</span>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#F59E0B' }}>от 4 часов</span>
          </div>
        </div>

        <div style={{ display: 'flex', position: 'absolute', bottom: 40, right: 80 }}>
          <span style={{ fontSize: 22, color: '#A1A1AA' }}>mini-tech.by</span>
        </div>
      </div>
    ),
    size
  );
}
