import * as React from "react";
import Application from "../../components/Application";
import icon from './assets/icon.svg';
import UI from "./UI";
import Processes from "../../components/Processes";


export default class Terminal implements Application  {
    name: string;
    icon: string;
    defaultSize: number[];
    resizeable: boolean;
    lines: string[];
    spawnPoint: number[];
    menu: any;

    constructor(){
        this.name = 'Terminal';
        this.icon = icon;
        this.defaultSize = [500, 300];
        this.resizeable = true;
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

    code(){
      return <UI />; 
    }

}