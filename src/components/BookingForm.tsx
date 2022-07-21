import "./BookingForm.scss"

import {useEffect, useState} from "react";
import PrintReservation from "./PrintReservation";
import ApartmentTypeInput from "./ApartmentTypeInput";
import ApartmentTypeInputClass from "./ApartmentTypeInputClass"

export enum FIELD_TYPES {
    START_DATE = "START_DATE",
    END_DATE = "END_DATE",
    GUESTS_AMOUNT = "GUESTS_AMOUNT",
    APARTMENT_TYPES = "APARTMENT_TYPES"
}

export interface ItemReservationData {
    startDate: string,
    endDate: string,
    guestsAmount: string,
    apartmentType: string
}

export const APARTMENT_TYPES = ["BASIC", "SILVER", "GOLD", "PRESIDENTIAL"];

const BookingForm = (props: { min: number, max: number }) => {
    const startDate = new Date().toISOString().split('T')[0];
    const [newStartDate, setNewStartDate] = useState('');
    const [endDate, setEndDate] = useState(newStartDate);
    const [reservationData, setReservationData] = useState<ItemReservationData>();
    const [isReserved, setIsReserved] = useState<boolean>(false);
    const [prevPickedField, setPrevPickedField] = useState<FIELD_TYPES>(FIELD_TYPES.START_DATE);
    const [randomOccupancy, setRandomOccupancy] = useState(true);
    const [apartmentType, setApartmentType] = useState<string>("BASIC");

    const [enteredData, setEnteredData] = useState<ItemReservationData>({
        startDate: newStartDate,
        endDate: endDate,
        guestsAmount: '',
        apartmentType: apartmentType
    });

    useEffect(() => {
        if (newStartDate > endDate) {
            setEndDate(newStartDate);
            setEnteredData({...enteredData, endDate: newStartDate})
            let date_input = document.getElementById('endDate')
            // @ts-ignore
            date_input.value = newStartDate;
        }
    }, [newStartDate])

    useEffect(() => {
        setTimeout(() => {
            setRandomOccupancy(true);
        }, 3000);
    }, [enteredData])

    const cleanInput = (elementToClear: string) => {
        let date_input = document.getElementById(elementToClear)
        // @ts-ignore
        date_input.value = '';
        setEnteredData({...enteredData, [elementToClear]: ''})
    }

    useEffect(() => {
        const isShouldBeCleaned = !isReserved && !randomOccupancy;
        if (prevPickedField === FIELD_TYPES.START_DATE && isShouldBeCleaned) cleanInput('startDate')
        if (prevPickedField === FIELD_TYPES.END_DATE && isShouldBeCleaned) cleanInput('endDate')
        if (prevPickedField === FIELD_TYPES.GUESTS_AMOUNT && isShouldBeCleaned) cleanInput('guestsAmount')
        if (prevPickedField === FIELD_TYPES.APARTMENT_TYPES && isShouldBeCleaned) setApartmentType("BASIC");
    }, [randomOccupancy])

    useEffect(() => {
        onChangeApartmentType(apartmentType);
    }, [apartmentType])

    const onChangeStartDate = (event: React.FormEvent<HTMLInputElement>) => {
        setPrevPickedField(FIELD_TYPES.START_DATE);
        const newDate = event.currentTarget.value;
        setNewStartDate(newDate);
        setEnteredData({
            ...enteredData,
            startDate: newDate
        })
    };

    const onChangeEndDate = (event: React.FormEvent<HTMLInputElement>) => {
        setPrevPickedField(FIELD_TYPES.END_DATE);
        const newDate = event.currentTarget.value;
        setEndDate(newDate);
        setEnteredData({
            ...enteredData,
            endDate: newDate
        })
    };

    const onChangeGuestsAmount = (event: React.FormEvent<HTMLInputElement>) => {
        setPrevPickedField(FIELD_TYPES.GUESTS_AMOUNT);
        const guestsAmountValue = event.currentTarget.value;
        setEnteredData({
            ...enteredData,
            guestsAmount: guestsAmountValue
        })
    }

    const onChangeApartmentType = (apartmentType: string) => {
        setPrevPickedField(FIELD_TYPES.APARTMENT_TYPES);
        setEnteredData({
            ...enteredData,
            apartmentType: apartmentType
        })
    }

    const onSaveReservationData = (enteredItemData: ItemReservationData) => {
        const ItemData = {
            ...enteredItemData,
            id: Math.random().toString()
        };
        setReservationData(ItemData);
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const reservationData = {
            startDate: enteredData.startDate,
            endDate: enteredData.endDate,
            guestsAmount: enteredData.guestsAmount,
            apartmentType: enteredData.apartmentType
        }

        const isFormFulfilled = (enteredData.startDate !== '' && enteredData.endDate !== '' && enteredData.guestsAmount !== '');

        if (isFormFulfilled) {
            setRandomOccupancy(Math.random() < 0.5)
            setIsReserved(false);
        } else setRandomOccupancy(false);

        setIsReserved(randomOccupancy);

        if (isFormFulfilled) {
            onSaveReservationData(reservationData);
            setEnteredData({
                startDate: '',
                endDate: '',
                guestsAmount: enteredData.guestsAmount,
                apartmentType: enteredData.apartmentType
            });
        }
    }

    const handleChange = (apartmentType: string) => setApartmentType(apartmentType);
    const onSubmitReservation = () => setRandomOccupancy(Math.random() < 0.5);

    return <div>
        <div className="booking-form__body">
            <div className="booking-form__body-header">
                Booking is our mission!
            </div>
            <form onSubmit={submitHandler}>
                <div className="booking-form__body-grid">
                    <input id="startDate"
                           className="booking-form__input-field"
                           type="date"
                           min={startDate}
                           required
                           onChange={onChangeStartDate}/>
                    <input id="endDate"
                           className="booking-form__input-field"
                           type="date"
                           min={newStartDate}
                           required
                           onChange={onChangeEndDate}/>
                    <input id="guestsAmount"
                           className="booking-form__input-field"
                           type="number"
                           placeholder='Guests Amount'
                           min={props.min}
                           max={props.max}
                           required
                           value={enteredData.guestsAmount}
                           onChange={onChangeGuestsAmount}/>
                    <ApartmentTypeInput
                        options={APARTMENT_TYPES}
                        value={apartmentType}
                        onChange={handleChange}/>
                </div>
                <ApartmentTypeInputClass
                    options={APARTMENT_TYPES}
                    value={apartmentType}
                    onChange={handleChange}/>
                <div>
                    {!isReserved && randomOccupancy && <button onClick={onSubmitReservation} type="submit">Reserve</button>}
                    {isReserved && <p>Thank you!</p>}
                    {!isReserved && !randomOccupancy && <p className="booking-form__error">Reservation is impossible for these parameters.</p>}
                </div>
            </form>
            <PrintReservation
                reservationData={reservationData}
                isReserved={isReserved}
            />
        </div>
    </div>
}

export default BookingForm;