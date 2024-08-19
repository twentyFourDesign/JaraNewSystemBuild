import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import GuestList from "./GuestList";
import { AiOutlinePlus } from "react-icons/ai";
import Edit from "../assets/edit.png";
import { useSelector, useDispatch } from "react-redux";
import { insert as insertGuestCount } from "../store/slices/overnight/overnightGuest.slice";
import { insert as insertGuestInfo } from "../store/slices/overnight/guestInfo.slice";
const GuestForm = ({ guests, guestCount, updateGuest }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleAddGuests = () => {
    // dispatch(insertGuestCount({ guestCount: guestCount }));
    setShowModal(true);
  };

  return (
    <div
      className="px-4 py-2 w-[90%] border-2 mt-4 border-[#75A9BF] rounded-xl "
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="flex justify-between  items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Names of guests</h2>
          <p className="mb-4">
            Please give us some information about your guests.
          </p>
        </div>

        <button
          className="bg-black flex items-center justify-center gap-2 text-white h-12 w-48  rounded-xl"
          onClick={handleAddGuests}
        >
          {guests?.[0]?.firstName ? (
            <>
              <img src={Edit} alt="edit" className="inline-block h-5 w-5" />
              Edit Guest Info
            </>
          ) : (
            <>
              <AiOutlinePlus className="inline-block h-5 w-5" />
              Add Guests Info
            </>
          )}
        </button>
      </div>

      <GuestList guests={guests} />

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSave={() => setShowModal(false)}
          guests={guests}
          updateGuest={updateGuest}
        />
      )}
    </div>
  );
};

export default GuestForm;
