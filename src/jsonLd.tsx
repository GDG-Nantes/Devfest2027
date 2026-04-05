const URLSite = 'https://devfest2027.gdgnantes.com';

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Devfest Nantes 2027',
  startDate: '2027-03-11T09:00:00',
  endDate: '2027-03-12T19:00:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'H Arena Nantes',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '44 Boulevard de la Prairie au Duc',
      addressLocality: 'Nantes',
      postalCode: '44200',
      addressRegion: 'Loire Atlantique',
      addressCountry: 'France',
    },
  },
  image: [URLSite + '/images/social-share.jpg'],
  description:
    "Le DevFest, ou 'Developers Festival', est une conférence technique destinée aux développeuses et développeurs. Elle s'adresse aussi bien aux étudiantes et étudiants, aux professionnels ou tout simplement aux curieuses et curieux technophiles.",
  // offers: {
  //   '@type': 'Offer',
  //   url: 'https://www.example.com/event_offer/12345_202403180430',
  //   price: 30,
  //   priceCurrency: 'USD',
  //   availability: 'https://schema.org/InStock',
  //   validFrom: '2024-05-21T12:00',
  // },
  organizer: {
    '@type': 'Organization',
    name: 'GDG Nantes',
    url: 'https://gdgnantes.com',
  },
};
