import Terminal from "../apps/Terminal/Terminal";
import Present from "../apps/Present/Present";

const FileSystem = {
    directories: {
        'E': {
            'Applications': {
                'Present.app': null,
                'Terminal.app': null
            },
            'User': {
                'Desktop': {
    
                },
                'Program Files': {
                    
                }
            }
        }
    },
    initDirectories: function() {
        this.directories.E.Applications['Present.app'] = Present;
        this.directories.E.Applications['Terminal.app'] = Terminal;
    }

}
export default FileSystem;