import React, {useEffect, useState} from "react";

import { useSelector } from "react-redux";
import GuestSelect from "./GuestSelect";
import axios from 'axios'
import { baseUrl } from '../constants/baseurl'
const Modal = ({ onClose, onSave, guests, updateGuest, setGuest }) => {
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const [showNav, setShowNav] = useState(false)
  const [allGuests, setAllGuests] = useState([])

  const handleInputChange = (id, field, value) => {
    updateGuest(id, field, value);
  };
  useEffect(()=>{
    axios.get(`${baseUrl}/guest/get/all`)
    .then((res)=>{
        if(res.status){
            setAllGuests(res.data)
        }
    })
},[])
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4">Guests Info</h2>
        <div className="space-y-4">
          <GuestSelect options={allGuests} setSelected={setGuest}/>
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
                  {roomDetails?.selectedRooms?.map((room) => (
                    <option value={room.title}>{room.title}</option>
                  ))}
                  {/* <option value="Loft Sunrise 1">Loft Sunrise 1</option>
                  <option value="Loft Sunrise 2">Loft Sunrise 2</option>
                  <option value="Loft Sunset 1">Loft Sunset 1</option>
                  <option value="Loft Sunset 2">Loft Sunset 2</option> */}
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
