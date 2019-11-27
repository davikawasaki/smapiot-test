import React from 'react';
import '../styles/tooltip.css';
import { TooltipProps } from '../models/TooltipModel';

const Tooltip: React.FC<TooltipProps> = ({ name, text }) => {
    return (
        <>
            { name && 
                <div className="tooltip-content">
                    <h1>{name}</h1>
                    <p>{text}</p>
                </div>
            }
        </>
    );
};

export default Tooltip;