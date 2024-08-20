import React, { useEffect, useState } from "react";
import Calender from "../../../../components/Calender";
// import { roomsTypes } from "../../../../constants/rooms";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { baseUrl } from "../../../../constants/baseurl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Booking = ({ setShowNav, showNav }) => {
  const [bookingType, setBookingType] = useState("");
  const [showType, setshowType] = useState(false);
  const iconStyle = "text-[#828893] text-lg cursor-pointer md:hidden block";
  const [roomTypes, setRoomTypes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const navigate = useNavigate();
  console.log(paymentData);
  useEffect(() => {
    const fetchRoomTypes = async () => {
      await axios.get(`${baseUrl}/main/rooms/sub/get/all`).then((res) => {
        // console.log(res);
        setRoomTypes(res.data);
      });
    };
    fetchRoomTypes();
  }, []);
  useEffect(() => {
    const fetchBookings = async () => {
      const selectedRoom = roomTypes.find((room) => room.title === bookingType);
      // console.log(selectedRoom);
      if (selectedRoom) {
        try {
          await axios
            .get(`${baseUrl}/main/rooms/bookings/${selectedRoom._id}`)
            .then((res) => {
              // console.log("res", res);
              setBookings(res.data);
            });
        } catch (err) {
          console.log("failed to get bookings");
        }
      }
    };
    fetchBookings();
  }, [bookingType, roomTypes]);
  const handleDateClick = async (date) => {
    const booking = bookings.find(
      (booking) =>
        new Date(booking.bookingDetails.visitDate).toDateString() ===
        date.toDateString()
    );

    if (booking) {
      try {
        const res = await axios.get(
          `${baseUrl}/payment/get/byBookingId/${booking._id}`
        );
        // console.log(res.data);
        if (res.data) {
          navigate(`/admin/jara/booking-status/${booking._id}`, {
            state: { paymentId: res.data[0]._id },
          });
        }
      } catch (err) {
        console.log("failed to get payment");
      }
    }
  };
  return (
    <div className="font-robotoFont w-[100%] overflow-x-auto">
      <div className="w-[100%] bg-white h-[6rem] flex justify-between items-center p-5 border-b-2 border-solid border-[#e6e7e9]">
        <h1 className="text-2xl font-medium">Bookings 🛌</h1>
        {showNav ? (
          <ImCross onClick={() => setShowNav(!showNav)} className={iconStyle} />
        ) : (
          <GiHamburgerMenu
            onClick={() => setShowNav(!showNav)}
            className={iconStyle}
          />
        )}
      </div>

      <div className="p-5">
        <div className="block sm:flex justify-between items-center">
          <div>
            <input
              type="date"
              className="w-[15rem] h-[3rem] pl-4 pr-4 rounded-md outline-none cursor-pointer text-[#828893]"
            />
          </div>

          <div className="w-[15rem] relative sm:mt-0 mt-4">
            <div
              onClick={() => setshowType(!showType)}
              className="w-[100%] flex items-center justify-between pl-4 pr-4 h-[3rem] bg-white rounded-md cursor-pointer text-[#828893]"
            >
              <p>{bookingType ? bookingType : "Select Room Type"}</p>
              <IoIosArrowDown />
            </div>

            {showType && (
              <div className="absolute p-3 top-[3.5rem] h-[10rem] overflow-y-auto bg-white text-[#828893] w-[15rem] left-0 z-50 rounded-md shadow-shadow1">
                {roomTypes?.map((item, index) => {
                  return (
                    <p
                      onClick={() => {
                        setBookingType(item?.title), setshowType(false);
                      }}
                      key={index}
                      className="mb-1 cursor-pointer"
                    >
                      {item?.title}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 sm:mt-10">
          <Calender bookings={bookings} onDateClick={handleDateClick} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
