import React from 'react';
import Tooltip from './Tooltip';
import '../styles/marker.css';
import { MarkerProps } from '../models/MarkerModel';

const Marker: React.FC<MarkerProps & React.HTMLAttributes<HTMLDivElement>> = ({ color, name, text, activated }) => {
    return (
      <div className="hint--html hint--top hint--hoverable">
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
            {/* Add pulse only if the object passed is activated (e.g. machine is running) */}
            { activated ? (<div className="pulse" />) : (<></>) }
            <div className="hint__content tooltip">
                <Tooltip name={name} text={text} />
            </div>
      </div>
    );
};

export default Marker;