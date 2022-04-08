
export default interface Application {
  code: React.ReactElement<any, any>;
  name: string;
  icon: string;
  defaultSize: string[];
  spawnPoint: number[];
  minWidth?: number;
  minHeight?: number;
  resizeable: boolean;
  newObject: Function;
}