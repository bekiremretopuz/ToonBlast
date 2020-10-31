export class SimpleSprite2D extends PIXI.Sprite {
  constructor(normalFrame: string, position: { x: number; y: number }) {
    super(PIXI.Texture.from(normalFrame));
    this.position.set(position.x, position.y);
    this.interactive = true;
  }

  public setTexture(textureName: string): void {
    this._texture = PIXI.Texture.from(textureName);
  }
}
