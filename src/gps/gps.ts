import Geolocation, { GeoPosition } from "react-native-geolocation-service";

export type GpsOptions = {
    intervalMs: number;
    fastestMs: number;
    highAccuracy: boolean;
};

export function startGps(
    onPos: (p: GeoPosition) => void,
    onErr: (e: any) => void,
    opts: GpsOptions
): number {
    const id = Geolocation.watchPosition(
        onPos,
        onErr,
        {
            enableHighAccuracy: opts.highAccuracy,
            distanceFilter: 0,
            interval: opts.fastestMs,
            showsBackgroundLocationIndicator: false
        }
    );
    return id;
}

export function stopGps(watchId: number | null) {
    if (watchId == null) return;
    Geolocation.clearWatch(watchId);
    Geolocation.stopObserving();
}