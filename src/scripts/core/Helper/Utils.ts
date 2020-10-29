export class Utils {
  public static getColor32(a: number, r: number, g: number, b: number): number {
    return (a << 24) | (r << 16) | (g << 8) | b;
  }

  public static deepCopyFunction = (inObject: any) => {
    let outObject: any;
    let value: any;
    let key: any;
    if (typeof inObject !== "object" || inObject === null) {
      return inObject;
    }
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) {
      value = inObject[key];
      outObject[key] = Utils.deepCopyFunction(value);
    }
    return outObject;
  };

  public static getRGB(color: number): any {
    if (color > 16777215) {
      return {
        alpha: color >>> 24,
        red: (color >> 16) & 0xff,
        green: (color >> 8) & 0xff,
        blue: color & 0xff,
        a: color >>> 24,
        r: (color >> 16) & 0xff,
        g: (color >> 8) & 0xff,
        b: color & 0xff,
      };
    } else {
      return {
        alpha: 255,
        red: (color >> 16) & 0xff,
        green: (color >> 8) & 0xff,
        blue: color & 0xff,
        a: 255,
        r: (color >> 16) & 0xff,
        g: (color >> 8) & 0xff,
        b: color & 0xff,
      };
    }
  }

  public static isEmpty(obj: any): boolean {
    let result: boolean = obj != undefined && obj != null;
    if (Array.isArray(obj)) {
      result = result && obj.length > 0;
    } else if (typeof obj === "string") {
      result = result && obj != "";
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
    if (isNaN(max)) {
      max = min;
      min = 0;
    }
    return this.random() * (max - min) + min;
  }

  public static boolean(chance: number = 0.5): boolean {
    return this.random() < chance;
  }

  public static sign(chance: number = 0.5): number {
    return this.random() < chance ? 1 : -1;
  }

  public static bit(chance: number = 0.5): number {
    return this.random() < chance ? 1 : 0;
  }

  public static integer(min: number, max: number = NaN): number {
    if (isNaN(max)) {
      max = min;
      min = 0;
    }
    return Math.floor(this.float(min, max));
  }
}
