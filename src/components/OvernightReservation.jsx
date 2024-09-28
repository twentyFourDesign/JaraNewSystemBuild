import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { PriceContext } from "../Context/PriceContext";
const OvernightReservation = () => {
  const {
    price,
    overnightTaxAmount,
    calPrice,
    discount,
    overnightSubtotal,
    multiNightDiscount,
    previousCost,
    previousPaymentStatus,
  } = useContext(PriceContext);
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const guestCount = useSelector((state) => state.overnightGuestCount);

  useEffect(() => {
    calPrice(); // Recalculate price when component mounts or dependencies change
  }, [calPrice, roomDetails, guestCount]);

  return (
    <div className="font-robotoFont p-4 mb-10">
      <h1 className="text-xl font-bold">Your Reservation</h1>
      <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>

      <div className="mt-3">
        <h1 className="text-lg font-bold">Guests</h1>
        <div className="flex justify-between items-center">
          {guestCount.adults ? (
            <>
              <p className="text-[#606970]">Adults</p>
              <p>{guestCount.adults}</p>
            </>
          ) : (
            "No guests are selected yet."
          )}
        </div>
        <div className="flex justify-between items-center">
          {guestCount.children ? (
            <>
              <p className="text-[#606970]">Children</p>
              <p>{guestCount.children}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="mt-3">
        <h1 className="text-lg font-bold">Stay Duration</h1>
        {!roomDetails?.visitDate || !roomDetails?.endDate ? (
          <p className="mt-1">No days selected yet.</p>
        ) : (
          <p className="mt-1">
            {roomDetails?.visitDate} To {roomDetails?.endDate}
          </p>
        )}
        <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>
      </div>

      <div className="mt-3">
        <h1 className="text-lg font-bold">Rooms</h1>
        {roomDetails?.selectedRooms?.length > 0 ? (
          <div className="flex gap-2 flex-wrap items-center">
            {roomDetails?.selectedRooms?.map((item, index) => (
              <p key={item.id}>{item.title}</p>
            ))}
          </div>
        ) : (
          <p className="mt-1">No rooms are selected yet.</p>
        )}
        <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>
      </div>

      <div className="mt-3">
        <h1 className="text-lg font-bold">Extras</h1>
        {roomDetails?.finalData?.length > 0 ? (
          <div className="flex gap-2 flex-wrap items-center">
            {roomDetails?.finalData?.map((item, index) => {
              if (index == roomDetails?.finalData?.length - 1) {
                return (
                  <p key={item.id}>{item.title ? item.title : item.type}</p>
                );
              } else {
                return (
                  <p key={item.id}>{item.title ? item.title : item.type}, </p>
                );
              }
            })}
          </div>
        ) : (
          <p className="mt-1">No extras are selected yet.</p>
        )}
        <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <h1 className="text-base font-bold">Room Discount (%)</h1>
          <h1 className="text-base font-bold">
            {discount?.percentage ? discount?.percentage : 0}%
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-base font-bold">Multi-Night Discount (%)</h1>
          <h1 className="text-base font-bold">{multiNightDiscount}%</h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-base font-bold">Sub-total</h1>
          <h1 className="text-base font-bold">
            ₦{overnightSubtotal.toFixed(2)}
          </h1>
        </div>
      </div>

      <div className="bg-[#F1F5F8] mt-3 h-[6rem] rounded-md shadow-shadow1 p-2 flex justify-center items-start flex-col z-50">
        <div className="flex justify-between items-center w-[100%]">
          <p className="text-sm ">Consumption Tax and VAT (12.5%)</p>
          <p className="text-sm font-bold">₦{overnightTaxAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center mt-3 w-[100%]">
          <p className="font-bold text-lg">Total</p>
          <p className="font-bold text-lg">₦{price.toFixed(2)}</p>
        </div>
      </div>
      {previousCost > 0 && (
        <div className="bg-[#F1F5F8] mt-3 h-[6rem] rounded-md shadow-shadow1 p-2 flex justify-center items-start flex-col z-50">
          <div className="flex justify-between items-center w-[100%]">
            <p className="text-sm ">Previous Booking Cost</p>
            <p className="text-sm font-bold">₦{previousCost}</p>
          </div>
          <div className="flex justify-between items-center w-[100%]">
            <p className="text-sm ">Previous Booking Status</p>
            <p className="text-sm font-bold">
              {previousPaymentStatus == "Pending" ? "Unpaid" : "Paid"}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3 w-[100%]">
            <p className="font-bold text-lg">Difference To Pay</p>
            <p className="font-bold text-lg">
              ₦
              {previousPaymentStatus == "Pending"
                ? price.toFixed(2)
                : price - previousCost > 0
                ? (price - previousCost).toFixed(2)
                : 0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OvernightReservation;
