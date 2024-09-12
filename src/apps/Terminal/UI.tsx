import * as React from 'react';
import { useRef, useState, useEffect } from "react";
import CommandLine from "../../components/CommandLine";
import styles from "./styles.module.css";

const UI = () => {

    const [lines, setLines] = useState([]);
    const commandLine = new CommandLine('/E');
    const [prevCommands, setPrevCommands] = useState([]);
    const [showCursor, setShowCursor] = useState<boolean>(true);
    const [line, setLine] = useState('');
    const name = useRef('/');
    
    let ref = useRef(null);

    let cwd = commandLine.cwd;
    let pathname = cwd.getName();
    name.current = pathname === '/' ? '$' : pathname;

    async function callCommand(line: string){
        setPrevCommands([...prevCommands, line]);
        let resp = await commandLine.command(line);
        setLines([...lines, line]);
        let pathname = commandLine.cwd.getName();
        name.current = pathname === '/' ? '$' : pathname;
        return resp;
    }

    async function onKey(e: React.KeyboardEvent<HTMLDivElement>){
        if (e.key === 'Enter') {
            if (line.trim() === 'clear'){
                setLines([]);
                setLine('');
                return;
            }

            let response = await callCommand(line.trim());
            let responses = response.split('\n');
            let cwd_prefix = cwd.path.trim() + '>';
            setLines([...lines, cwd_prefix + line, ...responses]);
            setLine('');
            // scroll to bottom of div
            setTimeout(() => {
                ref.current.scrollTo({
                    top: ref.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
        else if (e.key === 'Backspace'){
            setLine(line.substring(0, line.length - 1));
        }
        else if (e.key === 'Tab') {
            let lineParts = line.split(' ');
            let lastTyped = lineParts[lineParts.length - 1];
            if (lastTyped.length < 2) return;
            let dirs = cwd.getDirectories();
            let possible = dirs.filter(d => d.startsWith(lastTyped));
            if (possible.length >= 1){
                let line = lineParts.slice(0, lineParts.length - 1).join(' ') + ' ' + possible[0];
                setLine(line.trim());
            }
        }
        else if (e.key.length === 1){
            setLine(line + e.key);
        }
    }
    
    useEffect(() => {
        function handleCursor(){
            setShowCursor(cursor => !cursor);
        }
        let interval = setInterval(handleCursor, 750);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (<>
        <div onKeyDown={onKey}
            className={"terminal " + styles.terminal_screen}
            tabIndex={0}
            ref={ref}
            style={{overflow: 'auto'}}
        >
            <div>
                {lines.map((line, i) => <div key={i}>{line}</div>)}
            </div>
            <span>{cwd.path.trim()}&gt;</span>
            <span>{line}</span>
            <span style={{display: showCursor ? '' : 'none'}}>▌</span>
            {/* <span>Terminal is being updated, check back soon!</span> */}
        </div>
    </>)
}

export default UI