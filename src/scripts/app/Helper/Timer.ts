export class Timer extends PIXI.utils.EventEmitter {
    constructor() {
        super();
    }
    public addTimeout(key: string, duration: number): void {
        const d = duration * 1000;
        const k = key;
    }

    public addInterval(): void {

    }

    public fetch(): boolean {
        return false;
    }
}