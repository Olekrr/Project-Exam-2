import React from "react";
import TextInput from "../../../../utils/textInput/textInput";

const BookingForm = ({
  guests,
  maxGuests,
  onChangeGuests,
  onCreateBooking
}) => {
  return (
    <>
      <TextInput
        label="Number of Guests"
        id="guests"
        type="number"
        value={guests}
        onChange={onChangeGuests}
        min="1"
        max={maxGuests.toString()}
      />
      <button onClick={onCreateBooking} className="btn btn-primary">
        Confirm Booking
      </button>
    </>
  );
};

export default BookingForm;
