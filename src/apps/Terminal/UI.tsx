import * as React from 'react';
import { XTerm } from 'xterm-for-react';
import { useRef, useEffect, useState } from "react";
import CommandLine from "../../components/CommandLine";

const UI = () => {

    const [lines, setLines] = useState([]);
    const [commandLine, setCommandLine] = useState(new CommandLine('/E'));
    const [prevCommands, setPrevCommands] = useState([]);
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

    async function callCommand(line: string){
        setPrevCommands([...prevCommands, line]);
        let resp = await commandLine.command(line);
        setLines([...lines, line]);
        let pathname = commandLine.cwd.getName();
        name.current = pathname === '/' ? '$' : pathname;
        return resp;
    }

    async function onData(data: string) {
        
        const code = data.charCodeAt(0);
        
        let escapeChar = code === 27;
        if (code === 13) {
            let response = await callCommand(input.current);
            response = response.split('\n').join('\r\n');
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
            if (cursor.current === 0) return;
            let cur = input.current;
            if (cursor.current === input.current.length){
                ref.current.terminal.write("\b \b");  
            }
            else {
                let after = cur.substring(cursor.current);
                ref.current.terminal.write('\b' + after + ' ');
                for (let i = 0; i <= after.length; i++){
                    ref.current.terminal.write('\b');
                }
            }
            input.current = cur.substring(0, cursor.current-1) + cur.substring(cursor.current);
            cursor.current--;
            
        }
        else if (escapeChar){ // allow arrow keys
            let key = data.substring(1, data.length);
            if (key === '[D' && cursor.current > 0){ // left arrow
                ref.current.terminal.write('\x1b[D');
                cursor.current--;
            }
            if (key === '[C' && cursor.current < input.current.length){ // right arrow
                ref.current.terminal.write('\x1b[C');
                cursor.current++;
            }
            if (key === '[A'){ // up arrow
                if (prevCommands.length > 0){
                    let prev = prevCommands[prevCommands.length - 1];
                    ref.current.terminal.write('\b \b'.repeat(cursor.current));
                    input.current = prev;
                    cursor.current = prev.length;
                    ref.current.terminal.write(prev);
                }
            }
        }
        else if (code < 32) { // Disable control Keys
            return;
        } else { // Add general key press characters to the terminal
            let cur = input.current;
            let right = cur.substring(cursor.current);
            ref.current.terminal.write(data + right);
            for (let i = 0; i < right.length; i++){
                ref.current.terminal.write('\b');
            }
            
            input.current = cur.substring(0, cursor.current) + data + cur.substring(cursor.current);
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