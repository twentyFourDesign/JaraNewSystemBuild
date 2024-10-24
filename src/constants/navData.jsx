import { FaBed, FaPeopleCarry } from "react-icons/fa";
import { GrUserFemale } from "react-icons/gr";
import { LuBed } from "react-icons/lu";
import {
  MdBlock,
  MdDiscount,
  MdOutlineBedroomParent,
  MdOutlinePayments,
} from "react-icons/md";
import {
  RiCalendarTodoFill,
  RiCoupon2Fill,
  RiCoupon3Fill,
} from "react-icons/ri";
// import { TbDiscountCheckFilled } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSolidUserAccount } from "react-icons/bi";

export const navLinks = [
  {
    title: "Bookings",
    link: "/admin/jara/booking",
    icons: <FaBed />,
  },
  {
    title: "Guests",
    link: "/admin/jara/guests",
    icons: <GrUserFemale />,
  },
  {
    title: "Booking Details",
    link: "/admin/jara/day-pass",
    icons: <LuBed />,
  },
  {
    title: "Blacklisted Guests",
    link: "/admin/jara/black-list-guests",
    icons: <MdBlock />,
  },
  {
    title: "Staff",
    link: "/admin/jara/staff",
    icons: <FaPeopleCarry />,
  },
  {
    title: "Tasks",
    link: "/admin/jara/tasks",
    icons: <RiCalendarTodoFill />,
  },
  {
    title: "Vouchers",
    link: "/admin/jara/vouchers",
    icons: <RiCoupon2Fill />,
  },
  {
    title: "Discounts",
    link: "/admin/jara/discounts",
    icons: <TbRosetteDiscountCheckFilled />,
  },
  {
    title: "Daypass Discounts",
    link: "/admin/jara/discounts/daypass",
    icons: <MdDiscount />,
  },
  {
    title: "Daypass Vouchers",
    link: "/admin/jara/vouchers/daypass",
    icons: <RiCoupon3Fill />,
  },
  {
    title: "Payments",
    link: "/admin/jara/payment",
    icons: <MdOutlinePayments />,
  },
  {
    title: "Settings",
    link: "/admin/jara/setting",
    icons: <IoIosSettings />,
  },
  {
    title: "Rooms",
    link: "/admin/jara/rooms",
    icons: <MdOutlineBedroomParent />,
  },
  {
    title: "Accounts",
    link: "/admin/jara/accounts",
    icons: <BiSolidUserAccount />,
  },
];
