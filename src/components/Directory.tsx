let directory = {
    'E': {
        'Applications': {
            
        },
        'User': {
            'Desktop': {

            },
            'Program Files': {

            }

        }
    }
}


export default class Directory {
    path: string;
    directory: any;
    parent: Directory;
    constructor(path: string) {
        this.path = path;
        this.directory = directory;
        if (path === '/') this.parent = null;
        else this.parent = new Directory(path.substring(0, path.lastIndexOf('/')));

        let parts = path.split('/');
        for (let part of parts){
            if (part in this.directory) this.directory = this.directory[part] || null;
            if (this.directory === null) break;
        }
    }
    get(path: string): Directory {
        if (path === '') {
            return this;
        }
        // absolute path
        if (path.startsWith('/')){
            let d = new Directory(path);
            if (d.directory == null) return null;
            return d;
        }
        // relative path
        else {
            let parts = path.split('../');
            let dir: Directory = this;
            for (let i = 0; i < parts.length - 1; i++) {
                if (dir.parent == null) return null;
                dir = dir.parent;
            }
            let newpath = parts.pop();
            return dir.get(newpath);
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

}