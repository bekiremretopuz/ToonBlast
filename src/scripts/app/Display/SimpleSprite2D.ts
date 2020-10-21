export class SimpleSprite2D extends PIXI.Sprite {
    private _normalFrame: string;
    constructor(normalFrame: string, position: { x: number, y: number }) {
        super(PIXI.Texture.from(normalFrame));
        this._normalFrame = normalFrame;
        this.position.set(position.x, position.y);
        this.interactive = true;
    }

    public setTexture(textureName: string): void{
        this._texture = PIXI.Texture.from(textureName);
    }

    //GETTER AND SETTER
    public get Interactive(): boolean{
        return this.interactive;
    }

    public set Interactive(value: boolean) {
        this.interactive = value;
    }
}