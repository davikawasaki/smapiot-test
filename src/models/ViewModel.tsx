export const defColor:string = "blue";

export class MapMarker {
    lat: number;
    lng: number;

    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }
}

export class MapMarkerWrapper extends MapMarker {
    text?: string;
    name?: string;
    color?: string;
    activated?: boolean

    constructor(lat: number, lng: number, text?: string,
        name?: string, color?: string, activated?: boolean) {
        super(lat, lng);
        this.text = text;
        this.name = name;
        this.color = color || defColor;
        this.activated = activated || false;
    }
}

export type MapProps = {
    center: MapMarker,
    zoom?: number,
    markers: Array<MapMarkerWrapper>,
    config: {
        key: string
    }
}