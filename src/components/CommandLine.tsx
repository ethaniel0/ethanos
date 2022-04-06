import Directory from "./Directory";

export default class CommandLine{
    cwd: Directory;

    constructor(cwd?:string){
        if (cwd) this.cwd = new Directory(cwd);
        else this.cwd = new Directory('/');
    }
    command(input: string){
        let parts = input.split(' ');
        let command = parts[0];
        let args = parts.slice(1);
        switch(command){
            case 'cd':
                this.cwd = this.cwd.get(args[0]);
                break;
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
    ls(args: string[]){
        let d = this.cwd;
        if (args.length > 0) d = this.cwd.get(args[0]);
        let ret = '';
        for (let key in d.directory){
            ret += key + '\t';
        }
        return ret;
    }
    cat(args: string[]){

    }
    clear(){
    }
    help(){

    }

}