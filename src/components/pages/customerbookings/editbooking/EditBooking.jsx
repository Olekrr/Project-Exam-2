import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../../../utils/textInput/textInput";
import { useBooking } from "./hooks/useBooking";
import "./editbooking.scss";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, error, updateBookingDetails } = useBooking(id);
  const [dateFrom, setDateFrom] = useState(booking?.dateFrom || "");
  const [dateTo, setDateTo] = useState(booking?.dateTo || "");
  const [guests, setGuests] = useState(booking?.guests || 1);

  useEffect(() => {
    if (booking) {
      setDateFrom(booking.dateFrom);
      setDateTo(booking.dateTo);
      setGuests(booking.guests);
    }
  }, [booking]);

  const handleUpdateBooking = async () => {
    const updates = { dateFrom, dateTo, guests: Number(guests) };
    const result = await updateBookingDetails(updates);
    if (result.success) {
      navigate(`/profile`);
    }
  };

  return (
    <div className="edit-booking container mt-5">
      <h1>Edit Booking</h1>
      {!booking && !error && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {booking && (
        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
          <TextInput
            label="Start Date"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <TextInput
            label="End Date"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <TextInput
            label="Number of Guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <div className="button-group mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateBooking}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => navigate(`/profile`)}
            >
              Back to Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditBooking;
