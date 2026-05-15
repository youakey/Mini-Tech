// OG-картинка главной страницы — генерируется Satori при static build
// Satori требует inline styles + display:flex на каждом div (исключение из no-inline-styles)
import { ImageResponse } from 'next/og';
import { CONTACTS } from '@/lib/constants';

export const dynamic = 'force-static';
export const alt = 'МиниТех Брест — аренда строительной техники';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Акцентная полоса сверху */}
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#F59E0B' }} />

        {/* Логотип + название */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div
            style={{
              width: 80,
              height: 80,
              background: '#F59E0B',
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 700,
              color: '#0A0A0A',
            }}
          >
            МТ
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 38, fontWeight: 700, color: '#F5F5F5', lineHeight: 1 }}>
              МиниТех
            </span>
            <span style={{ fontSize: 38, fontWeight: 700, color: '#F59E0B', lineHeight: 1 }}>
              Брест
            </span>
          </div>
        </div>

        {/* Заголовок — две строки через flex column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 56, fontWeight: 800, color: '#F5F5F5', lineHeight: 1.15 }}>
            Аренда строительной
          </span>
          <span style={{ fontSize: 56, fontWeight: 800, color: '#F5F5F5', lineHeight: 1.15 }}>
            техники в Бресте
          </span>
        </div>

        {/* Подзаголовок */}
        <div style={{ display: 'flex', marginBottom: 36 }}>
          <span style={{ fontSize: 28, color: '#A1A1AA' }}>
            Volvo EC25 · CAT 226B · с оператором · от 4 часов
          </span>
        </div>

        {/* Разделитель */}
        <div style={{ display: 'flex', width: 80, height: 4, background: '#F59E0B', borderRadius: 2, marginBottom: 28 }} />

        {/* Телефон */}
        <div style={{ display: 'flex' }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: '#F59E0B' }}>
            {CONTACTS.phone}
          </span>
        </div>

        {/* Область */}
        <div style={{ display: 'flex', position: 'absolute', bottom: 30, right: 80 }}>
          <span style={{ fontSize: 20, color: '#A1A1AA' }}>
            Брест и Брестская область
          </span>
        </div>
      </div>
    ),
    size
  );
}
