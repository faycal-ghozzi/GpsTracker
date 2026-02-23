export type Status = "NOT_READY" | "READY" | "RECORDING" | "CONNECTED";

export type Config = {
    tag: string;
    host: string;
    port: string;
    token?: string;
}

export type Fix = {
    tag: string;
    lat: number;
    lon: number;
    acc: number;
    t: number;
}