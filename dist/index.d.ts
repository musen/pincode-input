import '../css/main.scss';
interface IArgs {
    count?: number;
    secure?: boolean;
    previewDuration?: number;
    onInput?: Function;
}
export default class PincodeInput {
    args: any;
    count: number;
    secure: boolean;
    previewDuration: number;
    selector: HTMLElement;
    cells: Array<HTMLInputElement>;
    focusedCellIdx: number;
    value: string;
    onInput: Function;
    constructor(selector: string, args: IArgs);
    private setCells;
    private initCells;
    private onCellChanged;
    private onKeyDown;
    private onCellErase;
    private focusPreviousCell;
    private focusNextCell;
    private focusCellByIndex;
    private isTheCellValid;
    getValue(): void;
}
export {};
