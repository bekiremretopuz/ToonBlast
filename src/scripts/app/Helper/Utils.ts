export class Utils {
    public static getColor32(a: number, r: number, g: number, b: number): number {
        return a << 24 | r << 16 | g << 8 | b;
    }

    public static getRGB(color: number): any {
        if (color > 16777215) {
            return {
                alpha: color >>> 24,
                red: color >> 16 & 0xFF,
                green: color >> 8 & 0xFF,
                blue: color & 0xFF,
                a: color >>> 24,
                r: color >> 16 & 0xFF,
                g: color >> 8 & 0xFF,
                b: color & 0xFF
            };
        }
        else {
            return {
                alpha: 255,
                red: color >> 16 & 0xFF,
                green: color >> 8 & 0xFF,
                blue: color & 0xFF,
                a: 255,
                r: color >> 16 & 0xFF,
                g: color >> 8 & 0xFF,
                b: color & 0xFF
            };
        }
    }

    public static isEmpty(obj: any): boolean {
        let result: boolean = (obj != undefined && obj != null);
        if (Array.isArray(obj)) {
            result = result && (obj.length > 0);
        } else if (typeof obj === "string") {
            result = result && (obj != "");
        }
        return !result;
    }

    public static clone<T>(arg: T[]): T[] {
        if (arg == undefined || arg == null) return [];
        let t = [];
        t = [...arg];
        return t;
    }

    public static random(): number {
        return Math.random();
    }

    public static float(min: number, max: number = NaN): number {
        if (isNaN(max)) { max = min; min = 0; }
        return this.random() * (max - min) + min;
    }

    public static boolean(chance: number = 0.5): boolean {
        return (this.random() < chance);
    }

    public static sign(chance: number = 0.5): number {
        return (this.random() < chance) ? 1 : -1;
    }

    public static bit(chance: number = 0.5): number {
        return (this.random() < chance) ? 1 : 0;
    }

    public static integer(min: number, max: number = NaN): number {
        if (isNaN(max)) { max = min; min = 0; }
        return Math.floor(this.float(min, max));
    }
}