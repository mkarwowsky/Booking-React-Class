import React from "react";
import {APARTMENT_TYPES} from "./BookingForm";
import { WithStyles, createStyles, withStyles } from '@mui/styles';

type ApartmentType = {
    value: APARTMENT_TYPES;
    options: string[];
    onChange: Function;
}

const styles = () => createStyles({
    bookingForm__inputField: {
        border: "1px solid",
        borderRadius: "0.1rem",
        fontFamily: "'Roboto'",
        fontSize: "calc(0.35rem + 0.4vw)"
    }
});

interface ExtendedProps extends ApartmentType, WithStyles<typeof styles> {}

class ApartmentTypeInputClass extends React.Component<ExtendedProps> {
    constructor(props: ExtendedProps) {
        super(props);
    }

    handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.props.onChange(event.currentTarget.value);
    };

    render() {
        const { classes } = this.props;
        return <select className={classes.bookingForm__inputField} value={this.props.value}
                       onChange={this.handleChange}>
            {(this.props.options).map((option: string, index: number) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    }
}

export default withStyles(styles)(ApartmentTypeInputClass);