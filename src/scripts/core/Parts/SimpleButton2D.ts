export class SimpleButton2D extends PIXI.Sprite {
  private _normalFrame: string;
  private _overFrame: string;
  private _downFrame: string;
  private _disabledFrame: string;
  private _isDown: boolean = false;
  private _isOver: boolean = false;
  private _isEnabled: boolean = true;
  private _callback: Function;
  constructor(frame: string, position: { x: number; y: number }, callback: () => void, name?: string) {
    super(PIXI.Texture.from(frame + "_normal"));
    this._normalFrame = frame + "_normal";
    this._overFrame = frame + "_over";
    this._downFrame = frame + "_down";
    this._disabledFrame = frame + "_disabled";
    this._callback = callback;
    this.position.set(position.x, position.y);
    this.interactive = true;
    this.buttonMode = true;
    this.name = name || "";
    this.on("pointerdown", this.onPointerDown, this);
    this.on("pointerover", this.onPointerOver, this);
    this.on("pointerout", this.onPointerOut, this);
    this.on("pointerup", this.onPointerUp, this);
  }

  private onPointerDown(e: any): void {
    if (this.Interactive) {
      this.isDown = true;
      this.texture = PIXI.Texture.from(this._downFrame);
      if (typeof this._callback === "function") this._callback(this);
    }
  }

  private onPointerUp(e: any): void {
    this.isDown = false;
    if (this.isOver) {
      this.texture = PIXI.Texture.from(this._overFrame);
    } else {
      this.texture = PIXI.Texture.from(this._normalFrame);
    }
  }

  private onPointerOver(e: any): void {
    this.isOver = true;
    if (this.isDown) {
      return;
    }
    this.texture = PIXI.Texture.from(this._overFrame);
  }

  private onPointerOut(e: any): void {
    this.isOver = false;
    if (this.isDown) {
      return;
    }
    this.texture = PIXI.Texture.from(this._normalFrame);
  }

  public setDisabled(): void {
    this.buttonMode = false;
    this.interactive = false;
    this.texture = PIXI.Texture.from(this._disabledFrame);
  }

  public setTexture(frame: string): void {
    this._normalFrame = frame + "_normal";
    this._overFrame = frame + "_over";
    this._downFrame = frame + "_down";
    this._disabledFrame = frame + "_disabled";
    this.name = frame;
    this._texture = PIXI.Texture.from(this._normalFrame);
  }

  public setCallback(callback: Function): void {
    if (typeof callback === "function") {
      this._callback = callback;
    }
  }

  public setEnabled(): void {
    this.buttonMode = true;
    this.interactive = true;
  }

  //GETTER AND SETTER
  public get isDown(): boolean {
    return this._isDown;
  }

  public set isDown(value: boolean) {
    if (value != this._isDown) this._isDown = value;
  }

  public get isOver(): boolean {
    return this._isOver;
  }

  public set isOver(value: boolean) {
    if (value != this._isOver) this._isOver = value;
  }

  public get Interactive(): boolean {
    return this.interactive;
  }

  public set Interactive(value: boolean) {
    this.interactive = value;
  }

  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  public set isEnabled(value: boolean) {
    if (!value) {
      this.setDisabled();
    } else {
      this.setEnabled();
    }
    this._isEnabled = value;
  }

  public get ButtonMode(): boolean {
    return this.buttonMode;
  }

  public set ButtonMode(value: boolean) {
    this.buttonMode = value;
  }
}
