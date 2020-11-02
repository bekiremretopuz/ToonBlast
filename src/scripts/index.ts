import "../html/styles/style.css";
import { EmreBase } from "src/scripts/game/EntryPoint";  
declare global {
    interface Window { Game: any; }
}
new EmreBase.EntryPoint();
window.Game = EmreBase;