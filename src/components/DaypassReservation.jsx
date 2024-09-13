import React, { useContext } from "react";
import { PriceContext } from "../Context/PriceContext";

const DaypassReservation = () => {
  const {
    bookingInfo,
    availablity,
    daypassPrice,
    daypassSubtotal,
    daypassTaxAmount,
    daypassDiscount,
  } = useContext(PriceContext);
  console.log(availablity.startDate);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  // console.log(bookingInfo);
  // console.log(availablity);
  return (
    <div className="font-robotoFont p-4 h-auto">
      <h1 className="text-xl font-bold">Your Reservation</h1>
      <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>

      <div className="mt-3">
        <h1 className="text-lg font-bold">Guests</h1>
        {!bookingInfo.adultsAlcoholic &&
        !bookingInfo.adultsNonAlcoholic &&
        !bookingInfo.Nanny &&
        !bookingInfo.childTotal ? (
          <p className="text-[#606970]">No guests are selected yet.</p>
        ) : (
          <>
            {bookingInfo.adultsAlcoholic ? (
              <div className="flex justify-between items-center">
                <p className="text-[#606970]">Adults Alcoholic</p>
                <p>{bookingInfo.adultsAlcoholic || 0}</p>
              </div>
            ) : null}
            {bookingInfo.adultsNonAlcoholic ? (
              <div className="flex justify-between items-center">
                <p className="text-[#606970]">Adults Non-alcoholic</p>
                <p>{bookingInfo.adultsNonAlcoholic || 0}</p>
              </div>
            ) : null}

            {bookingInfo.Nanny ? (
              <div className="flex justify-between items-center">
                <p className="text-[#606970]">Nanny</p>
                <p>{bookingInfo.Nanny || 0}</p>
              </div>
            ) : null}

            {bookingInfo.childTotal ? (
              <div className="flex justify-between items-center">
                <p className="text-[#606970]">Child</p>
                <p>{bookingInfo.childTotal || 0}</p>
              </div>
            ) : null}

            {bookingInfo.adultsAlcoholic +
              bookingInfo.childTotal +
              bookingInfo.adultsNonAlcoholic +
              bookingInfo.Nanny >
            0 ? (
              <>
                <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[#606970]">Total Guests</p>
                  <p>
                    {bookingInfo.adultsAlcoholic +
                      bookingInfo.childTotal +
                      bookingInfo.adultsNonAlcoholic +
                      bookingInfo.Nanny}
                  </p>
                </div>
              </>
            ) : null}
          </>
        )}

        <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>
      </div>

      <div className="mt-3">
        <h1 className="text-lg font-bold">Visiting Date</h1>
        <div className="flex justify-between items-center">
          <p className="text-[#606970]">Selected Date</p>
          <p>
            {availablity?.startDate
              ? formatDate(availablity?.startDate)
              : "Not Selected Yet"}
          </p>
        </div>
        <div className="w-[100%] h-[1px] border-2 border-[#E2E8ED] mt-2"></div>
      </div>
      <div className="mt-3">
        <h1 className="text-lg font-bold">Extras</h1>
        {availablity?.extras?.length > 0 ? (
          <div className="flex gap-2 flex-wrap items-center">
            {availablity?.extras?.map((item, index) => {
              if (index == availablity?.extras?.length - 1) {
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
          <h1 className="text-base font-bold">Sub-total</h1>
          <h1 className="text-base font-bold">₦{daypassSubtotal.toFixed(2)}</h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-base font-bold">Discount (%)</h1>
          <h1 className="text-base font-bold">
            {daypassDiscount?.percentage ? daypassDiscount.percentage : 0}%
          </h1>
        </div>
      </div>

      <div className="bg-[#F1F5F8] mt-3 h-auto rounded-md shadow-shadow1 p-2 flex justify-center items-start flex-col">
        <div className="flex justify-between items-center w-[100%]">
          <p className="text-sm ">Consumption Tax and VAT (12.5%)</p>
          <p className="text-sm font-bold">₦{daypassTaxAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center mt-3 w-[100%]">
          <p className="font-bold text-lg">Total</p>
          <p className="font-bold text-lg">₦{daypassPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default DaypassReservation;
