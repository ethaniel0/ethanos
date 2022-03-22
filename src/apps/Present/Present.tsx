import * as React from 'react'
import Application from '../../components/Application';

class Present implements Application {
  name: string;
  icon: string;
  defaultSize: string[];
  resizeable: boolean;
  code: Function;
  page: number;
  file: string;


  constructor(file?: string){
    this.code = null;
    this.name = "Present";
    this.icon = "/assets/icon.svg",
    this.defaultSize = ['60vw', '50vh'],
    this.resizeable = false;
    
    if (file){
      this.file = file;
      this.page = 1;
    }
    else {
      this.file = ''
      this.page = 0;
    }
  }
  
  landing(){
    return (<>
    
    </>)
  }

  loadPage(){
    return (<></>)
  }

  app(){
    return (<>
      {this.page == 0 && this.landing()}
      {this.page == 1 && this.loadPage()}
    </>)
  }

}

// const Present = () => {
//   return (
//     <div>Present</div>
//   )
// }

export default Present