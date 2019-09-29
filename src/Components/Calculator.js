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

    const handleTotal = ev => {
        const input = ev.target.value;
        const hasCustomDelimiter = /\\n/.test(input);
        let delimiter = null;
        let value = 0;

        if (hasCustomDelimiter) {
            let [customDelimiter, values] = getSplitInputs(input);
            delimiter = new Delimiter(defaultDelimiters, customDelimiter).getRegex();
            value = new Calculation(delimiter, values, max).getTotal(calcType);

            return setTotal({ input, delimiter: formatDelimiter(delimiter.source), value });
        }

        delimiter = new Delimiter(defaultDelimiters).getRegex();
        value = new Calculation(delimiter, input, max).getTotal(calcType);

        setTotal({ input, delimiter: formatDelimiter(delimiter.source), value });
    };

    const handleMaxChange = ev => {
        const newMax = ev.target.value;
        const value = new Calculation(total.delimiter, total.input, newMax).getTotal(calcType);

        setMax(newMax);
        setTotal({ ...total, value });
    }

    const handleCalcButtonClick = type => ev => {
        const value = new Calculation(total.delimiter, total.input, max).getTotal(type);

        setCalcType(type);
        setTotal({ ...total, value });
    };

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
