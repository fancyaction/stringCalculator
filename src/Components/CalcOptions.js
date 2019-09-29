import React from 'react';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

const CalcOptions = ({ showFormula, toggleFormula, allowNegatives, toggleNegatives }) => (
    <FormGroup row>
        <FormControlLabel
            control={
                <Checkbox
                    checked={showFormula}
                    onChange={toggleFormula}
                    value="checkedB"
                    color="primary"
                    inputProps={{
                        'aria-label': 'display formula',
                    }}
                />
            }
            label="Display Formula"
        />
        <FormControlLabel
            control={
                <Checkbox
                    checked={allowNegatives}
                    onChange={toggleNegatives}
                    value="checkedB"
                    color="primary"
                    inputProps={{
                        'aria-label': 'allow negative numbers',
                    }}
                />
            }
            label="Allow Negatives"
        />
    </FormGroup>
)

export default CalcOptions;