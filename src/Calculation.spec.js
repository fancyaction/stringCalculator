import Calculation from './Calculation';
import Delimiter from './Delimiter';

const defaultDelimiters = [',', '\\n']

describe('Calculation supports a maximum of 2 numbers using a comma delimiter', () => {
    let delimiter;

    beforeEach(() => {
        delimiter = new Delimiter(defaultDelimiters).getRegex();
    });

    it('Returns single input', () => {
        const calculationTotal = new Calculation(delimiter, '20').getTotal();

        expect(calculationTotal).toBe(20);
    })
    it('Combines two inputs', () => {
        const calculationTotal = new Calculation(delimiter, '1,5000').getTotal();

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

})
