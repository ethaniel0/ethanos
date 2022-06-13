
export default interface Application {
  code: Function;
  name: string;
  icon: string;
  defaultSize: string[];
  spawnPoint: number[];
  minWidth?: number;
  minHeight?: number;
  resizeable: boolean;
  newObject: Function;
  menu: any;
}