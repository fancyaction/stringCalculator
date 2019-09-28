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

    it('Combines unlimited number of inputs', () => {
        const calculationTotal = new Calculation(delimiter, '1,2,3,4,5,6,7,8,9,10,11,12').getTotal();

        expect(calculationTotal).toBe(78);
    })
    
    it('Supports newline character as an alternative delimiter', () => {
        const calculationTotal = new Calculation(delimiter, '1\n2,3').getTotal();

        expect(calculationTotal).toBe(6);
    })

    it('Returns error containing array of negative numbers', () => {
        try {
            new Calculation(delimiter, '-3,-6,-11').getTotal();
        } catch (e) {
            expect(e.message).toBe('These negative inputs are not allowed: -3,-6,-11');
        }
    })
})
