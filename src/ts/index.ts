import '../css/main.scss'
import { CELL_REGEXP } from './constants';

interface IArgs {
  count?: number
  secure?: boolean
  previewDuration?: number
  onInput?: Function
}

export default class PincodeInput {
  args: any
  count: number
  secure: boolean
  previewDuration: number
  selector: HTMLElement
  cells: Array<HTMLInputElement>
  focusedCellIdx: number
  value: string
  onInput: Function

  constructor(selector: string, args: IArgs) {
    const {
      count = 4,
      secure = false,
      previewDuration = 200
    } = args

    this.args = args
    this.selector = document.querySelector(selector)
    this.count = count
    this.secure = secure
    this.previewDuration = previewDuration
    this.cells = []
    this.focusedCellIdx = 0
    this.value = ''

    this.setCells()
  }

  private setCells():void {
    for(let i = 0; i < this.count; i++) {
      const cell = <HTMLInputElement>document.createElement('input')
      cell.classList.add('pincode-input')
      this.cells.push(cell)
      this.selector.appendChild(cell)
    }

    this.initCells()
  }

  private initCells():void {
    this.cells.forEach((p:HTMLInputElement, i:number) => {
      p.addEventListener('input', (e: KeyboardEvent) => {
        const element = e.currentTarget as HTMLInputElement
        const value = element.value
        this.onCellChanged(i, value, e)
      })

      p.addEventListener('focus', () => {
        this.focusedCellIdx = i
      })

      p.addEventListener('keydown', e => {
        this.onKeyDown(e, i)

        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' &&
            e.key !== 'ArrowDown' && e.key !== 'Backspace' && e.key !== 'Delete') {
          this.cells[i].setAttribute('type', 'text')
        }
      })

      p.addEventListener('focus', () => {
        p.classList.add('pincode-input--focused')
      })

      p.addEventListener('blur', () => {
        p.classList.remove('pincode-input--focused')
      })
    })
  }

  private onCellChanged(index:number, newVal:string, e: KeyboardEvent):void {
    if (!this.isTheCellValid(newVal)) {
      this.cells[index].classList.remove('pincode-input--filled')
      this.cells[index].value = '';
      this.getValue()
      return;
    }

    this.cells[index].classList.add('pincode-input--filled')

    if (this.secure && this.previewDuration) {
      setTimeout(() => {
        this.cells[index].setAttribute('type', 'password')
      }, this.previewDuration)
    }

    this.getValue()
    this.focusNextCell()
  }

  private onKeyDown(e: KeyboardEvent, index:number):void {
    switch (e.key) {
      case 'ArrowLeft':
        this.focusPreviousCell();
        break;
      case 'ArrowRight':
        this.focusNextCell();
        break;
      case 'Backspace':
        if (!this.cells[index].value.length) this.onCellErase(index, e)
      default:
        break;
    }
  }

  private onCellErase(index: number, e: Event): void {
    const isThisCellFilled = this.cells[index].value.length;
    if (!isThisCellFilled) {
      this.focusPreviousCell();
      e.preventDefault();
    }
  }

  private focusPreviousCell():void {
    if (!this.focusedCellIdx) return;
    this.focusCellByIndex(this.focusedCellIdx - 1);
  }

  private focusNextCell():void {
    if (this.focusedCellIdx === this.cells.length - 1) return;
    this.focusCellByIndex(this.focusedCellIdx + 1);
  }

  private focusCellByIndex(index: number = 0):void {
    const el = this.cells[index]
    el.focus();
    el.select();
    this.focusedCellIdx = index;
  }

  private isTheCellValid(cell: string): boolean {
    return !!cell.match(CELL_REGEXP);
  }

  public getValue():void {
    this.value = ''
    this.cells.forEach((p:HTMLInputElement) => {
      this.value += p.value
    })

    this.args.onInput(this.value)
  }
}
