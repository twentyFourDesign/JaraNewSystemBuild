import React, { useState, useEffect } from "react";
import JaraLogo from "../../assets/jarabeachlogo.png";
import moon from "../../assets/akar-icons_moon.png";
import light from "../../assets/Vector (1).png";
import existing from "../../assets/existing.png";
import newbooking from "../../assets/new.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

Modal.setAppElement("#root");
const BookingType = () => {
  const nav = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingType, setBookingType] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (type) => {
    setBookingType(type);
    setModalIsOpen(true);
  };

  const handleNewBookingClick = () => {
    setModalIsOpen(false);
    const path =
      bookingType === "overnight" ? "/overnight/guest" : "/daypass/guest";
    nav(path);
  };
  const handleExistingBookingClick = () => {
    setModalIsOpen(false);

    if (bookingType === "overnight") {
      window.location.href = "https://booking.jarabeachresort.com/manage";
    } else if (bookingType === "daypass") {
      window.location.href = "https://booking.jarabeachresort.com/manage";
    }
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="wrapper-background w-screen h-screen relative bg-[rgba(0,0,0,0.8)] font-robotoFont overflow-hidden ">
      {/* UPPER LOGO  */}
      <div className="flex w-screen justify-center items-center h-[13vh] bg-[rgba(0,0,0,0.8)] ">
        <img
          src={JaraLogo}
          loading="true"
          alt="jaralogo"
          className="h-[100%] p-2 z-10"
        />
      </div>

      {/* MAIN CARDS FOR BOOKING  */}

      <div className="w-full h-full flex flex-col z-20 items-center">
        <div className="flex items-center flex-col md:flex-row md:gap-0 gap-2 w-full justify-center pt-36">
          <span className="px-3 py-4 md:py-0 text-white  text-2xl z-20 font-[400] tracking-[10px] leading-[24px] font-poppins border-b-2  border-b-[#bcb9b9] md:border-b-0  md:border-r-2">
            All-Inclusive
          </span>
          {/* <hr className="md:w-2 md:h-9 z-10" /> */}
          <span className=" pl-5 py-4 md:py-0 pr-3 text-white  text-2xl z-20 font-[400] tracking-[10px] leading-[24px] font-poppins  md:border-l-2">
            Beach Experience
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-center items-center mt-4">
          <button
            className="z-10 mt-2 w-[250px] gap-4 h-auto px-[12px] py-[10px] flex bg-[rgba(0,0,0,0.8)] rounded-xl font-inter items-center justify-center text-white text-center font-[400] text-md"
            onClick={() => openModal("overnight")}
          >
            Overnight Booking
            <span>
              <img src={moon} alt="moon" />
            </span>
          </button>

          <button
            className="z-10 mt-2 w-[250px] gap-4 h-auto px-[12px] py-[10px] flex bg-[rgba(255,255,255,0.7)] rounded-xl font-inter items-center justify-center text-black text-center font-[400] text-md"
            onClick={() => nav("/daypass/guest")}
          >
            Daypass Booking
            <span>
              <img src={light} alt="light" />
            </span>
          </button>
        </div>
      </div>
      {/* Modal Popup*/}
      <div className="z-30 w-56 h-64 ">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Booking"
          style={{
            overlay: {
              zIndex: 50,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              zIndex: 51,
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "21px",
              outline: "none",
              padding: "50px",
            },
          }}
        >
          <div className="absolute top-3 right-3 ">
            <button
              onClick={closeModal}
              className="text-black bg-none border-none cursor-pointer"
            >
              <MdClose size="1.5em" className="font-[400]" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="align-middle  font-inter font-[400] max-w-80 justify-center items-center text-center ">
              <span className="text-lg font-inter">
                Do you want to create a new booking or manage an existing one?
              </span>
            </div>

            <div className="flex flex-col gap-4 md:flex-row justify-center items-center mt-2">
              <div className="border-2 border-black px-4 py-8 gap-4 flex flex-col justify-center rounded-lg items-center ">
                <img
                  src={existing}
                  alt="existing booking"
                  className="w-16 h-16"
                />
                <button
                  className="bg-black text-white font-inter  px-4 py-2 rounded-md"
                  onClick={handleExistingBookingClick}
                >
                  Existing Booking
                </button>
              </div>
              <div className="border-2 border-black px-4 py-8 gap-4 flex flex-col rounded-lg justify-center items-center bg-black ">
                <img src={newbooking} alt="new booking" className="w-16 h16" />
                <button
                  className="bg-white text-black font-inter font-[500] px-4 py-2 rounded-md"
                  onClick={handleNewBookingClick}
                >
                  New Booking
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {/* shape divider */}
      {windowWidth > 768 && (
        <div className="custom-shape-divider-bottom ">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q600,150 1200,0 V150 H0 Z"
              className="shape-fill"
              fill-opacity="0.8"
            ></path>
          </svg>
        </div>
      )}

      {/* FOOTER CONTACT  */}
      <div className="absolute bottom-0 left-0 gap-4 md:gap-0 flex justify-between items-center w-screen bg-[#000000] text-white font-cursive py-3 md:px-5  px-2 text-sm z-10">
        <div>
          <p>© 2023 JARA BEACH RESORT</p>
        </div>
        <div>
          <p className="text-right max-w-[300px] md:max-w-full">
            owned and operated by Little Company Nigeria Limited
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingType;
