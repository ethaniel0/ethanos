import * as React from "react";
import Application from "../../components/Application";
import icon from './icon.png';
import Processes from "../../components/Processes";


export default class WH2022DC implements Application  {
    code: Function;
    name: string;
    icon: string;
    defaultSize: number[];
    resizeable: boolean;
    lines: string[];
    spawnPoint: number[];
    menu: any;

    constructor(){
        this.name = 'WaffleHacks Clue 2';
        this.icon = icon;
        this.defaultSize = [720, 360];
        this.resizeable = true;
        this.code = () => <iframe className="w-full h-full" src="https://bfd6afaa-c465-4fe4-b3e5-9231958eac68-00-c6zcsvocoe3f.kirk.replit.dev/" allow="camera"></iframe>;
        this.lines = [];
        this.spawnPoint = [...Processes.windowSpawnPoint];
        this.menu = {
            "File": {
              "New Window": () => {},
            },
            "Window": {
              "Full Screen": () => {},
              "Close Window": () => {}
            },
          };
    }

    newObject(){
        return new WH2022DC();
    }

}