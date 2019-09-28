import React from 'react';
import { Container, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Display from './Display';
import Header from './Header'

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
    return (
        <Container maxWidth="sm">
            <Paper className={classes.root}>
                <Header />
                <Display total={25} />
                <TextField
                    id="input"
                    label="Input"
                    className={classes.textField}
                    // value={values.name}
                    onChange={ev => console.log(ev.target.value)}
                    margin="normal"
                />
            </Paper>
        </Container>
    )
}

export default Calculator;
