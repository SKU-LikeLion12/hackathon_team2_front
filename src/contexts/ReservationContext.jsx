import React, { createContext, useState, useContext } from "react";

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const updateReservationStatus = (id, newStatus) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  return (
    <ReservationContext.Provider
      value={{ reservations, setReservations, updateReservationStatus }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => useContext(ReservationContext);
