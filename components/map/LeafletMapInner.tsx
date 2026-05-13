'use client';

/** Внутренний компонент Leaflet-карты — импортируется только через dynamic() с ssr:false */

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CONTACTS, SITE } from '@/lib/constants';

// Исправление стандартной иконки Leaflet в сборках с Webpack/Next.js
function fixLeafletIcon() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require('leaflet') as typeof import('leaflet');
  delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

const center: LatLngExpression = [CONTACTS.lat, CONTACTS.lng];

export function LeafletMapInner() {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      aria-label="Карта — местоположение компании в Бресте"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Зона обслуживания */}
      <Circle
        center={center}
        radius={50000}
        pathOptions={{ color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 0.07, weight: 1.5 }}
      />
      <Marker position={center}>
        <Popup>
          <strong>{SITE.name}</strong><br />
          {CONTACTS.address}<br />
          <a href={CONTACTS.phoneHref} className="text-amber-600">{CONTACTS.phone}</a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
