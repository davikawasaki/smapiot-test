import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { MapProps, defColor } from '../models/ViewModel';
import { defZoom } from '../models/ConfigModel';

const ViewMap: React.FC<MapProps> = ({ center, zoom, markers, config }) => {
    const [recCenter, setCenter] = useState(Object.assign({}, center));
    const [recZoom, setZoom] = useState(zoom || defZoom);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: config.key || "" }}
                defaultCenter={recCenter}
                defaultZoom={recZoom || defZoom}
            >
                {
                    markers.map(m => (
                        <Marker
                            className="marker"
                            key={m.lat.toString() && m.lng.toString()}
                            lat={m.lat}
                            lng={m.lng}
                            text={m.text || "My Marker"}
                            name={m.name || "My Marker"}
                            color={m.color || defColor}
                            activated={m.activated || false}
                        />
                    ))
                }
            </GoogleMapReact>
        </div>
    );
}

export default ViewMap;