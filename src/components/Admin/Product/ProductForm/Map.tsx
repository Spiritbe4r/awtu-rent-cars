// Mapa.tsx

import { ENV } from "@/utils";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

interface MapProps {
  position: {
    lat: number;
    lng: number;
  };
}

const Map: React.FC<MapProps> = ({position}) => {

  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {

    const initMap = async () => {

      const loader = new Loader({
        apiKey: ENV.NEXT_PUBLIC_KEY_MAPS_API_KEY as string,
        version: 'weekly'
      })

      console.log("LOADER", loader)

      const { Map } = await loader.importLibrary('maps');
      const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;
 
  
      const mapOptions : google.maps.MapOptions= {
        center: position,
        zoom: 17,
        mapId: 'MY_NEXTJS_MAP_ID',
      }
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

      console.log("map loaded", map)
      console.log("map mapRef", mapRef)      
      const marker = new Marker({
        map: map,
        position: position,
      })

    }

    initMap();
  }, [position]);
  return (
    <div style={{ height: '600px' }} ref={mapRef}>

    </div>
  );
};

export default Map;
