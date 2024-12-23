import * as React from "react";
import Application from "../../components/Application";
import icon from './assets/icon.svg';
import Processes from "../../components/Processes";
import UI from './UI'


export default class Notepad implements Application  {
    code: () => JSX.Element;
    name: string;
    icon: string;
    defaultSize: number[];
    resizeable: boolean;
    lines: string[];
    spawnPoint: number[];
    menu: any;
    file: string;

    constructor(args?: string[]){
        let file = args ? args[0] || null : null;
        this.name = 'Terminal';
        this.icon = icon;
        this.defaultSize = [500, 300];
        this.resizeable = true;
        
        this.lines = [];
        this.spawnPoint = [...Processes.windowSpawnPoint];
        this.file = file;
        this.menu = {
            "File": {
              "New Window": () => {},
            },
            "Window": {
              "Full Screen": () => {},
              "Close Window": () => {}
            },
        };
        this.code = this.app;
    }

    newObject(){
        return new Notepad([]);
    }

    app(){
        return (<>
            <UI filePath={this.file} />
        </>)
    }

}