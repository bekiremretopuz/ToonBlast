import "styles/style.css";   
import {EmreBase} from "app/EntryPoint"; 
new EmreBase.EntryPoint();
declare global {
    interface Window { Game: any; }
}
window.Game = EmreBase;