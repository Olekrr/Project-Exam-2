import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../../../utils/textInput/textInput";
import { useBooking } from "./hooks/useBooking";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, error, updateBookingDetails } = useBooking(id);
  const [dateFrom, setDateFrom] = useState(booking?.dateFrom || "");
  const [dateTo, setDateTo] = useState(booking?.dateTo || "");
  const [guests, setGuests] = useState(booking?.guests || 1);

  const handleUpdateBooking = async () => {
    const updates = { dateFrom, dateTo, guests: Number(guests) };
    const result = await updateBookingDetails(updates);
    if (result.success) {
      navigate(`/profile`);
    }
  };

  if (!booking) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Edit Booking</h1>
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
      <button onClick={handleUpdateBooking}>Save Changes</button>
    </div>
  );
};

export default EditBooking;
