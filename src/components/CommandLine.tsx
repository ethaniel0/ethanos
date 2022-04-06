import Directory from "./Directory";

export default class CommandLine{
    cwd: Directory;

    constructor(cwd?:string){
        if (cwd) this.cwd = new Directory(cwd);
        else this.cwd = new Directory('/');
    }
    command(input: string): string{
        let parts = input.split(' ');
        let command = parts[0];
        let args = parts.slice(1);
        switch(command){
            case 'cd':
                let d = this.cwd.get(args[0]);
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