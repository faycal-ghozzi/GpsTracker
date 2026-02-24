import { QuickSQLite } from "react-native-quick-sqlite";
import type { Fix } from "../core/types";

const DB = "gps.db";

function open() {
    return QuickSQLite.open(DB)
}

export async function initDb(): Promise<void>{
    const db = open();
    db.execute(
        `CREATE TABLE IF NOT EXISTS fixes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT NOT NULL,
        lat REAL NOT NULL,
        lon REAL NOT NULL,
        acc REAL NOT NULL,
        t INTEGER NOT NULL
        );`
    );
    db.close();
}

export async function addFix(f: Fix): Promise<void> {
    const db = open();
    db.execute(
        "INSERT INTO fixes(tag, lat, lon, acc, t) VALUES (?, ?, ?, ?, ?);",
        [f.tag, f.lat, f.lon, f.acc, f.t]
    );
    db.close();
}

export async function getBatch(limit:number): Promise<Array<Fix & {id: number}>> {
    const db = open();
    const res = db.execute(
        "SELECT id, tag, lat, lon, acc, t FROM fixes ORDER BY id ASC LIMIT ?;",
        [limit]
    );

    const rows = res.rows?._array ?? [];
    db.close();
    return rows as any;
}

export async function deleteUpToId(maxId:number): Promise<void> {
    const db = open();
    db.execute("DELETE FROM fixes WHERE id <= ?;", [maxId]);
    db.close();
}

export async function countPending(): Promise<number> {
    const db = open();
    const res = db.execute("SELECT COUNT(*) as c FROM fixes;");
    const rows = res.rows?._array ?? [];
    db.close();
    return rows[0]?.c ?? 0;
}