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



const Calculator = () => {
    const classes = useStyles();
    const [total, setTotal] = React.useState({
        input: '',
        delimitter: '',
        value: 0
      });

    const handleTotal = ev => {
        let input = ev.target.value;
        const defaultDelimiters = [',', '\\n']
        const delimiter = new Delimiter(defaultDelimiters);
        console.log('👀: Calculator -> delimiter', delimiter);
        const regex = delimiter.getRegex();
        console.log('👀: Calculator -> regex', regex);

        setTotal({input, delimitter: '/,|\\n/', value: 25});
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
