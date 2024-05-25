const BookingList = ({ bookings, onEdit, onDelete }) => {
  if (bookings.length === 0) {
    return <p>No upcoming bookings found.</p>;
  }

  return (
    <ul>
      {bookings.map((booking) => (
        <li key={booking.id}>
          {booking.dateFrom} - {booking.dateTo}: Guests {booking.guests}
          <button onClick={() => onEdit(booking.id)}>Edit</button>
          <button onClick={() => onDelete(booking.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
