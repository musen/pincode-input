export default class Dispatcher {
    events: any;
    constructor();
    dispatch(eventName: string | number, data: any): void;
    on(eventName: string | number, callback: any): void;
    off(eventName: string | number, callback: any): void;
}
