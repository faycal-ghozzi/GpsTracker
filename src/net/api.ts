import axios from "axios";
import type { Config, Fix } from "../core/types";

export function baseUrl(cfg: Config){
    const host = cfg.host.trim();
    const port = cfg.port.trim();
    return `http://${host}:${port}`;
}

export async function sendBatch(cfg:Config, batch: Fix[]) {
    const url = `${baseUrl(cfg)}/ingest`;
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    };
    if (cfg.token) headers["Authorization"] = `Bearer ${cfg.token}`;

    const res = await axios.post(
        url,
        { tag: cfg, points: batch },
        { headers, timeout: 8000}
    );

    return res.data;
}