export default class Calculation {
    constructor(delimiter, inputValue, maxValue = 1000, allowNegatives = false) {
        this.delimiter = delimiter;
        this.inputValue = inputValue;
        this.maxValue = maxValue;
        this.allowNegatives = allowNegatives;
    }

    getNumber = value => {
        const negativeNotAllowed = val => -1 === Math.sign(parseInt(val)) && !this.allowNegatives;

        if (Number.isNaN(parseInt(value)) || parseInt(value) > this.maxValue || negativeNotAllowed(value)) {
            return 0;
        }

        return parseInt(value);
    };

    validateInput = inputs => {
        const invalidNumbers = inputs.filter(val => -1 === Math.sign(val));

        if (0 < invalidNumbers.length) {
            throw Error(`These negative inputs are not allowed: ${invalidNumbers}`);
        }
    }

    getFormula = (type = 'add') => {
        const { inputValue, delimiter } = this;
        const inputsArr = inputValue.split(delimiter);
        let symbol;

        switch (type) {
            case 'add':
                symbol = '+';
                break;

            case 'subtract':
                symbol = '-'
                break;

            case 'multiply':
                symbol = '*'
                break;

            default:
                symbol = '/'
                break;
        }

        return inputsArr.map(val => this.getNumber(val)).join(symbol);
    }

    getTotal = (type = 'add') => {
        const { inputValue, delimiter } = this;
        const inputsArr = inputValue.split(delimiter);
        let total = 0;

        if (false === this.allowNegatives) {
            this.validateInput(inputsArr);
        }

        switch (type) {
            case 'add':
                total = inputsArr.reduce((prev, curr) => prev + this.getNumber(curr), 0);
                break;

            case 'subtract':
                total = inputsArr.reduce((prev, curr) => prev - this.getNumber(curr), 0);
                break;

            case 'multiply':
                total = inputsArr.reduce((prev, curr) => prev * this.getNumber(curr), 1);
                break;

            default:
                total = inputsArr.reduce((prev, curr) => prev / this.getNumber(curr), 1);
                break;
        }

        return total;
    }

}
