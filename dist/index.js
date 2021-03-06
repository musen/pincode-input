'use strict';

var CELL_REGEXP = '^\\d{1}$';

var PincodeInput = /** @class */ (function () {
    function PincodeInput(selector, args) {
        var _a = args.count, count = _a === void 0 ? 4 : _a, _b = args.secure, secure = _b === void 0 ? false : _b, _c = args.previewDuration, previewDuration = _c === void 0 ? 200 : _c;
        this.args = args;
        this.selector = document.querySelector(selector);
        this.count = count;
        this.secure = secure;
        this.previewDuration = previewDuration;
        this.cells = [];
        this.focusedCellIdx = 0;
        this.value = '';
        this.setCells();
    }
    PincodeInput.prototype.setCells = function () {
        for (var i = 0; i < this.count; i++) {
            var cell = document.createElement('input');
            cell.classList.add('pincode-input');
            this.cells.push(cell);
            this.selector.appendChild(cell);
        }
        this.initCells();
    };
    PincodeInput.prototype.initCells = function () {
        var _this = this;
        this.cells.forEach(function (p, i) {
            p.addEventListener('input', function (e) {
                var element = e.currentTarget;
                var value = element.value;
                _this.onCellChanged(i, value, e);
            });
            p.addEventListener('focus', function () {
                _this.focusedCellIdx = i;
            });
            p.addEventListener('keydown', function (e) {
                _this.onKeyDown(e, i);
                if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' &&
                    e.key !== 'ArrowDown' && e.key !== 'Backspace' && e.key !== 'Delete') {
                    _this.cells[i].setAttribute('type', 'text');
                }
            });
            p.addEventListener('focus', function () {
                p.classList.add('pincode-input--focused');
            });
            p.addEventListener('blur', function () {
                p.classList.remove('pincode-input--focused');
            });
        });
    };
    PincodeInput.prototype.onCellChanged = function (index, newVal, e) {
        var _this = this;
        if (!this.isTheCellValid(newVal)) {
            this.cells[index].classList.remove('pincode-input--filled');
            this.cells[index].value = '';
            this.getValue();
            return;
        }
        this.cells[index].classList.add('pincode-input--filled');
        if (this.secure && this.previewDuration) {
            setTimeout(function () {
                _this.cells[index].setAttribute('type', 'password');
            }, this.previewDuration);
        }
        this.getValue();
        this.focusNextCell();
    };
    PincodeInput.prototype.onKeyDown = function (e, index) {
        switch (e.key) {
            case 'ArrowLeft':
                this.focusPreviousCell();
                break;
            case 'ArrowRight':
                this.focusNextCell();
                break;
            case 'Backspace':
                if (!this.cells[index].value.length)
                    this.onCellErase(index, e);
        }
    };
    PincodeInput.prototype.onCellErase = function (index, e) {
        var isThisCellFilled = this.cells[index].value.length;
        if (!isThisCellFilled) {
            this.focusPreviousCell();
            e.preventDefault();
        }
    };
    PincodeInput.prototype.focusPreviousCell = function () {
        if (!this.focusedCellIdx)
            return;
        this.focusCellByIndex(this.focusedCellIdx - 1);
    };
    PincodeInput.prototype.focusNextCell = function () {
        if (this.focusedCellIdx === this.cells.length - 1)
            return;
        this.focusCellByIndex(this.focusedCellIdx + 1);
    };
    PincodeInput.prototype.focusCellByIndex = function (index) {
        if (index === void 0) { index = 0; }
        var el = this.cells[index];
        el.focus();
        el.select();
        this.focusedCellIdx = index;
    };
    PincodeInput.prototype.isTheCellValid = function (cell) {
        return !!cell.match(CELL_REGEXP);
    };
    PincodeInput.prototype.getValue = function () {
        var _this = this;
        this.value = '';
        this.cells.forEach(function (p) {
            _this.value += p.value;
        });
        this.args.onInput(this.value);
    };
    return PincodeInput;
}());

module.exports = PincodeInput;
