import * as React from "react";
import Application from "../../components/Application";
import icon from './assets/icon.svg';
import UI from "./UI";
import Processes from "../../components/Processes";

function code(){

    return 

}

export default class Terminal implements Application  {
    code: Function;
    name: string;
    icon: string;
    defaultSize: string[];
    resizeable: boolean;
    lines: string[];
    spawnPoint: number[];
    menu: any;

    constructor(){
        this.name = 'Terminal';
        this.icon = icon;
        this.defaultSize = ['500px', '300px'];
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
        return new Terminal();
    }

}