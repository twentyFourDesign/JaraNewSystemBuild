import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateGuest } from "../store/slices/overnight/guestInfo.slice";

const Modal = ({ onClose, onSave }) => {
  const guests = useSelector((state) => state.overnightGuestDetails);
  const dispatch = useDispatch();

  const handleInputChange = (id, field, value) => {
    dispatch(updateGuest({ id, field, value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4">Guests Info</h2>
        <div className="space-y-4">
          {guests.map((guest) => (
            <div key={guest.id} className="flex space-x-4">
              <div className="w-1/4">
                <label className="block mb-1">Guest Adult {guest.id}</label>
              </div>
              <div className="w-1/4">
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded"
                  placeholder="First Name"
                  value={guest.firstName}
                  onChange={(e) =>
                    handleInputChange(guest.id, "firstName", e.target.value)
                  }
                />
              </div>
              <div className="w-1/4">
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Last Name"
                  value={guest.lastName}
                  onChange={(e) =>
                    handleInputChange(guest.id, "lastName", e.target.value)
                  }
                />
              </div>
              <div className="w-1/4">
                <select
                  className="w-full border px-2 py-1 rounded"
                  value={guest.room}
                  onChange={(e) =>
                    handleInputChange(guest.id, "room", e.target.value)
                  }
                >
                  <option value="">Select Room</option>
                  <option value="Loft Sunrise 1">Loft Sunrise 1</option>
                  <option value="Loft Sunrise 2">Loft Sunrise 2</option>
                  <option value="Loft Sunset 1">Loft Sunset 1</option>
                  <option value="Loft Sunset 2">Loft Sunset 2</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;