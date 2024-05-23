import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createBooking } from "../../../api/bookings";
import { useBookings } from "./hooks/useBookings";
import BookingCalendar from "./components/calendar/Calendar";
import BookingForm from "./components/bookingform/BookingForm";

const BookingPage = () => {
  const { venueId } = useParams();
  const { bookings, loading, error, fetchBookings } = useBookings(venueId);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(10);

  const handleDateSelect = (selectInfo) => {
    setStartDate(selectInfo.startStr);
    setEndDate(selectInfo.endStr);
  };

  const handleCreateBooking = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    const bookingData = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: Number(guests),
      venueId
    };

    try {
      await createBooking(bookingData, accessToken, apiKey);
      alert("Booking created successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Failed to create booking.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const events = bookings.map((booking) => ({
    title: `Booked - Guests: ${booking.guests}`,
    start: booking.dateFrom,
    end: booking.dateTo,
    allDay: true,
    color: "red"
  }));

  return (
    <div>
      <h2>Book Your Stay at Venue {venueId}</h2>
      <p>
        Please click or drag across the dates you want to book on the calendar.
      </p>
      <BookingCalendar events={events} onSelectDate={handleDateSelect} />
      <BookingForm
        guests={guests}
        maxGuests={maxGuests}
        onChangeGuests={(e) => setGuests(e.target.value)}
        onCreateBooking={handleCreateBooking}
      />
    </div>
  );
};

export default BookingPage;
