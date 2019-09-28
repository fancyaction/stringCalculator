import Calculation from './Calculation';
import { getSplitInputs } from './Components/Calculator';
import Delimiter from './Delimiter';

// const defaultDelimiters = [',', '\\n']
const defaultDelimiters = '[,]'

describe('Calculation supports inputs with default delimiters', () => {
    let delimiter;

    beforeEach(() => {
        delimiter = new Delimiter(defaultDelimiters).getRegex();
    });

    it('Returns single input', () => {
        const calculationTotal = new Calculation(delimiter, '20').getTotal();

        expect(calculationTotal).toBe(20);
    })

    it('Combines two inputs', () => {
        const calculationTotal = new Calculation(delimiter, '1,5000', 5000).getTotal();

        expect(calculationTotal).toBe(5001);
    })

    it('Converts invalid/missing number to 0', () => {
        const calculationTotal = new Calculation(delimiter, '').getTotal();

        expect(calculationTotal).toBe(0);
    })

    it('Combines invalid and valid inputs', () => {
        const calculationTotal = new Calculation(delimiter, '5,tytyt').getTotal();

        expect(calculationTotal).toBe(5);
    })

    it('Combines unlimited number of inputs', () => {
        const calculationTotal = new Calculation(delimiter, '1,2,3,4,5,6,7,8,9,10,11,12').getTotal();

        expect(calculationTotal).toBe(78);
    })

    it('Supports newline character as an alternative delimiter', () => {
        const delimiter = new Delimiter(defaultDelimiters, '\n').getRegex();
        const calculationTotal = new Calculation(delimiter, '1\n2,3').getTotal();

        expect(calculationTotal).toBe(6);
    })

    it('Returns error containing array of negative numbers', () => {
        try {
            new Calculation(delimiter, '-3,-6,-11', 1000, true).getTotal();
        } catch (e) {
            expect(e.message).toBe('These negative inputs are not allowed: -3,-6,-11');
        }
    })

    it('Ignores any number greater than 1000', () => {
        const calculationTotal = new Calculation(delimiter, '2,1001,6').getTotal();

        expect(calculationTotal).toBe(8);
    })
})

describe('Calculation supports inputs with custom delimiters', () => {
    it('Supports custom single character length delimiter', () => {
        const [customDelimiter, values] = getSplitInputs('//;\n2;5');

        const delimiter = new Delimiter(defaultDelimiters, customDelimiter).getRegex();
        const calculationTotal = new Calculation(delimiter, values).getTotal();

        expect(calculationTotal).toBe(7);
    })

    it('Supports custom delimiter of any length', () => {
        const [customDelimiter, values] = getSplitInputs('//[***]\n11***22***33');

        const delimiter = new Delimiter(defaultDelimiters, customDelimiter).getRegex();
        const calculationTotal = new Calculation(delimiter, values).getTotal();

        expect(calculationTotal).toBe(66);
    })

    it('Support multiple delimiter of any length', () => {
        const [customDelimiter, values] = getSplitInputs('//[*][!!][r9r]\n11r9r22*33!!44');

        const delimiter = new Delimiter(defaultDelimiters, customDelimiter).getRegex();
        const calculationTotal = new Calculation(delimiter, values).getTotal();

        expect(calculationTotal).toBe(110);
    })
});