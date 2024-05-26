import React from "react";
import VenueCard from "../../../../../../utils/venuecards/VenueCards";

/**
 * Venue component to display venue details and action buttons.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue details.
 * @param {function} props.onEdit - Function to handle editing the venue.
 * @param {function} props.onDelete - Function to handle deleting the venue.
 * @param {function} props.onViewBookings - Function to handle viewing bookings for the venue.
 * @returns {JSX.Element} - The rendered component.
 */
const Venue = ({ venue, onEdit, onDelete, onViewBookings }) => {
  return (
    <VenueCard
      venue={venue}
      onEdit={onEdit}
      onDelete={onDelete}
      onViewBookings={onViewBookings}
    />
  );
};

export default Venue;
