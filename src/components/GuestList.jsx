import React from "react";

const GuestList = ({ guests }) => {
  return (
    <div className="mt-4 w-full">
      {guests.length > 0 && guests?.[0].firstName !== "" ? (
        <div className="flex flex-wrap gap-2">
          {guests.map((guest, index) => (
            <span key={index} className="bg-gray-200 p-2 rounded-lg">
              {`${guest.firstName} ${guest.lastName} - ${guest.room}`}
            </span>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default GuestList;
