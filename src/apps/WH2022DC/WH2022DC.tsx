import * as React from "react";
import Application from "../../components/Application";
import icon from './icon.svg';
import Processes from "../../components/Processes";


export default class WH2022DC implements Application  {
    code: Function;
    name: string;
    icon: string;
    defaultSize: string[];
    resizeable: boolean;
    lines: string[];
    spawnPoint: number[];
    menu: any;

    constructor(){
        this.name = 'WaffleHacks Clue 2';
        this.icon = icon;
        this.defaultSize = ['720px', '360px'];
        this.resizeable = true;
        this.code = () => <iframe className="w-full h-full" src="/wh2022dc"></iframe>;
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