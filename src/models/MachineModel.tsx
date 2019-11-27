export const defMachineValue: string = "Unknown Machine";

export class Event {
    timestamp: string
    status: string

    constructor(timestamp: string, status: string) {
        this.timestamp = timestamp;
        this.status = status;
    }
}

export class Machine {
    status: string
    machine_type: string
    longitude: number
    latitude: number
    last_maintenance: string
    install_date: string
    id: string
    floor: number

    constructor(status: string, machine_type: string, longitude: number, latitude: number,
        last_maintenance: string, install_date: string, id: string, floor: number) {
        this.status = status;
        this.machine_type = machine_type;
        this.longitude = longitude;
        this.latitude = latitude;
        this.last_maintenance = last_maintenance;
        this.install_date = install_date;
        this.id = id;
        this.floor = floor;
    }
}

export class MachineWrapperApi {
    data: MachineWrapper

    constructor(data: MachineWrapper) {
        this.data = data;
    }
}

export class MachineWrapper extends Machine {
    events: Array<Event>

    constructor(events: Array<Event>, status: string, machine_type: string, longitude: number, latitude: number,
        last_maintenance: string, install_date: string, id: string, floor: number) {
        super(status, machine_type, longitude, latitude, last_maintenance,
            install_date, id, floor);
        this.events = events;
    }
}

export class Machines {
    data: Array<Machine>

    constructor(data: Array<Machine>) {
        this.data = data.map(m => new Machine(m.status, m.machine_type, m.longitude, m.latitude,
            m.last_maintenance, m.install_date, m.id, m.floor));
    }
}
  
export class CustomMachine {
    id: string;
    type: string;
    url: string;
    text: string;
    subtext: string;
    status: string;
    lat: number;
    lng: number;

    constructor(id: string, type: string, url: string, text: string,
        subtext: string, status: string, lat: number, lng: number) {
        this.id = id;
        this.type = type;
        this.url = url;
        this.text = text;
        this.subtext = subtext;
        this.lat = lat;
        this.lng = lng;
        this.status = status;
    }
}