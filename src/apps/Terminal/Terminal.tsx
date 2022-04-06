import * as React from "react";
import Application from "../../components/Application";
import CommandLine from "../../components/CommandLine";
import icon from './assets/icon.svg';
import UI from "./UI";
import { useState } from "react";

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

    constructor(){
        this.name = 'Terminal';
        this.icon = icon;
        this.defaultSize = ['60vw', '50vh'];
        this.resizeable = true;
        this.code = <UI />;
        this.lines = [];
    }

    newObject(){
        return new Terminal();
    }

}