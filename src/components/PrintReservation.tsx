import {ItemReservationData} from "./BookingForm"

import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    printReservation__body: {
        backgroundColor: "#1769aa",
        border: "1px solid #1769aa",
        borderRadius: "0.2rem",
        margin: "1rem 0 0 0",
        padding: "2rem",
        fontFamily: "'Poppins'"
    },
    printReservation__bodyHeader: {
        fontFamily: "'Poppins'"
    },
    printReservation__bodyDetails: {
        backgroundColor: "#0276aa",
        border: "1px solid #03a9f4",
        borderRadius: "0.2rem",
        display: "flex",
        flexDirection: "column",
        fontSize: "calc(0.5rem + 0.5vw)",
        padding: "1rem"
    },
    printReservation__bodyDetailsField: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});


const PrintReservation = (props: { reservationData?: ItemReservationData, isReserved: boolean }) => {
    const classes = useStyles();
    return <div>
        {props.isReserved && <div className={classes.printReservation__body}>
            <div>
                <div className={classes.printReservation__bodyHeader}>
                    <div>Reservation Details</div>
                </div>
                <div className={classes.printReservation__bodyDetails}>
                    <div className={classes.printReservation__bodyDetailsField}>
                        <div>Start date:</div>
                        <div>{props.reservationData?.startDate}</div>
                    </div>
                    <div className={classes.printReservation__bodyDetailsField}>
                        <div>End date:</div>
                        <div>{props.reservationData?.endDate}</div>
                    </div>
                    <div className={classes.printReservation__bodyDetailsField}>
                        <div>Amount of guests:</div>
                        <div>{props.reservationData?.guestsAmount}</div>
                    </div>
                    <div className={classes.printReservation__bodyDetailsField}>
                        <div>Apartment:</div>
                        <div>{props.reservationData?.apartmentType}</div>
                    </div>
                </div>
            </div>
        </div>
        }
    </div>

}

export default PrintReservation;