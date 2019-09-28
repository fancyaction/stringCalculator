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

    getTotal = () => {
        const { inputValue, delimiter } = this;
        const inputsArr = inputValue.split(delimiter);

        this.validateInput(inputsArr);
        return inputsArr.reduce((prev, curr) => prev + this.getNumber(curr), 0);
    }

}
