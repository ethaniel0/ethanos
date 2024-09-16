import * as React from 'react'
import FileDisplay from '../FileDisplay'
import Directory from '../Directory'

var fileLayout: any = {
    "github.lnk": [-4, -2.3],
    "linkedin.lnk": [-3, -2.3],
    "devpost.lnk": [-2, -2.3],
    "mail.lnk": [-1, -2.3]
  }

const MobileApps = () => {
    const [apps, setApps]: [any, Function] = React.useState((new Directory('/E/User/Homescreen')).getFiles())
    return (
        <div style={{width: '100%', flexGrow: 1,  position: 'relative'}} className='block sm:hidden'>

            <div className='p-6 grid w-full md:hidden grid-cols-4 absolute'>
            {apps.map((name: string, ind: number) => {
                return <FileDisplay key={ind} path='/E/User/Homescreen' name={name} pos={fileLayout[name]} mobile={true} />
            })}
            </div>
            
        </div>
    )
}

export default MobileApps