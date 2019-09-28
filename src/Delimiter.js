export default class Delimiter {
    constructor(defaultInput = '', customInput = '') {
        this.defaultInput = defaultInput;
        this.customInput = customInput;
    }

    sanitizeInputs = () => {
        const { customInput, defaultInput } = this;
        let sanitized = this.getValues(customInput + defaultInput);

        return sanitized.map(val => this.fixAsterisk(val))
    };

    removeOpening = () => this.customInput.replace(/^(\/\/)/, "");
    getValues = data => data.split(/\[(.*?)\]/).filter(val => val);
    fixAsterisk = val => val.replace(/\*/g, '\\*');

    getRegex = () => {
        const { customInput } = this;
        if ('' !== customInput) {
            this.customInput = this.removeOpening();
        }

        const allInputs = this.sanitizeInputs();
        const regexStr = allInputs.reduce((prev, curr) => prev + `|${curr}`)

        return new RegExp(regexStr);
    }

}