class Coordinates {
    lat: number;
    lng: number;
    
    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;        
    }
}

export const defZoom:number = 19;
export const defCenter = new Coordinates(11.523880271993598,48.09540056785246)

export class GoogleMapsConfig {
    key: string;
    zoom?: number;
    center?: Coordinates

    constructor(key: string, zoom?: number, center?: Coordinates) {
        this.key = key;
        this.zoom = zoom || defZoom;
        this.center = center || defCenter;
    }
}