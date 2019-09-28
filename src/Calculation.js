export default class Calculation {
    constructor(delimiter, inputValue) {
        this.delimiter = delimiter;
        this.inputValue = inputValue;
    }

    getNumber = value => Number.isNaN(parseInt(value)) ? 0 : parseInt(value);

    validateInput = inputs => {
        const invalidNumbers = inputs.filter(val => -1 === Math.sign(val));

        if (0 < invalidNumbers.length) {
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
