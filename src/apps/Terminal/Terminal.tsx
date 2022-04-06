import * as React from "react";
import Application from "../../components/Application";
import CommandLine from "../../components/CommandLine";
import icon from './assets/icon.svg';

export default class Terminal implements Application {
    code: Function;
    name: string;
    icon: string;
    defaultSize: string[];
    resizeable: boolean;
    commandLine: CommandLine;
    lines: string[];
    

    constructor(){
        this.commandLine = new CommandLine();
        this.name = 'Terminal';
        this.icon = icon;
        this.defaultSize = ['60vw', '50vh'];
        this.resizeable = true;
        this.code = this.window;
    }

    newObject(){
        return new Terminal();
    }
    
    window(){
        let mainStyles = {
            background: 'black',
            width: '100%',
            height: '100%',
            color: 'white'
        }
        return (<>
            <div className="terminal" style={mainStyles}>
                <h1>This is a terminal</h1>
                
                
            </div>
        </>)
    }


}