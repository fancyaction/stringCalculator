import React, { useState } from 'react';
import { Container, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Display from './Display';
import Header from './Header'
import Calculation from '../Calculation';
import Delimiter from '../Delimiter';

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

export const defaultDelimiters = '[,]'

const Calculator = () => {
    const classes = useStyles();
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
            value = new Calculation(delimiter, values).getTotal();

            return setTotal({input, delimiter, value});
        }

        delimiter = new Delimiter(defaultDelimiters).getRegex();
        value = new Calculation(delimiter, input).getTotal();

        setTotal({input, delimiter, value});
      };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.root}>
                <Header />
                <Display total={total.value} />
                <TextField
                    id="input"
                    label="Input"
                    className={classes.textField}
                    value={total.input}
                    onChange={handleTotal}
                    margin="normal"
                />
            </Paper>
        </Container>
    )
}

export default Calculator;
