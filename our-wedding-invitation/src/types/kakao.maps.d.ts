declare namespace kakao.maps {
  export class Map {
    constructor(container: HTMLElement, options: MapOptions);
    addControl(control: MapTypeControl | ZoomControl, position: ControlPosition): void;
    getCenter(): LatLng;
    setCenter(latlng: LatLng): void;
    setLevel(level: number, options?: {animate: boolean}): void;
    getLevel(): number;
    setMapTypeId(mapTypeId: MapTypeId): void;
    panTo(latlng: LatLng): void;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  export class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
    getPosition(): LatLng;
  }

  export class InfoWindow {
    constructor(options: InfoWindowOptions);
    open(map: Map, marker?: Marker): void;
    close(): void;
    setContent(content: string): void;
    setPosition(position: LatLng): void;
  }

  export class ZoomControl {}

  export class MapTypeControl {}

  export enum ControlPosition {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    TOPRIGHT,
    TOPLEFT,
    BOTTOMRIGHT,
    BOTTOMLEFT
  }

  export enum MapTypeId {
    ROADMAP,
    SKYVIEW,
    HYBRID
  }

  export interface MapOptions {
    center: LatLng;
    level: number;
    mapTypeId?: MapTypeId;
    draggable?: boolean;
    scrollwheel?: boolean;
    disableDoubleClick?: boolean;
    disableDoubleClickZoom?: boolean;
    projectionId?: string;
    tileAnimation?: boolean;
    keyboardShortcuts?: boolean;
  }

  export interface MarkerOptions {
    position: LatLng;
    map?: Map;
    title?: string;
    clickable?: boolean;
    draggable?: boolean;
    zIndex?: number;
    opacity?: number;
    image?: MarkerImage;
  }

  export interface InfoWindowOptions {
    content: string;
    position?: LatLng;
    removable?: boolean;
    zIndex?: number;
  }

  export class MarkerImage {
    constructor(src: string, size: Size, options?: MarkerImageOptions);
  }

  export class Size {
    constructor(width: number, height: number);
  }

  export interface MarkerImageOptions {
    alt?: string;
    coords?: string;
    offset?: Point;
    shape?: string;
    spriteOrigin?: Point;
    spriteSize?: Size;
  }

  export class Point {
    constructor(x: number, y: number);
  }
}