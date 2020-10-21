export const DefaultTextStyle = ({
    fontFamily: "Topaz-8-remake",
    fontSize: 42,
    fill: "#1f140a",
    align: "center",
    stroke: "#cecece",
    strokeThickness: 3,
});

export const PLAYACTION = "play";
export const INIT = "init";
export const ERROR = "error";

export const PSEUDO_REEL_SET = [
    ["T", "J", "Q", "K", "K", "T", "K", "P", "J", "J", "Q", "K", "K", "J", "Q", "K", "A", "T", "Q", "T"],
    ["Q", "Q", "A", "J", "A", "Q", "A", "A", "J", "Q", "T", "K", "T", "K", "Q", "J", "A", "J", "J", "K"],
    ["A", "J", "T", "K", "P", "J", "J", "Q", "K", "J", "P", "P", "T", "Q", "J", "Q", "K", "J", "Q", "A"],
    ["A", "Q", "T", "K", "T", "J", "Q", "K", "K", "T", "A", "J", "A", "J", "Q", "T", "K", "P", "J", "J"],
    ["K", "P", "Q", "Q", "K", "A", "Q", "Q", "J", "Q", "T", "Q", "J", "Q", "K", "P", "A", "Q", "A", "T"]
]

export const configs = {
    reel: {
        animationDuration: 3,
        startTween: {
            duration: 0.3,
            intensity: 25
        },
        finishedTween: {
            duration: 0.25,
            intensity: 25
        },
    },
};

export class GameSettings {
    public static playAccessible: boolean = false;

    public static resolvePlayAccessinble(value: boolean): void {
        GameSettings.playAccessible = value;
    }
}