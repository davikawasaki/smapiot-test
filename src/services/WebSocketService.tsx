import { Machines, MachineWrapperApi, LiveEvent } from "../models/MachineModel";
import { isObject, isNullOrUndefined } from "util";

const _msApiEndpoints = {
    getMachines: '/machines',
}

class DefaultWs {
    uri: string;
    counter: number;
    ws: WebSocket;

    constructor(uri: string) {
        this.uri = uri;
        this.counter = 1;
        this.ws = new WebSocket(uri);
    }
}

export class MachineStreamWs extends DefaultWs {
    constructor() {
        super('ws://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0');
    }

    public connect = () => {
        this.ws.onopen = () => this.ws.send(
            `["1", ${this.counter.toString()}, "events", "phx_join", {}]`);
        setTimeout(() => {
            setInterval(()=> { 
                console.log("Refreshing heartbeats...");
                this.heartBeat()
            }, 30 * 1000);
        }, 5000);
    }

    private heartBeat = () => {
        this.counter++;
        this.ws.send(`[null, ${this.counter.toString()}, "phoenix", "heartbeat", {}]`);
    }

    public getEvents = () => {
        this.ws.onmessage = (ev:MessageEvent) => {
            const payload:Array<any> = JSON.parse(ev.data);
            if (payload.includes("events") && payload.includes("new")) {
                payload.map(e => {
                    if (typeof e === 'object' && !isNullOrUndefined(e)) 
                        localStorage.setItem('liveEvent', JSON.stringify(e));
                })
            }
            else localStorage.setItem('liveEvent', "");
        };
    }
}