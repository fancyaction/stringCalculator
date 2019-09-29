import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '50%'
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const CalcButtons = ({ handleCalcButtonClick, calcType }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <IconButton aria-label="add" onClick={handleCalcButtonClick('add')} disabled={calcType === 'add'} className={classes.margin}>
                +
            </IconButton>
            <IconButton aria-label="subtract" onClick={handleCalcButtonClick('subtract')} disabled={calcType === 'subtract'} className={classes.margin}>
                -
            </IconButton>
            <IconButton aria-label="divide" onClick={handleCalcButtonClick('divide')} disabled={calcType === 'divide'} className={classes.margin}>
                /
            </IconButton>
            <IconButton aria-label="multiply" onClick={handleCalcButtonClick('multiply')} disabled={calcType === 'multiply'} className={classes.margin}>
                *
            </IconButton>
        </div>
    );
}

export default CalcButtons;