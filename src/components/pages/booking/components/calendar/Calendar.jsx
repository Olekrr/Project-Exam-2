import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.scss";

/**
 * BookingCalendar component to display a calendar with events and handle date selection.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.events - List of events to display on the calendar.
 * @param {function} props.onDateSelect - Function to handle date selection.
 * @param {string} props.venueName - The name of the venue.
 */
const BookingCalendar = ({ events, onDateSelect, venueName }) => {
  const formattedEvents = events.map((event) => {
    const endDate = new Date(event.end);
    endDate.setDate(endDate.getDate() + 1);
    return {
      ...event,
      start: new Date(event.start).toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0]
    };
  });

  return (
    <div className="booking-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        selectable={true}
        select={(info) => onDateSelect(info)}
        selectOverlap={false}
        eventOverlap={false}
        validRange={{ start: new Date().toISOString() }}
        eventColor="red"
        eventTextColor="white"
        height="auto"
      />
    </div>
  );
};

export default BookingCalendar;
