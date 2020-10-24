export class Base64Sprite extends PIXI.Sprite {
  private _normalFrame: string;
  constructor(
    normalFrame: string,
    position: { x: number; y: number } = { x: 0, y: 0 }
  ) {
    super(PIXI.Texture.from(normalFrame));
    this._normalFrame = normalFrame;
    let image = new Image();
    image.src = this._normalFrame;
    let base = new PIXI.BaseTexture(image);
    let texture = new PIXI.Texture(base);
    let sprite = new PIXI.Sprite(texture);
    sprite.position.set(position.x, position.y);
  }
}
