import Terminal from "../apps/Terminal/Terminal";
import Present from "../apps/Present/Present";
import Notepad from "../apps/Notepad/Notepad";
import WH2022DC from "../apps/WH2022DC/WH2022DC";
import Welcome from "../apps/Welcome/Welcome";
import FaceAPI from "../apps/FaceAPI/FaceAPI";
import present2File from '../files/present2.lnk';
import Present2 from "../apps/Present2/Present2";

import devp from '../files/devpost.lnk';
import git from '../files/github.lnk';
import lin from '../files/linkedin.lnk';
import repl from '../files/replit.lnk';
import mail from '../files/mail.lnk';
import presMobile from '../files/presentMobile.lnk';

const FileSystem: any = {
    directories: {
        'E': {
            'Applications': {
                'Welcome.app': null,
                'Present.app': null,
                'Present2.app': null,
                'Terminal.app': null,
                'Notepad.app': null,
                "WaffleHacks2022Clue2.app": null,
                "FaceAPI.app": null
            },
            'User': {
                'Desktop': {
                    "Present.lnk": present2File,
                    "devpost.lnk": devp,
                    "github.lnk": git,
                    "linkedin.lnk": lin,
                    "replit.lnk": repl,
                    "mail.lnk": mail
                },
                'Homescreen': {
                    "Present": presMobile,
                    "Linkedin": lin,
                    "Replit": repl,
                    "Mail": mail
                },
                'Program Files': {
                    
                }
            }
        }
    },
    initDirectories: function() {
        this.directories.E.Applications['Welcome.app'] = Welcome;
        this.directories.E.Applications['Present.app'] = Present;
        this.directories.E.Applications['Present2.app'] = Present2;
        this.directories.E.Applications['Terminal.app'] = Terminal;
        this.directories.E.Applications['Notepad.app'] = Notepad;
        this.directories.E.Applications["WaffleHacks2022Clue2.app"] = WH2022DC;
        this.directories.E.Applications["FaceAPI.app"] = FaceAPI;
    }

}
export default FileSystem;