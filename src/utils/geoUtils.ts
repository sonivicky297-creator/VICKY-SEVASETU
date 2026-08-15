export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CityLocationInfo {
  lat: number;
  lng: number;
  zoom: number;
  defaultArea: string;
}

export const CITY_COORDINATES: Record<string, CityLocationInfo> = {
  'Sayal': { lat: 23.6820, lng: 85.3200, zoom: 14, defaultArea: 'Sayal Colliery & Market' },
  'Saunda': { lat: 23.6550, lng: 85.3400, zoom: 14, defaultArea: 'Saunda D & Colliery' },
  'Bhurkunda': { lat: 23.6420, lng: 85.3520, zoom: 14, defaultArea: 'Bhurkunda Main Market' },
  'Balkudra': { lat: 23.6380, lng: 85.3600, zoom: 14, defaultArea: 'Balkudra Chowk' },
  'Kurse': { lat: 23.6600, lng: 85.3350, zoom: 14, defaultArea: 'Kurse Area' },
  'Cooperative': { lat: 23.6460, lng: 85.3480, zoom: 14, defaultArea: 'Cooperative Colony' },
  'Saundaa Basti': { lat: 23.6580, lng: 85.3450, zoom: 14, defaultArea: 'Saundaa Basti Center' },
  'Patratu': { lat: 23.6700, lng: 85.2900, zoom: 13, defaultArea: 'Patratu Thermal & Lake' },
  'Ramgarh': { lat: 23.6340, lng: 85.5160, zoom: 13, defaultArea: 'Ramgarh Cantt & Main Road' },
  'All Surrounding Areas': { lat: 23.6500, lng: 85.3600, zoom: 12, defaultArea: 'Coal Belt & Surrounding Region' },
  'all': { lat: 23.6500, lng: 85.3600, zoom: 12, defaultArea: 'All Covered Areas' }
};

export const POPULAR_USER_LOCATIONS: { name: string; nameEn: string; city: string; lat: number; lng: number }[] = [
  { name: 'Bhurkunda Main Market', nameEn: 'Bhurkunda Main Market', city: 'Bhurkunda', lat: 23.6420, lng: 85.3520 },
  { name: 'Sayal Colliery & Township', nameEn: 'Sayal Colliery & Township', city: 'Sayal', lat: 23.6820, lng: 85.3200 },
  { name: 'Saunda D / Central Saunda', nameEn: 'Saunda D / Central Saunda', city: 'Saunda', lat: 23.6550, lng: 85.3400 },
  { name: 'Saundaa Basti Area', nameEn: 'Saundaa Basti Area', city: 'Saundaa Basti', lat: 23.6580, lng: 85.3450 },
  { name: 'Cooperative Colony', nameEn: 'Cooperative Colony', city: 'Cooperative', lat: 23.6460, lng: 85.3480 },
  { name: 'Balkudra Chowk & Link Road', nameEn: 'Balkudra Chowk & Link Road', city: 'Balkudra', lat: 23.6380, lng: 85.3600 },
  { name: 'Kurse Road & Township', nameEn: 'Kurse Road & Township', city: 'Kurse', lat: 23.6600, lng: 85.3350 },
  { name: 'Patratu Lake & Thermal Station', nameEn: 'Patratu Lake & Thermal Station', city: 'Patratu', lat: 23.6700, lng: 85.2900 },
  { name: 'Ramgarh Cantt & Main Road', nameEn: 'Ramgarh Cantt & Main Road', city: 'Ramgarh', lat: 23.6340, lng: 85.5160 },
  { name: 'All Surrounding Coal Belt Areas', nameEn: 'All Surrounding Coal Belt Areas', city: 'All Surrounding Areas', lat: 23.6500, lng: 85.3600 }
];

/**
 * Calculates distance in Kilometers between two coordinates using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
      
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10;
}

/**
 * Fallback to generate coordinates close to a city center if missing
 */
export function getCoordinatesForCity(city: string, seed: string = ''): Coordinates {
  const cityInfo = CITY_COORDINATES[city] || CITY_COORDINATES['Sayal'] || CITY_COORDINATES['all'];
  if (!seed) return { lat: cityInfo.lat, lng: cityInfo.lng };
  
  // Deterministic slight offset for visualization
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const offsetLat = ((hash % 100) / 100) * 0.04 - 0.02;
  const offsetLng = (((hash >> 3) % 100) / 100) * 0.04 - 0.02;
  
  return {
    lat: Number((cityInfo.lat + offsetLat).toFixed(4)),
    lng: Number((cityInfo.lng + offsetLng).toFixed(4))
  };
}

export function formatDistance(distanceKm: number, language?: string): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m away`;
  }
  return `${distanceKm} km away`;
}

