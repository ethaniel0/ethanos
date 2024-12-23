import * as React from "react";
import Application from "../../components/Application";
import icon from './icon.svg';
import Processes from "../../components/Processes";
import UI from './UI';


export default class WH2022DC implements Application  {
    code: () => JSX.Element;
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
        this.code = () => <UI />;
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