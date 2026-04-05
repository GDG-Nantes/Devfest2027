import { useEffect, useRef } from 'react';

interface InteractiveMapProps {
  title: string;
  description: string;
  locale: string;
}

// H Arena coordinates: Rue René Viviani, 44200 Nantes
const H_ARENA_LAT = 47.209700666453855;
const H_ARENA_LNG = -1.5359065657354578;


export default function InteractiveMap({
  title,
  description,
  locale,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import to avoid SSR issues (leaflet needs `window`)
    // @ts-expect-error CSS import handled by Vite bundler
    Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]).then(
      ([L]) => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const map = L.default
          .map(mapRef.current, {
            scrollWheelZoom: false,
          })
          .setView([H_ARENA_LAT, H_ARENA_LNG], 15);

        // OpenStreetMap tiles (open source)
        L.default
          .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          })
          .addTo(map);

        // Custom marker icon (fix default Leaflet icon issue with bundlers)
        const markerIcon = L.default.icon({
          iconUrl:
            'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl:
            'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl:
            'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        const marker = L.default
          .marker([H_ARENA_LAT, H_ARENA_LNG], { icon: markerIcon })
          .addTo(map);
        marker
          .bindPopup(
            `<strong>H Arena</strong><br/>Rue René Viviani<br/>44200 Nantes<br/><a href="https://www.google.com/maps/dir/?api=1&destination=${H_ARENA_LAT},${H_ARENA_LNG}" target="_blank" rel="noopener noreferrer">${locale === 'fr' ? 'Itinéraire' : 'Get directions'}</a>`
          )
          .openPopup();

        mapInstanceRef.current = map;

        // Fix map size when container becomes visible
        const resizeObserver = new ResizeObserver(() => {
          map.invalidateSize();
        });
        if (mapRef.current) {
          resizeObserver.observe(mapRef.current);
        }

        // Store cleanup
        (mapRef.current as any)._cleanup = () => {
          resizeObserver.disconnect();
          map.remove();
          mapInstanceRef.current = null;
        };
      }
    );

    return () => {
      if (mapRef.current && (mapRef.current as any)._cleanup) {
        (mapRef.current as any)._cleanup();
      }
    };
  }, [locale]);

  return (
    <div className='interactive-map-section'>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
      />
      <div className='map-info-overlay'>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <h3>H Arena, Nantes, France</h3>
        <p>{description}</p>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${H_ARENA_LAT},${H_ARENA_LNG}`}
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-secondary'
        >
          Rue René Viviani, 44200 Nantes →
        </a>
      </div>
    </div>
  );
}
