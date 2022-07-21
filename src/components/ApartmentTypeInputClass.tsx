import React from "react";

class ApartmentTypeInputClass extends React.Component<{}, { value: string, options: string[], onChange: Function }> {
    constructor(props: { value: string, options: string[], onChange: Function }) {
        super(props);
    }

    handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.state.onChange(event.currentTarget.value);
    };

    render() {
        const apartmentOptions: string[] = this.state.options;
        return <select className="booking-form__input-field" value={this.state.value} onChange={this.handleChange}>
            {apartmentOptions.map((option: string, index: number) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    }
}

export default ApartmentTypeInputClass;