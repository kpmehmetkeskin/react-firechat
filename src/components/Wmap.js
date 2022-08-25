import React, { useEffect, useRef, useState, useMapEvents } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';
import '../App.css';
import 'leaflet/dist/leaflet.css'
import Chat from './Chat';
import { MapContext } from '../contexts/MapContext';

import nationalParks from '../national-parks.json';

delete L.Icon.Default.prototype._getIconUrl;

// Importing images from locally stored assets to address a bug
// in CodeSandbox: https://github.com/codesandbox/codesandbox-client/issues/3845

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../images/marker-icon-2x.png').default,
    iconUrl: require('../images/marker-icon.png').default,
    shadowUrl: require('../images/marker-shadow.png').default
});

// When importing into your own app outside of CodeSandbox, you can import directly
// from the leaflet package like below
//
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

function App() {
    const [oidd, setOidd] = useState('');

    const mapRef = useRef();

    useEffect(() => {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;

        if (!map) return;

        const parksGeoJson = new L.GeoJSON(nationalParks, {
            onEachFeature: (feature = {}, layer) => {
                const { properties = {} } = feature;
                const { Name } = properties;

                if (!Name) return;

                layer.bindPopup('<p>' + Name + '</p>').on('click', function (e) {
                    console.log(e.latlng);
                    setOidd(JSON.stringify(e.latlng.lat));

                    map.flyTo(e.latlng, map.getZoom());
                });

                //layer.bindTooltip(Name, {permanent: true, className: "my-label", offset: [0, 0] });
            }
        });
        parksGeoJson.addTo(map);

        let wPosition = [39.50, -98.35];
        navigator.geolocation.getCurrentPosition(
            function (position) {
                wPosition = [position.coords.latitude, position.coords.longitude];
                console.log(wPosition);
                //map.flyTo(wPosition, 10);
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );

    }, [])

    return (
        <MapContext.Provider value = {oidd}>
            <div>
                <div className='mapContainer'>
                    <div className="App">
                        <Map ref={mapRef} center={[39.50, -98.35]} zoom={4}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                            <Marker position={[51.505, -0.09]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </Map>
                    </div>
                </div >
                <div className='chatContainer'>
                    <Chat name={'asdasd'} />
                </div>
            </div>
        </MapContext.Provider>
    );
}

export default App;
