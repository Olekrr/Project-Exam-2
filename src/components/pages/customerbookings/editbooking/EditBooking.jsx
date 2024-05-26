import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../../../utils/textinput/TextInput";
import { useBooking } from "./hooks/useBooking";
import { useAuth } from "../../../../contexts/authContext";
import BookingUpdateSuccess from "./bookingupdatesuccess/BookingUpdateSuccess";
import "./editbooking.scss";

/**
 * EditBooking component for editing an existing booking.
 *
 * @component
 */
const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { booking, maxGuests, error, updateBookingDetails } = useBooking(id);
  const [dateFrom, setDateFrom] = useState(booking?.dateFrom || "");
  const [dateTo, setDateTo] = useState(booking?.dateTo || "");
  const [guests, setGuests] = useState(booking?.guests || 1);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    if (booking) {
      setDateFrom(booking.dateFrom);
      setDateTo(booking.dateTo);
      setGuests(booking.guests);
    }
  }, [booking]);

  useEffect(() => {
    if (guests > maxGuests) {
      setValidationMessage(`The number of guests cannot exceed ${maxGuests}.`);
    } else {
      setValidationMessage("");
    }
  }, [guests, maxGuests]);

  /**
   * Handles the update booking action.
   */
  const handleUpdateBooking = async () => {
    const updates = { dateFrom, dateTo, guests: Number(guests) };
    const result = await updateBookingDetails(updates);
    if (result.success) {
      setUpdateSuccess(true);
    }
  };

  if (updateSuccess) {
    return (
      <BookingUpdateSuccess
        booking={{
          ...booking,
          dateFrom,
          dateTo,
          guests,
          username: authData.username
        }}
      />
    );
  }

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
            max={maxGuests}
          />
          {validationMessage && (
            <p className="validation-message">{validationMessage}</p>
          )}
          <div className="button-group mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateBooking}
              disabled={guests > maxGuests}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => navigate(`/profile/${authData.username}`)}
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
