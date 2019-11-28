import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import '../styles/machine.css';
import { MachineStreamApi } from "../services/APIService";
import { isUndefined, isNullOrUndefined } from "util";
import { modifyOriginalMachineWrapper } from "../services/DataService";
import { MachineWrapper, Event, Machine } from "../models/MachineModel";
import { Link } from "react-router-dom";

type RouterParamsObject = {
    id?: string | undefined
}

const MachineInfo: React.FC = () => {
    let [machine, setMachine] = useState(
        new MachineWrapper(new Array<Event>(), 'TBA', 'TBA', 0, 0, 'TBA', 'TBA', 'TBA', 0));
    let machineParams:RouterParamsObject = useParams();

    const api = new MachineStreamApi();
    useEffect(() => {
        if (!isUndefined(machineParams.id)) {
            api.getMachine(machineParams.id)
                .then(res => {
                    // if (machine.id !== res.data.id) 
                    setMachine(modifyOriginalMachineWrapper(res.data));
                })
                .catch(err => console.error(err));
        }

        // To be changed using global context
        setInterval(()=> { 
            console.log("Updating machine info...");
            const liveEvent = localStorage.getItem('liveEvent');
            if (!isNullOrUndefined(liveEvent)) {
                try {
                    const parsedLiveEvent = JSON.parse(liveEvent);
                    if (parsedLiveEvent.machine_id === machine.id) {
                        machine.events.pop();
                        machine.events.push(
                            new Event(parsedLiveEvent.timestamp, parsedLiveEvent.status)
                        )
                        setMachine(machine);
                    }
                } catch (error) {}
            }
        }, 30 * 1000);
    }, [machine, api, machineParams]);

    return (
        <div className="mouter">
            <Link to={"/"}>Go back to map</Link>
            <h1>Machine {machine.id}</h1>
            <p>Status: {machine.status}</p>
            <p>Type: {machine.machine_type}</p>
            <p>Located in the floor {machine.floor}</p>
            <p>Installation Date: {machine.install_date}</p>
            <p>Last Maintenance Date: {machine.last_maintenance}</p>
            <p>Coordinates: ({machine.latitude}, {machine.longitude})</p>

            <div className="events">
                <h2>Last registered events</h2>
                {
                    machine.events.slice(0, 5).map(e => (
                        e.status && e.timestamp && (
                            <div key={e.timestamp}>
                                <p>Status: <strong>{e.status || 'Not registered'}</strong></p>
                                <p>Registered date and time: <strong>{e.timestamp || 'Not registered'}</strong></p>
                                <hr/>
                            </div>
                        )
                    ))
                }
            </div>
        </div>
    );
}

export default MachineInfo;