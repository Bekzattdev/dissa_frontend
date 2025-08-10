import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_COORDS = {
  latitude: 51.505,
  longitude: -0.09,
};

const RadiusMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const { setValue, watch } = useFormContext();
  
  const radius = watch('radius', 10);
  const adjustedRadius = Math.max(radius, 1); 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        console.warn('Using default coordinates');
        setCoords(DEFAULT_COORDS);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        zoomControl: false,
        attributionControl: false,
      }).setView([coords.latitude, coords.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

      circleRef.current = L.circle([coords.latitude, coords.longitude], {
        radius: adjustedRadius * 1000,
        color: '#FF0000', 
        fillColor: '#ec5353', 
        fillOpacity: 0.4,
        weight: 2,
      }).addTo(mapRef.current);
      
      const bounds = circleRef.current.getBounds();
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    } else {
      if (circleRef.current) {
        circleRef.current.setLatLng([coords.latitude, coords.longitude]);
        circleRef.current.setRadius(adjustedRadius * 1000);
  
        const bounds = circleRef.current.getBounds();
        mapRef.current.fitBounds(bounds, { padding: [20, 20] });
      } else {
        mapRef.current.setView([coords.latitude, coords.longitude], 13);
      }
    }
  }, [coords]);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(adjustedRadius * 1000);
    }
  }, [radius]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div 
        id="map" 
        className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden border border-gray-200"
      />
      <div className="flex flex-col gap-2 px-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Radius: {radius}km
          </label>
          <div className="text-sm text-gray-500">
            {radius < 100 ? 'Small' : radius < 300 ? 'Medium' : 'Large'} radius
          </div>
        </div>
        <input
          type="range"
          min="10"
          max="500"
          value={radius}
          onChange={(e) => setValue('radius', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>
    </div>
  );
};

export default RadiusMap;