import * as React from "react";
import Application from "../../components/Application";
import icon from './assets/icon.svg';
import UI from "./UI";
import Processes from "../../components/Processes";

function code(){

    return 

}

export default class Terminal implements Application  {
    code: React.ReactElement<any, any>;
    name: string;
    icon: string;
    defaultSize: string[];
    resizeable: boolean;
    lines: string[];
    spawnPoint: number[];

    constructor(){
        this.name = 'Terminal';
        this.icon = icon;
        this.defaultSize = ['500px', '300px'];
        this.resizeable = true;
        this.code = <UI />;
        this.lines = [];
        this.spawnPoint = [...Processes.windowSpawnPoint];
    }

    newObject(){
        return new Terminal();
    }

}