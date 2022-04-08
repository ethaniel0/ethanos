import Directory from "./Directory";

export default class CommandLine{
    cwd: Directory;

    constructor(cwd?:string){
        if (cwd) this.cwd = new Directory(cwd);
        else this.cwd = new Directory('/');
    }
    parseCommand(input: string){
        let parts = [];
        let curString = '';
        let inString = false;
        let escapeSpace = false;
        for (let i = 0; i < input.length; i++){
            let c = input.charAt(i);
            if (c !== ' '){
                if (c === '\\'){
                    escapeSpace = true;
                }
                else if (c === '"'){
                    if (inString){
                        parts.push(curString);
                        curString = '';
                        inString = false;
                    }
                    else {
                        inString = true;
                    }
                }
                else {
                    curString += c
                }
            }
            else {
                if (inString){
                    curString += c;
                    continue;
                }
                if (escapeSpace){
                    curString += ' ';
                    escapeSpace = false;
                    continue;
                }
                else parts.push(curString);
                curString = '';
            }
        }
        if (curString.length > 0) parts.push(curString);
        return parts;
    }
    command(input: string): string{
        let parts = this.parseCommand(input);
        console.log('PARTS:', parts);
        let command = parts[0];
        let args = parts.slice(1);
        switch(command){
            case 'cd':
                let d = this.cwd.get(args[0] || '');
                if (d !== null){
                    this.cwd = d;
                    return '';
                }
                return 'cd: no such file or directory: ' + args[0];
            case 'ls':
                return this.ls(args);
            case 'cat':
                return this.cat(args);
            case 'clear':
                return this.clear();
            case 'help':
                return this.help();
            default:
                return `Command not found: ${command}`;
        }
    }
    ls(args: string[]): string{
        let dirs = this.cwd.getDirectories();
        if (dirs.length === 0) return ' ';
        return dirs.join('    ');
    }
    cat(args: string[]): string{
        return '';
    }
    clear(): string{
        return '';
    }
    help(): string{
        return '';
    }

}