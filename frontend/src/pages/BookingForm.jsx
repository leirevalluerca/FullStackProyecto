import { useRef, useState } from "react";

const BookingForm = ({ propertyId }) => {
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const [error, setError] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        propertyId,
        checkIn: checkInRef.current.value,
        checkOut: checkOutRef.current.value
      })
    });

    const data = await res.json();

    if (!res.ok) setError(data.message || 'Booking failed');
    else alert('Booking confirmed!');
  };

  return (
    <form onSubmit={handleBooking}>
      <input type="date" ref={checkInRef} required />
      <input type="date" ref={checkOutRef} required />
      {error && <p>{error}</p>}
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;