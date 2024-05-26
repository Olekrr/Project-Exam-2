import React, { useState } from "react";
import TextInput from "../../../../utils/textinput/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./bookingform.scss";

const BookingForm = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  guests,
  setGuests,
  onCreateBooking,
  maxGuests,
  bookings
}) => {
  const [guestError, setGuestError] = useState("");

  const handleGuestChange = (e) => {
    const value = Number(e.target.value);
    if (value > maxGuests) {
      setGuestError(`Number of guests cannot exceed ${maxGuests}`);
    } else {
      setGuestError("");
    }
    setGuests(value);
  };

  const bookedDates = bookings.flatMap((booking) => {
    const dates = [];
    let currentDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  });

  const getMinEndDate = (startDate) => {
    const nextBooking = bookings.find(
      (booking) => new Date(booking.dateFrom) > new Date(startDate)
    );
    return nextBooking ? new Date(nextBooking.dateFrom) : null;
  };

  return (
    <div className="booking-form">
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          selected={startDate ? new Date(startDate) : null}
          onChange={(date) => setStartDate(date.toISOString().split("T")[0])}
          selectsStart
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
          minDate={new Date()}
          className="form-control"
          id="startDate"
          excludeDates={bookedDates}
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <DatePicker
          selected={endDate ? new Date(endDate) : null}
          onChange={(date) => setEndDate(date.toISOString().split("T")[0])}
          selectsEnd
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
          minDate={startDate ? new Date(startDate) : new Date()}
          maxDate={startDate ? getMinEndDate(startDate) : null}
          className="form-control"
          id="endDate"
          excludeDates={bookedDates}
        />
      </div>
      <TextInput
        label="Number of Guests"
        id="guests"
        type="number"
        value={guests}
        onChange={handleGuestChange}
        min="1"
        max={maxGuests}
      />
      {guestError && <p className="text-danger">{guestError}</p>}
      <button
        onClick={onCreateBooking}
        className="btn btn-primary mt-3"
        disabled={guestError !== ""}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingForm;
