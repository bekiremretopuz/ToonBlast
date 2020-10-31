import { EmreBase } from "app/EntryPoint";
export class Data extends PIXI.utils.EventEmitter {
  protected _game: EmreBase.EntryPoint;
  constructor(game: EmreBase.EntryPoint) {
    super();
    this._game = game;
    this._game.localStorage.on("update", this.onStorageUpdate, this);
    this.setDefaultVariable();
  }

  private setDefaultVariable(): void {
    this._game.localStorage.setItem("level", 0);
  }

  private onStorageUpdate(key: string, value: any): void {
    console.log("Storage Updated:", key, value);
  }

  public get getLevel(): number {
    return this._game.localStorage.getItem("level") as number | 0;
  }

  public set setLevel(value: number) {
    this._game.localStorage.setItem("level", value);
  }
}
