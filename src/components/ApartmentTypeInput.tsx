import {useState} from "react";
import "./BookingForm.scss"
import {APARTMENT_TYPES} from "./BookingForm";


const ApartmentTypeInput = (props: { value: string, options: string[], onChange: Function }) => {
    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        props.onChange(event.currentTarget.value);
    };

    return (
        <select className="booking-form__input-field" value={props.value} onChange={handleChange}>
            {props.options.map((option: string, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    );
}

export default ApartmentTypeInput;