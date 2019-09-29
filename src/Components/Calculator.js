import React from 'react';
import { Container, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Display from './Display';
import Header from './Header'
import Calculation from '../Calculation';
import Delimiter from '../Delimiter';
import CalcButtons from './CalcButtons';
import CalcOptions from './CalcOptions';
import ErrorNotice from './ErrorNotice';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        justifyContent: 'flex-start',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '80%',
    }
}));

export const getSplitInputs = input => input.split('\\n');

const formatDelimiter = delimiter => delimiter.replace('\\', "").split('|');

export const defaultDelimiters = '[,]'

const DEFAULT_MAX_VALUE = 1000;
const DEFAULT_CALC_TYPE = 'add';
const DEFAULT_SHOW_FORMULA = true;
const DEFAULT_ALLOW_NEGATIVES = false;

const Calculator = () => {
    const classes = useStyles();

    const [max, setMax] = React.useState(DEFAULT_MAX_VALUE);
    const [error, setError] = React.useState({
        show: false,
        message: ''
    });
    const [negatives, setNegatives] = React.useState(DEFAULT_ALLOW_NEGATIVES);
    const [calcType, setCalcType] = React.useState(DEFAULT_CALC_TYPE);
    const [formula, setFormula] = React.useState({
        show: DEFAULT_SHOW_FORMULA,
        value: ''
    });
    const [total, setTotal] = React.useState({
        input: '',
        delimiter: '',
        value: 0
    });

    const getInputData = ({ valueInput = total.input, maxInput = max, negativesInput = negatives, type = calcType }) => {
        const hasCustomDelimiter = /\\n/.test(valueInput);
        let delimiter;
        let newCalc;
        let value;

        if (hasCustomDelimiter) {
            let [customDelimiter, values] = getSplitInputs(valueInput);
            delimiter = new Delimiter(defaultDelimiters, customDelimiter).getRegex();
            newCalc = new Calculation(delimiter, values, maxInput, negativesInput);
        } else {
            delimiter = new Delimiter(defaultDelimiters).getRegex();
            newCalc = new Calculation(delimiter, valueInput, maxInput, negativesInput);
        }

        try {
            value = newCalc.getTotal(type);
        } catch (err) {
            setError({ show: true, message: err.message })
        }

        if (formula.show) {
            setFormula({ ...formula, value: newCalc.getFormula(type) })
        }

        return { value, delimiter: formatDelimiter(delimiter.source) }
    };

    const handleTotal = ev => {
        const input = ev.target.value;
        const { value, delimiter } = getInputData({valueInput: input});

        setTotal({ input, delimiter, value });
    };

    const handleMaxChange = ev => {
        const newMax = ev.target.value;
        const { value } = getInputData({ maxInput: newMax });

        setMax(newMax);
        setTotal({ ...total, value });
    }

    const handleCalcButtonClick = type => ev => {
        const { value } = getInputData({ type });

        setCalcType(type);
        setTotal({ ...total, value });
    };

    const handleNegativesUpdate = ev => {
        const { value } = getInputData({ negativesInput: !negatives });

        setNegatives(!negatives);
        setTotal({ ...total, value });
    }

    return (
        <Container maxWidth="sm">
            <ErrorNotice text={error.message} show={error.show} onClose={() => setError({ show: false, message: '' })} />
            <Paper className={classes.root}>
                <Header />
                <CalcButtons handleCalcButtonClick={handleCalcButtonClick} calcType={calcType} />
                <Display total={total.value} delimiter={total.delimiter} />
                <TextField
                    type="number"
                    id="maxInput"
                    label="Max Allowed"
                    value={max}
                    onChange={handleMaxChange}
                    margin="normal"
                />
                <TextField
                    id="input"
                    label="Input"
                    className={classes.textField}
                    helperText={formula.show ? formula.value : ''}
                    value={total.input}
                    onChange={handleTotal}
                    margin="normal"
                />
                <CalcOptions
                    showFormula={formula.show}
                    toggleFormula={ev => setFormula({ ...formula, show: !formula.show })}
                    allowNegatives={negatives}
                    toggleNegatives={handleNegativesUpdate}
                />
            </Paper>
        </Container>
    )
}

export default Calculator;
