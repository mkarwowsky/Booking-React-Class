import React from "react";

type ApartmentType = {
    value: string;
    options: string[];
    onChange: Function;
}

class ApartmentTypeInputClass extends React.Component<ApartmentType> {
    constructor(props: ApartmentType) {
        super(props);
    }

    handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.props.onChange(event.currentTarget.value);
    };

    render() {
        return <select className="booking-form__input-field" value={this.props.value} onChange={this.handleChange}>
            {this.props.options.map((option: string, index: number) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    }
}

export default ApartmentTypeInputClass;