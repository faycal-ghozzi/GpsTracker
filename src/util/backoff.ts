export function nextBackoffMs(currentMs: number): number{
    if(currentMs <= 0) return 1000;
    const next = currentMs * 2;
    return Math.min(next, 60000);
}