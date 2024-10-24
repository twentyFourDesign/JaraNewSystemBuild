import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../constants/baseurl";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";

const PeakOffPriceSetting = ({ setShowPopups, showPopups }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Fetch the current setting from the backend
    const fetchSetting = async () => {
      try {
        const response = await axios.get(`${baseUrl}/peak/peak-off-price`);
        setIsEnabled(response.data.isEnabled);
        setPercentage(response.data.percentage);
      } catch (error) {
        console.error("Error fetching peak-off price");
      }
    };

    fetchSetting();
  }, []);

  const handleSave = async () => {
    try {
      await axios.post(`${baseUrl}/peak/peak-off-price`, {
        isEnabled,
        percentage,
      });
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Error saving peak-off price");
    }
  };

  return (
    <div className="bg-white p-3 w-[90%] md:w-[80%] rounded-md overflow-auto h-[30rem]">
      <div className="flex justify-between items-center w-[100%]">
        <h2>Peak-Off Price Setting</h2>
        <ImCross
          className="cursor-pointer"
          onClick={() => {
            setShowPopups({ ...showPopups, peak: false });
          }}
        />
      </div>
      <div>
        <label className="m-2 flex gap-x-3">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
          Enable Peak-Off Price
        </label>
        {isEnabled && (
          <div>
            <label className="m-2 flex items-center gap-x-3">
              Percentage:
              <input
                type="number"
                className="w-[100%] lg:w-[10rem] lg:mt-0 mb-2 mt-2 lg:mb-0 block h-[2.3rem] rounded-md px-3 outline-none border border-gray-300"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                min="-100"
                max="100"
              />
            </label>
          </div>
        )}
        <button
          className="w-auto h-[2rem] p-4 flex items-center font-bold rounded-md text-white font-cursive bg-blue-800"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default PeakOffPriceSetting;
