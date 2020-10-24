import "../html/styles/style.css";
import { EmreBase } from "src/scripts/game/EntryPoint"; 
new EmreBase.EntryPoint();
declare global {
    interface Window { Game: any; }
}
window.Game = EmreBase;