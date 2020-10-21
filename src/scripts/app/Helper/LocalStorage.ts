export class LocalStorage extends PIXI.utils.EventEmitter {
    private _localStorage: any;

    constructor() {
        super();
        this._localStorage = window.localStorage;
    }

    public setItem(key: string, value: any): void {
        if (this.getItem(key) == null) this.emit("insert", key, value); //Storage insert event fire.
        else this.emit("update", key, value); //Storage update event fire.
        this._localStorage.setItem(key, value);
    }

    public getItem(key: string): any {
        if (localStorage.getItem(key))
            return this._localStorage.getItem(key);
    }

    public removeAll(): void {
        this._localStorage.clear();
    }

    public removeItem(key: string): void {
        this._localStorage.removeItem(key);
    }
}