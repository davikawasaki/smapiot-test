import React from 'react';
import '../styles/sidebar.css';
import { SidebarProps } from '../models/SidebarModel';
import { defMachineValue } from '../models/MachineModel';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
    return (
        <nav id="sidebar">
            {
                sections.map(s => (
                    <section key={s.id}>
                        <Link to={location => `${s.url}/${s.id}`}>{s.text || defMachineValue}</Link>
                        {s.type && <p>Type: {s.type}</p>}
                        {/* {s.subtext && <p>{s.subtext}</p>} */}
                    </section>
                ))
            }
        </nav>
    );
};

export default Sidebar;