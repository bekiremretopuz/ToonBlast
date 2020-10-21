import { Texture } from "pixi.js";

export class SequenceAnimation extends PIXI.extras.AnimatedSprite {
    private _frame: string;
    private _lenght: number;
    constructor(frame: string, length: number, position: { x: number, y: number }) {
        super(SequenceAnimation.generateTextures(frame, length));
        this.position.set(position.x, position.y);
    }

    public static generateTextures(frame: string, length: number): Texture[] {
        const textures: any = [];
        for (let i = 0; i < length; i++) {
            const texture = PIXI.Texture.from(frame + `${i + 1}.png`);
            textures.push(texture);
        }
        return textures;
    }

    public static setAnimation(currentFrame: number): void{
        this.setAnimation(currentFrame);
    }
}