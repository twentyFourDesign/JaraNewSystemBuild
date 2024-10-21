import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ExtraModal = ({ categories, extras, onClose, initialFormData }) => {
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const daypassDetails = useSelector((state) => state.daypassAvailablity);
  const [formData, setFormData] = useState(initialFormData || {});
  const guestCount = useSelector((state) => state.overnightGuestCount);
  const numChildren = guestCount?.ages?.filter((age) =>
    age.includes("child")
  ).length;
  const numToddlers = guestCount?.ages?.filter((age) =>
    age.includes("toddler")
  ).length;
  const numInfants = guestCount?.ages?.filter((age) =>
    age.includes("infant")
  ).length;
  const totalGuests =
    guestCount?.adults + numChildren + numToddlers + numInfants;
  useEffect(() => {
    const startDate = new Date(
      roomDetails?.visitDate || daypassDetails?.startDate
    );
    const endDate = new Date(roomDetails?.endDate || daypassDetails?.startDate);

    const getDatesInRange = (start, end) => {
      const dates = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate).toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };

    const dateRange = getDatesInRange(startDate, endDate);

    const newFormData = { ...initialFormData };
    extras.forEach((extra) => {
      if (extra.type === "domestic" && !newFormData["domestic"]?.[extra._id]) {
        newFormData["domestic"] = {
          ...newFormData["domestic"],
          [extra._id]: { selectedDates: dateRange },
        };
      } else if (
        extra.type === "organized team bonding" &&
        !newFormData["organized team bonding"]?.[extra._id]
      ) {
        newFormData["organized team bonding"] = {
          ...newFormData["organized team bonding"],
          [extra._id]: { selectedDates: dateRange },
        };
      } else if (
        extra.type === "conference facility" &&
        !newFormData["conference facility"]?.[extra._id]
      ) {
        newFormData["conference facility"] = {
          ...newFormData["conference facility"],
          [extra._id]: { selectedDates: dateRange },
        };
      }
    });

    setFormData(newFormData);
  }, [initialFormData, roomDetails, daypassDetails, extras]);

  const handleInputChange = (e, category, extraId) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [extraId]: {
          ...prev[category]?.[extraId],
          [e.target.name]: e.target.value,
        },
      },
    }));
  };

  const validateForm = () => {
    const completedCategories = {};
    let isValid = true;
    categories.forEach((category) => {
      const categoryExtras = extras.filter((extra) => extra.type === category);
      const allFieldsFilled = categoryExtras.every((extra) => {
        const extraData = formData[category]?.[extra._id];

        return (
          extraData &&
          Object.values(extraData).every(
            (value) => value !== "" && value !== undefined && value !== null
          ) &&
          (extraData.date?.length > 0 || extraData.selectedDates?.length > 0)
        );
      });
      completedCategories[category] = allFieldsFilled;
      if (!allFieldsFilled) isValid = false;
    });
    // console.log(completedCategories);
    return { isValid, completedCategories };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, completedCategories } = validateForm();
    if (isValid) {
      onClose(completedCategories, formData);
    } else {
      toast.error("Please fill all required fields for all extras.");
    }
  };

  const handleCancel = () => {
    // Simply close the modal without validation
    onClose(null, null);
  };

  const getDateString = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const renderFields = (category, extra) => {
    const extraData = formData[category]?.[extra._id] || {};
    const startDate = new Date(
      roomDetails?.visitDate || daypassDetails?.startDate
    );
    const endDate = new Date(roomDetails?.endDate || daypassDetails?.startDate);

    // Function to generate an array of dates between start and end
    const getDatesInRange = (start, end) => {
      const dates = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };

    switch (category) {
      case "cake":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              name="message"
              value={extraData.message || ""}
              maxLength="20"
              placeholder="Message on the cake (max 20 chars)"
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="gender"
              value={extraData.gender || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </>
        );
      case "massage":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="time"
              value={extraData.time || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="">Select Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
            </select>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="numberOfPeople"
              value={extraData.numberOfPeople || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="">Select Number of People</option>
              {Array.from({ length: totalGuests }, (_, i) => i + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                )
              )}
            </select>
          </>
        );
      case "dining":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
          </>
        );
      case "roomDecoration":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="room"
              value={extraData.room || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="">Select Room</option>
              {roomDetails?.selectedRooms?.map((room) => (
                <option key={room.title} value={room.title}>
                  {room.title}
                </option>
              ))}
            </select>
            {extra.title.trim().toLowerCase() === "balloons" ? (
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                name="color"
                value={extraData.color || ""}
                onChange={(e) => handleInputChange(e, category, extra._id)}
                required
              >
                <option value="">Select Color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Pink</option>
              </select>
            ) : extra.title.trim().toLowerCase() === "flower petals" ? (
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                name="petals"
                value={extraData.petals || ""}
                placeholder="what to write? 6 characters max"
                maxLength="6"
                onChange={(e) => handleInputChange(e, category, extra._id)}
                required
              />
            ) : extra.title.trim().toLowerCase() === "welcome note" ? (
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                name="welcomeNote"
                value={extraData.welcomeNote || ""}
                placeholder="what to write? 20 characters max"
                maxLength="20"
                onChange={(e) => handleInputChange(e, category, extra._id)}
                required
              />
            ) : null}
          </>
        );
      case "daypassExtension":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <span className="w-full p-2 border border-gray-300 rounded-md">
              Arrival Time: <strong>11:30 Am</strong>
            </span>
            <span className="w-full p-2 border border-gray-300 rounded-md">
              Departure Time: <strong>5:30 PM</strong>
            </span>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="quantity"
              value={extraData.quantity || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="" disabled>
                Select quantity
              </option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </>
        );
      case "unforgettable":
        const extraTitle = extra.title.trim().toLowerCase();
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            {extraTitle === "floating breakfast (pool)" && (
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                name="time"
                value={extraData.time || ""}
                onChange={(e) => handleInputChange(e, category, extra._id)}
                required
              >
                <option value="">Select Time</option>
                <option value="9:00am">9:00 AM</option>
                <option value="9:30am">9:30 AM</option>
                <option value="10:00am">10:00 AM</option>
              </select>
            )}
            {extraTitle === "diy painting" && (
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                name="numberOfPeople"
                value={extraData.numberOfPeople || ""}
                onChange={(e) => handleInputChange(e, category, extra._id)}
                required
              >
                <option value="">Select Number of People</option>
                {Array.from({ length: totalGuests }, (_, i) => i + 1).map(
                  (num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  )
                )}
              </select>
            )}
          </>
        );
      case "drink":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="quantity"
              value={extraData.quantity || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="">Select Quantity</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </>
        );
      case "photo shoot (photographer access)":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="assistants"
              value={extraData.assistants || "0"}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="0">0 (No assistants/makeup artists)</option>
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </>
        );
      case "domestic":
      case "organized team bonding":
      case "conference facility":
        const dateRange = getDatesInRange(startDate, endDate);
        return (
          <div className="flex flex-col space-y-2">
            {dateRange.map((date) => (
              <label
                key={date.toISOString()}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  name="selectedDates"
                  value={date.toISOString().split("T")[0]}
                  checked={(extraData.selectedDates || []).includes(
                    date.toISOString().split("T")[0]
                  )}
                  onChange={(e) => {
                    const dateStr = e.target.value;
                    const newSelectedDates = e.target.checked
                      ? [...(extraData.selectedDates || []), dateStr]
                      : (extraData.selectedDates || []).filter(
                          (d) => d !== dateStr
                        );
                    handleInputChange(
                      {
                        target: {
                          name: "selectedDates",
                          value: newSelectedDates,
                        },
                      },
                      category,
                      extra._id
                    );
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{date.toLocaleDateString()}</span>
              </label>
            ))}
          </div>
        );
      case "tie-dye":
        // Set default value to 10 if not already set
        if (!extraData.participants) {
          handleInputChange(
            { target: { name: "participants", value: "10" } },
            category,
            extra._id
          );
        }
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <label htmlFor="participants">
              How many guests would participate?
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="participants"
              value={extraData.participants || "10"}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              {Array.from({ length: totalGuests }, (_, i) => i + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                )
              )}
            </select>
          </>
        );
      case "adire":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="time"
              value={extraData.time || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="">Select Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
            </select>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="numberOfPeople"
              value={extraData.numberOfPeople || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="">Select Number of People</option>
              {Array.from({ length: totalGuests }, (_, i) => i + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                )
              )}
            </select>
          </>
        );
      default:
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={getDateString(startDate)}
              max={getDateString(endDate)}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="numberOfPeople"
              value={extraData.numberOfPeople || ""}
              onChange={(e) => handleInputChange(e, category, extra._id)}
              required
            >
              <option value="">Select Number of People</option>
              {Array.from({ length: totalGuests }, (_, i) => i + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                )
              )}
            </select>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Extra Details</h2>
          <p className="mt-2">
            please indicate your preference of timing for your chosen Extra,
            Jara Beach Resort will endeavour to accommodate your request,
            subject to availability
          </p>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          <form onSubmit={handleSubmit} className="space-y-8">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold capitalize">{category}</h3>
                {extras
                  .filter((extra) => extra.type === category)
                  .map((extra) => (
                    <div key={extra._id} className="space-y-2 border-b pb-4">
                      <h4 className="font-medium">{extra.title}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderFields(category, extra)}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
            <div className="p-6 border-t flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExtraModal;
