import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ExtraModal = ({ categories, extras, onClose, initialFormData }) => {
  const roomDetails = useSelector((state) => state.overnightRoomInfo);
  const daypassDetails = useSelector((state) => state.daypassAvailablity);
  const [formData, setFormData] = useState(initialFormData || {});

  useEffect(() => {
    setFormData(initialFormData || {});
  }, [initialFormData]);

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
          extraData && Object.values(extraData).every((value) => value !== "")
        );
      });
      completedCategories[category] = allFieldsFilled;
      if (!allFieldsFilled) isValid = false;
    });

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
    const startDate = getDateString(
      roomDetails?.visitDate || daypassDetails?.startDate
    );
    const endDate = getDateString(
      roomDetails?.endDate || daypassDetails?.startDate
    );

    switch (category) {
      case "cake":
        return (
          <>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="date"
              value={extraData.date || ""}
              min={startDate}
              max={endDate}
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
              min={startDate}
              max={endDate}
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
              min={startDate}
              max={endDate}
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
          </>
        );
      default:
        return (
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="date"
            name="date"
            value={extraData.date || ""}
            min={startDate}
            max={endDate}
            onChange={(e) => handleInputChange(e, category, extra._id)}
            required
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Extra Details</h2>
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
          </form>
        </div>
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
      </div>
    </div>
  );
};

export default ExtraModal;
