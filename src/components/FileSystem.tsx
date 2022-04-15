import Terminal from "../apps/Terminal/Terminal";
import Present from "../apps/Present/Present";
import presWeb from '../files/web.pres';
import presElec from '../files/electrical.pres';
import presResearch from '../files/research.pres';
import presApps from '../files/applications.pres';

const FileSystem: any = {
    directories: {
        'E': {
            'Applications': {
                'Present.app': null,
                'Terminal.app': null
            },
            'User': {
                'Desktop': {
                    "web.pres": presWeb,
                    "applications.pres": presApps,
                    "electrical.pres": presElec,
                    "research.pres": presResearch
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