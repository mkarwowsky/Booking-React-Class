import {useEffect, useState} from "react";
import PrintReservation from "./PrintReservation";
import ApartmentTypeInput from "./ApartmentTypeInput";
import ApartmentTypeInputClass from "./ApartmentTypeInputClass"
import PrintReservationClass from "./PrintReservationClass";
import {makeStyles} from "@mui/styles";

export enum FIELD_TYPES {
    START_DATE = "START_DATE",
    END_DATE = "END_DATE",
    GUESTS_AMOUNT = "GUESTS_AMOUNT",
    APARTMENT_TYPES = "APARTMENT_TYPES"
}

export interface ItemReservationData {
    startDate: string,
    endDate: string,
    guestsAmount: number,
    apartmentType: APARTMENT_TYPES
}

export enum APARTMENT_TYPES {
    BASIC = "BASIC",
    SILVER = "SILVER",
    GOLD = "GOLD",
    PRESIDENTIAL = "PRESIDENTIAL"
};

export const useStyles = makeStyles({
    bookingForm__body: {
        backgroundColor: "#36393f",
        border: "1px solid #36393f",
        borderRadius: "0.2rem",
        padding: "2rem"
    },
    bookingForm__bodyHeader: {
        fontFamily: "'Poppins'"
    },
    bookingForm__bodyGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gridGap: "0.6rem",
        margin: "1rem"
    },
    bookingForm__error: {
        fontSize: "calc(0.5rem + 0.4vw)",
        color: "orange",
        animationName: "example",
        animationDuration: "3s"
    },
    "@keyframes example": {
        from: {color: "orange"},
        to: {color: "#36393f"}
    },
    bookingForm__inputField: {
        border: "1px solid",
        borderRadius: "0.1rem",
        fontFamily: "'Roboto'",
        fontSize: "calc(0.35rem + 0.4vw)"
    }
});

const BookingForm = (props: { min: number, max: number }) => {
    const classes = useStyles();
    const startDate = new Date().toISOString().split('T')[0];
    const [newStartDate, setNewStartDate] = useState('');
    const [endDate, setEndDate] = useState(newStartDate);
    const [reservationData, setReservationData] = useState<ItemReservationData>();
    const [isReserved, setIsReserved] = useState<boolean>(false);
    const [prevPickedField, setPrevPickedField] = useState<FIELD_TYPES>(FIELD_TYPES.START_DATE);
    const [occupancy, setOccupancy] = useState(true);
    const [apartmentType, setApartmentType] = useState<APARTMENT_TYPES>(APARTMENT_TYPES.BASIC);
    const [guestsAmount, setGuestsAmount] = useState<number>(0);

    const [enteredData, setEnteredData] = useState<ItemReservationData>({
        startDate: newStartDate,
        endDate: endDate,
        guestsAmount: guestsAmount,
        apartmentType: apartmentType
    });

    useEffect(() => {
        if (newStartDate > endDate) {
            setEndDate(newStartDate);
            setEnteredData({...enteredData, endDate: newStartDate})
        }
    }, [newStartDate])

    useEffect(() => {
        setEnteredData({...enteredData, guestsAmount: guestsAmount})
    }, [guestsAmount])

    useEffect(() => {
        setTimeout(() => {
            setOccupancy(true);
        }, 3000);
    }, [enteredData])

    const createRandomOcuppacy = () => {
        let randomOccupacy = Math.random() < 0.5;
        setOccupancy(randomOccupacy);
    }

    useEffect(() => {
        const shouldBeCleaned = !isReserved && !occupancy;
        if (prevPickedField === FIELD_TYPES.START_DATE && shouldBeCleaned) setNewStartDate('');
        if (prevPickedField === FIELD_TYPES.END_DATE && shouldBeCleaned) setEndDate('');
        if (prevPickedField === FIELD_TYPES.GUESTS_AMOUNT && shouldBeCleaned) setGuestsAmount(0);
        if (prevPickedField === FIELD_TYPES.APARTMENT_TYPES && shouldBeCleaned) setApartmentType(APARTMENT_TYPES.BASIC);
    }, [occupancy])

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
        const guestsAmountValue = event.currentTarget.valueAsNumber;
        setGuestsAmount(guestsAmountValue);
        setEnteredData({
            ...enteredData,
            guestsAmount: guestsAmount
        })
    }

    const onChangeApartmentType = (apartmentType: APARTMENT_TYPES) => {
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

        const isFormFulfilled = (enteredData.startDate !== '' && enteredData.endDate !== '' && enteredData.guestsAmount !== null);

        if (isFormFulfilled) {
            createRandomOcuppacy();
            setIsReserved(false);
        } else setOccupancy(false);

        setIsReserved(occupancy);

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

    const handleChangeApartmentType = (apartmentType: APARTMENT_TYPES) => setApartmentType(apartmentType);

    return <div>
        <div className={classes.bookingForm__body}>
            <div className={classes.bookingForm__bodyHeader}>
                Booking is our mission!
            </div>
            <form onSubmit={submitHandler}>
                <div className={classes.bookingForm__bodyGrid}>
                    <input id="startDate"
                           className={classes.bookingForm__inputField}
                           type="date"
                           min={startDate}
                           value={newStartDate}
                           required
                           onChange={onChangeStartDate}/>
                    <input id="endDate"
                           className={classes.bookingForm__inputField}
                           type="date"
                           min={newStartDate}
                           value={endDate}
                           required
                           onChange={onChangeEndDate}/>
                    <input id="guestsAmount"
                           className={classes.bookingForm__inputField}
                           type="number"
                           placeholder='Guests Amount'
                           min={props.min}
                           max={props.max}
                           value={guestsAmount}
                           required
                           onChange={onChangeGuestsAmount}/>
                    <ApartmentTypeInput
                        options={Object.keys(APARTMENT_TYPES)}
                        value={apartmentType}
                        onChange={handleChangeApartmentType}/>
                    <ApartmentTypeInputClass
                        options={Object.keys(APARTMENT_TYPES)}
                        value={apartmentType}
                        onChange={handleChangeApartmentType}/>
                </div>
                <div>
                    {!isReserved && occupancy &&
                        <button onClick={createRandomOcuppacy} type="submit">Reserve</button>}
                    {isReserved && <p>Thank you!</p>}
                    {!isReserved && !occupancy &&
                        <p className={classes.bookingForm__error}>Reservation is impossible for these parameters.</p>}
                </div>
            </form>
            <PrintReservation
                reservationData={reservationData}
                isReserved={isReserved}
            />
            <PrintReservationClass
                reservationData={reservationData}
                isReserved={isReserved}
            />
        </div>
    </div>
}

export default BookingForm;