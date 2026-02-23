import AsyncStorage from "@react-native-async-storage/async-storage";
import { Config } from "./types";

const KEY = "cfg"

export const defaultConfig: Config = {
    tag: "",
    host: "",
    port: "3000",
    token: "devtoken"
};

export async function loadConfig(): Promise<Config> {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        if (!raw) return defaultConfig;
        const parsed = JSON.parse(raw);
        return { ...defaultConfig, ...parsed};
    }catch{
        return defaultConfig;
    }
}

export async function saveConfig(cfg: Config): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(cfg));
}

export function isConfigReady(cfg: Config): boolean {
    const portNum = Number(cfg.port);
    return (
        !!cfg.tag?.trim() &&
        !!cfg.host?.trim() &&
        Number.isFinite(portNum) && 
        portNum > 0 &&
        portNum < 65536
    );
}