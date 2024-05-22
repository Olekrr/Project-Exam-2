import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getAllBookings, createBooking } from "../../../api/bookings";
import TextInput from "../../utils/textInput/textInput";
import "./bookingPage.sass";

const BookingPage = () => {
  const { venueId } = useParams();
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(10);

  useEffect(() => {
    fetchBookings();
  }, [venueId]);

  const fetchBookings = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    try {
      const fetchedBookings = await getAllBookings(accessToken, apiKey);
      const filteredBookings = fetchedBookings.data.filter(
        (booking) => booking.venue && booking.venue.id === venueId
      );
      const events = filteredBookings.map((booking) => ({
        title: `Booked - Guests: ${booking.guests}`,
        start: booking.dateFrom,
        end: booking.dateTo,
        allDay: true,
        color: "red"
      }));
      setEvents(events);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

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

  return (
    <div>
      <h2>Book Your Stay at Venue {venueId}</h2>
      <p>
        Please click or drag across the dates you want to book on the calendar.
      </p>
      <div className="custom-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dayMaxEvents={true}
          selectable={true}
          select={handleDateSelect}
          aspectRatio={1.5}
          selectMirror={true}
          unselectAuto={false}
        />
      </div>
      <TextInput
        label="Number of Guests"
        id="guests"
        type="number"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        min="1"
        max={maxGuests.toString()}
      />
      <button onClick={handleCreateBooking} className="btn btn-primary">
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
