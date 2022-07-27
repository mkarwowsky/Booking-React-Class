import {APARTMENT_TYPES, useStyles} from "./BookingForm";

type ApartmentType = {
    value: APARTMENT_TYPES;
    options: string[];
    onChange: Function;
}

const ApartmentTypeInput = (props: ApartmentType) => {
    const classes = useStyles();
    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        props.onChange(event.currentTarget.value);
    };

    return (
        <select className={classes.bookingForm__inputField} value={props.value} onChange={handleChange}>
            {props.options.map((option: string, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    );
}

export default ApartmentTypeInput;