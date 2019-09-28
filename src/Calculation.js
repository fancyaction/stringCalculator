export default class Calculation {
    constructor(delimiter, inputValue, maxValue = 1000, allowNegatives = false) {
        this.delimiter = delimiter;
        this.inputValue = inputValue;
        this.maxValue = maxValue;
        this.allowNegatives = allowNegatives;
    }

    getNumber = value => Number.isNaN(parseInt(value)) ||  parseInt(value) > this.maxValue ? 0 : parseInt(value);

    validateInput = inputs => {
        const invalidNumbers = inputs.filter(val => -1 === Math.sign(val));

        if (0 < invalidNumbers.length && true === this.allowNegatives) {
            throw Error(`These negative inputs are not allowed: ${invalidNumbers}`);
        }
    }

    getTotal = (type = 'add') => {
        const { inputValue, delimiter } = this;
        const inputsArr = inputValue.split(delimiter);
        let total = 0;
        
        this.validateInput(inputsArr);

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
