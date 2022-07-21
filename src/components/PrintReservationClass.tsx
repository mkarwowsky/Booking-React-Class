import React from "react";
import {ItemReservationData} from "./BookingForm"

import "./PrintReservation.scss"

type ReservationDetails = {
    reservationData: ItemReservationData;
    isReserved: boolean
}

class PrintReservationClass extends React.Component<ReservationDetails> {
    constructor(props: ReservationDetails) {
        super(props);
    }

    render() {
        return <div>
            {this.props.isReserved && <div className="print-reservation__body">
                <div>
                    <div className="print-reservation__body-header">
                        <div>Reservation Details</div>
                    </div>
                    <div className="print-reservation__body-details">
                        <div className="print-reservation__body-details-field">
                            <div>Start date:</div>
                            <div>{this.props.reservationData?.startDate}</div>
                        </div>
                        <div className="print-reservation__body-details-field">
                            <div>End date:</div>
                            <div>{this.props.reservationData?.endDate}</div>
                        </div>
                        <div className="print-reservation__body-details-field">
                            <div>Amount of guests:</div>
                            <div>{this.props.reservationData?.guestsAmount}</div>
                        </div>
                        <div className="print-reservation__body-details-field">
                            <div>Apartment:</div>
                            <div>{this.props.reservationData?.apartmentType}</div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    }

}

export default PrintReservationClass;