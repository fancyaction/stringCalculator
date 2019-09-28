export default class Delimiter {
    constructor(data) {
        this.data = data;
    }

    getRegex = () => {
        const { data } = this;
        const regexStr = data.reduce((prev, curr) => prev + `|${curr}`)

        return new RegExp(regexStr);
    }

}