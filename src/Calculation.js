export default class Calculation {
    constructor(delimiter, inputValue) {
        this.delimiter = delimiter;
        this.inputValue = inputValue;
    }

    getNumber = value => Number.isNaN(parseInt(value)) ? 0 : parseInt(value);

    getTotal = () => {
        const { inputValue, delimiter } = this;

        const inputsArr = inputValue.split(delimiter);

        return inputsArr.reduce((prev, curr) => prev + this.getNumber(curr), 0);

    }

}
