import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "./CustomSelect.css";

const CustomSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <label className="select-label">{label}</label>
      <div className="flex items-center">
        <div onClick={toggleDropdown} className="select-box ">
          <span className="px-2 text-sm">{value || "Select Age"}</span>
        </div>
        <div
          className="p-[4px] h-[40px] bg-[#75A9BF] flex justify-center items-center"
          style={{ cursor: "pointer", borderRadius: "0 15px 15px 0" }}
          onClick={toggleDropdown}
        >
          {isOpen ? (
            <MdKeyboardArrowUp className="text-white text-3xl" />
          ) : (
            <MdKeyboardArrowDown className="text-white text-3xl" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option.value)}
              className="select-option"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
