import React, {useEffect} from 'react'
import { MapContainer, useMap } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import { WeatherLocation } from '../../interfaces/weather-data.interface';
import './Map.css'


type RecenterMapUtilProps = {
    lat: number
    lon: number
}

type MapProps = {
    location: WeatherLocation
}

const RecenterMapUtil: React.FC<RecenterMapUtilProps> = ({lat, lon}) => {
    const map = useMap();
     useEffect(() => {
      if (!lat || !lon) return
  
       map.setView([lat, lon]);
     }, [lat, lon]);
     return null;
  }

const Map: React.FC<MapProps> = ({ location }) => {
    return <div className='map'>
        <MapContainer className='map' center={[location.lat, location.lon]} zoom={12} scrollWheelZoom={false} >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lon]} />
        <RecenterMapUtil lat={location.lat} lon={location.lon}/>
        </MapContainer>
    </div>
}

export default Map

//  Карта