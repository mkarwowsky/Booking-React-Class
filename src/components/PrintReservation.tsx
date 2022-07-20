import {ItemReservationData} from "./BookingForm"

import "./PrintReservation.scss"

const PrintReservation = (props: { reservationData?: ItemReservationData, isReserved: boolean }) => {

    return <div>
        {props.isReserved && <div className="print-reservation__body">
            <div>
                <div className="print-reservation__body-header">
                    <div>Reservation Details</div>
                </div>
                <div className="print-reservation__body-details">
                    <div className="print-reservation__body-details-field">
                        <div>Start date:</div>
                        <div>{props.reservationData?.startDate}</div>
                    </div>
                    <div className="print-reservation__body-details-field">
                        <div>End date:</div>
                        <div>{props.reservationData?.endDate}</div>
                    </div>
                    <div className="print-reservation__body-details-field">
                        <div>Amount of guests:</div>
                        <div>{props.reservationData?.guestsAmount}</div>

                    </div>
                    <div className="print-reservation__body-details-field">
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