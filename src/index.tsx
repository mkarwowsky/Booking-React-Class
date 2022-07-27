import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import BookingForm from "./components/BookingForm";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div className="App">
          <div className="App-header">
              <BookingForm min={1} max={99}/>
          </div>
      </div>
  </React.StrictMode>
);
