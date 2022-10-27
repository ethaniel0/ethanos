import FileSystem from './FileSystem';

export default class Directory {
    path: string;
    directory: any;
    constructor(path: string) {
        if (path.length === 0) path = '/';

        this.path = path;
        this.directory = FileSystem.directories;

        let parts = path.split('/');
        for (let part of parts){
            if (part.length === 0) continue;
            if (part in this.directory && (typeof this.directory[part] === 'object')) this.directory = this.directory[part];
            else {
                this.directory = null;
                break;
            }
        }
    }
    get(path: string): Directory {
        if (path === '') {
            return this;
        }
        // absolute path
        if (path.startsWith('/')){
            let d = new Directory(path);
            if (d.directory == null){
                return null;
            }
            return d;
        }
        // relative path
        else {
            let curPath = this.getPath().substring(0, this.getPath().length - 1).split('/')
            let parts = path.split('/');
            let dir: Directory = this;
            while (parts[0] === '..'){
                parts.splice(0, 1);
                if (dir.getParent() == null) return new Directory('/');
                curPath.pop();
            }
            if (parts[0] == '.') parts.splice(0, 1);
            let newpath = parts.join('/');
            let d = new Directory(curPath.join('/') + (newpath ? '/' + newpath : ""));
            if (d.directory == null) return null;
            return d;
        }
    }
    set(path: string, value: any) {
        if (path === '') {
            this.directory = value;
        }
        else {
            let parts = path.split('/');
            let name = parts.pop();
            let parent = parts.join('/');
            let parentDir = this.get(parent);
            if (parentDir) {
                parentDir.directory[name] = value;
            }
        }
    }
    delete(path: string): any {
        if (path === '') {
            this.directory = {};
        }
        else {
            let parts = path.split('/');
            let name = parts.pop();
            let parent = parts.join('/');
            let parentDir = this.get(parent);
            if (parentDir != null) {
                let deleted = parentDir.directory[name];
                delete parentDir.directory[name];
                return deleted;
            }
            return {};
        }
    }
    getPath(): string {
        if (this.path === '/') return '/';
        else return this.path + '/';
    }
    getName(): string {
        if (this.path === '/') return '/';
        else return this.path.substring(this.path.lastIndexOf('/') + 1);
    }
    getParent(): Directory {
        if (this.path === '/') return null;
        return new Directory(this.path.substring(0, this.path.lastIndexOf('/')));
    }
    getDirectories(): string[] {
        let ret = [];
        for (let key in this.directory) {
            ret.push(key);
        }
        return ret;
    }
    getFiles(): string[] {
        let ret = [];
        for (let key in this.directory) {
            if (typeof this.directory[key] !== 'object') ret.push(key);
        }
        return ret;
    }
    getFile(name: string): any {
        let folder = name.substring(0, name.lastIndexOf('/')).trim();
        if (folder) {
            let d = this.get(folder);
            if (d) return d.getFile(name.substring(folder.length + 1));
        }
        return this.directory[name];
    }
    getFilePath(name: string): string {
        return this.getPath() + name;
    }

}