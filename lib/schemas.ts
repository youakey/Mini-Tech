import { CONTACTS, SITE, WORKING_HOURS } from './constants';

// JSON-LD schema.org строители для структурированных данных

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACTS.phone,
      contactType: 'customer service',
      areaServed: 'BY',
      availableLanguage: 'Russian',
    },
    sameAs: [CONTACTS.telegramHref],
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: CONTACTS.phone,
    email: CONTACTS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACTS.address,
      addressLocality: 'Брест',
      addressRegion: 'Брестская область',
      addressCountry: 'BY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACTS.lat,
      longitude: CONTACTS.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    openingHours: WORKING_HOURS.schemaHours,
    areaServed: [
      'Брест', 'Берёза', 'Барановичи', 'Пинск', 'Кобрин', 'Пружаны', 'Брестская область',
    ].map((name) => ({ '@type': 'City', name })),
    priceRange: 'от 85 BYN/час',
    currenciesAccepted: 'BYN',
    paymentAccepted: 'Cash, Bank Transfer',
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.href}`,
    })),
  };
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE.url}${url}`,
    provider: {
      '@type': 'LocalBusiness',
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Брестская область, Беларусь',
    },
  };
}
