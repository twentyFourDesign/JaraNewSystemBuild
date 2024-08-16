import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginScreen from "../screens/Admin/Accounts/LoginScreen";
import BookingScreen from "../screens/Admin/Dashboard/BookingScreen";
import GuestScreen from "../screens/Admin/Dashboard/GuestScreen";
import DaypassScreen from "../screens/Admin/Dashboard/DaypassScreen";
import BlacklistScreen from "../screens/Admin/Dashboard/BlacklistScreen";
import StaffScreen from "../screens/Admin/Dashboard/StaffScreen";
import VoucherScreen from "../screens/Admin/Dashboard/VoucherScreen";
import DiscountScreen from "../screens/Admin/Dashboard/DiscountScreen";
import TaskScreen from "../screens/Admin/Dashboard/TaskScreen";
import DaypassDiscountScreen from "../screens/Admin/Dashboard/DaypassDiscountScreen";
import DaypassVoucherScreen from "../screens/Admin/Dashboard/DaypassVoucherScreen";
import DayPassDetailsScreen from "../screens/Client/Daypass/DetailsScreem";

import BookingTypeScreen from "../screens/Client/BookingTypeScreen";
import OvernightGuestScreen from "../screens/Client/Overnight/GuestScreen";
import OvernightDetailsScreen from "../screens/Client/Overnight/DetailsScreen";
import OverNightSummaryScreen from "../screens/Client/Overnight/SummaryScreen";
import OverNightConfirmationScreen from "../screens/Client/Overnight/ConfirmationScreen";
import OvernightRoomDetailsScreen from "../screens/Client/Overnight/RoomDetailsScreen";
import BookingStatusScreen from "../screens/Admin/Dashboard/BookingStatusScreen";

import DaypassGuestScreen from "../screens/Client/Daypass/GuestScreen";
import DaypassSummaryScreen from "../screens/Client/Daypass/Summary";
import DayPassRoomDetailsScreen from "../screens/Client/Daypass/RoomDetailsScreen";
import PaymentScreen from "../screens/Admin/Dashboard/PaymentScreen";
import SettingScreen from "../screens/Admin/Dashboard/SettingScreen";
import RoomsScreen from "../screens/Admin/Dashboard/RoomsScreen";
import DaypassConfirmationScreen from "../screens/Client/Daypass/ConfirmationScreen";
import ProtectedRoute from "../components/ProtectedRoute";
import ResetPassword from "../components/ResetPassword";
const AllRoutes = () => {
  return (
    <Routes>
      {/* ADMIN ROUTES  */}
      <Route path="/admin/jara/">
        <Route path="login" element={<LoginScreen />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route
          path="booking"
          element={
            <ProtectedRoute>
              <BookingScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="guests"
          element={
            <ProtectedRoute>
              <GuestScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="day-pass"
          element={
            <ProtectedRoute>
              <DaypassScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="black-list-guests"
          element={
            <ProtectedRoute>
              <BlacklistScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="staff"
          element={
            <ProtectedRoute>
              <StaffScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="vouchers"
          element={
            <ProtectedRoute>
              <VoucherScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="discounts"
          element={
            <ProtectedRoute>
              <DiscountScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="tasks"
          element={
            <ProtectedRoute>
              <TaskScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="discounts/daypass"
          element={
            <ProtectedRoute>
              <DaypassDiscountScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="vouchers/daypass"
          element={
            <ProtectedRoute>
              <DaypassVoucherScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="payment"
          element={
            <ProtectedRoute>
              <PaymentScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="setting"
          element={
            <ProtectedRoute>
              <SettingScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="rooms"
          element={
            <ProtectedRoute>
              <RoomsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="booking-status/:ref"
          element={
            <ProtectedRoute>
              <BookingStatusScreen />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/" element={<BookingTypeScreen />} />
      <Route path="/overnight/guest" element={<OvernightGuestScreen />} />
      <Route path="/overnight/details" element={<OvernightDetailsScreen />} />
      <Route path="/overnight/summary" element={<OverNightSummaryScreen />} />
      <Route
        path="/overnight/confirmation"
        element={<OverNightConfirmationScreen />}
      />
      <Route
        path="/overnight/room-details"
        element={<OvernightRoomDetailsScreen />}
      />

      <Route path="/daypass/guest" element={<DaypassGuestScreen />} />
      <Route path="/daypass/summary" element={<DaypassSummaryScreen />} />
      <Route
        path="/daypass/room-details"
        element={<DayPassRoomDetailsScreen />}
      />
      <Route path="/daypass/details" element={<DayPassDetailsScreen />} />
      <Route
        path="/daypass/confirmation"
        element={<DaypassConfirmationScreen />}
      />

      <Route path="*" element={<BookingTypeScreen />} />
    </Routes>
  );
};

export default AllRoutes;
