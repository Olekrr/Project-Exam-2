import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createBooking } from "../../../api/bookings";
import { useBookings } from "./hooks/useBookings";
import BookingCalendar from "./components/calendar/Calendar";
import BookingForm from "./components/bookingform/BookingForm";
import { useAuth } from "../../../contexts/authContext";
import "./bookingpage.scss";

const BookingPage = () => {
  const { venueId } = useParams();
  const { bookings, loading, error, fetchBookings, maxGuests, venueDetails } =
    useBookings(venueId);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const { authData } = useAuth();

  const handleDateSelect = (info) => {
    setStartDate(info.startStr);
    const adjustedEndDate = new Date(info.endStr);
    adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
    setEndDate(adjustedEndDate.toISOString().split("T")[0]);
  };

  const handleCreateBooking = async () => {
    const { accessToken, apiKey } = authData;
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
    <div className="booking-page container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2>
            Book Your Stay at {venueDetails ? venueDetails.name : "Loading..."}
          </h2>
          <p className="hide-on-small">
            Hold click and drag to choose your time period.
          </p>
          <div className="calendar-container">
            <BookingCalendar
              events={events}
              onDateSelect={handleDateSelect}
              venueName={venueDetails ? venueDetails.name : "Loading..."}
            />
          </div>
        </div>
        <div className="col-md-4">
          <BookingForm
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            guests={guests}
            setGuests={setGuests}
            onCreateBooking={handleCreateBooking}
            maxGuests={maxGuests}
            bookings={bookings}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
