import * as React from 'react';
import { XTerm } from 'xterm-for-react';
import { useRef, useEffect, useState } from "react";
import CommandLine from "../../components/CommandLine";

const UI = () => {

    const [lines, setLines] = useState([]);
    const [commandLine, setCommandLine] = useState(new CommandLine('/E'))
    const name = useRef('/');
    
    let ref = useRef(null);

    let input = useRef('');
    let cursor = useRef(0);

    let cwd = commandLine.cwd;
    let pathname = cwd.getName();
    name.current = pathname === '/' ? '$' : pathname;

    let mainStyles = {
        background: 'black',
        width: '100%',
        height: '100%',
        color: 'white',
        padding: '0.5rem'
    }

    useEffect(() => {
        // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
        ref.current.terminal.write(`${name.current}> `);
    }, [])

    function callCommand(line: string){
        let resp = commandLine.command(line);
        setLines([...lines, line]);
        let pathname = commandLine.cwd.getName();
        name.current = pathname === '/' ? '$' : pathname;
        console.log('current:', pathname, name.current);
        return resp;
    }

    function onData(data: string) {
        
        const code = data.charCodeAt(0);
        
        let escapeChar = code === 27;
        if (code === 13) {
            let response = callCommand(input.current);
            if (response.length > 0) {
                ref.current.terminal.write(
                    "\r\n" + response + "\r\n"
                );
            }
            else {
                ref.current.terminal.write("\r\n");
            }
            ref.current.terminal.write(`${name.current}> `);
            input.current = '';
            cursor.current = 0;
        } 
        else if (code === 127){ // allow deleting characters
            if (cursor.current > 0){
                ref.current.terminal.write("\b \b");  
                let cur = input.current;
                input.current = cur.substring(0, cursor.current-1) + cur.substring(cursor.current);
                cursor.current--;
            }
        }
        else if (escapeChar){ // allow arrow keys
            let key = data.substring(1, data.length);
            if (key === '[D'){ // left arrow
                ref.current.terminal.write("\b");
                cursor.current--;
            }
        }
        else if (code < 32) { // Disable control Keys such as arrow keys
            return;
        } else { // Add general key press characters to the terminal
            ref.current.terminal.write(data);
            let cur = input.current;
            input.current = cur.substring(0, cursor.current) + data + cur.substring(cursor.current+1);
            cursor.current++;
        }
    }

    
    
    return (<>
        <div className="terminal" style={mainStyles}>
            <XTerm ref={ref} onData={onData} />    
        </div>
    </>)
}

export default UI