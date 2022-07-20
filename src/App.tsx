import React from 'react';
import BookingForm from "./components/BookingForm";
import {ItemReservationData} from "./components/BookingForm"

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="App-header">
          <BookingForm min={1} max={99}/>
      </div>
    </div>
  );
}

export default App;
