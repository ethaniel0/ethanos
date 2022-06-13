import Terminal from "../apps/Terminal/Terminal";
import Present from "../apps/Present/Present";
import presWeb from '../files/web.pres';
import presElec from '../files/electrical.pres';
import presResearch from '../files/research.pres';
import presApps from '../files/applications.pres';
import devp from '../files/devpost.lnk';
import git from '../files/github.lnk';
import lin from '../files/linkedin.lnk';
import repl from '../files/replit.lnk';
import mail from '../files/mail.lnk';

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
                    "research.pres": presResearch,
                    "devpost.lnk": devp,
                    "github.lnk": git,
                    "linkedin.lnk": lin,
                    "replit.lnk": repl,
                    "mail.lnk": mail
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