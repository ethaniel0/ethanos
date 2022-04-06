
export default interface Application {
  code: React.ReactElement<any, any>;
  name: string;
  icon: string;
  defaultSize: string[];
  resizeable: boolean;
  newObject: Function;
}