import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from '../screens/Admin/Accounts/LoginScreen'
import BookingScreen from '../screens/Admin/Dashboard/BookingScreen'
import GuestScreen from '../screens/Admin/Dashboard/GuestScreen'
import DaypassScreen from '../screens/Admin/Dashboard/DaypassScreen'
import BlacklistScreen from '../screens/Admin/Dashboard/BlacklistScreen'
import StaffScreen from '../screens/Admin/Dashboard/StaffScreen'
import VoucherScreen from '../screens/Admin/Dashboard/VoucherScreen'
import DiscountScreen from '../screens/Admin/Dashboard/DiscountScreen'
import TaskScreen from '../screens/Admin/Dashboard/TaskScreen'
import DaypassDiscountScreen from '../screens/Admin/Dashboard/DaypassDiscountScreen'
import DaypassVoucherScreen from '../screens/Admin/Dashboard/DaypassVoucherScreen'
import DayPassDetailsScreen from '../screens/Client/Daypass/DetailsScreem'

import BookingTypeScreen from '../screens/Client/BookingTypeScreen'
import OvernightGuestScreen from '../screens/Client/Overnight/GuestScreen'
import OvernightDetailsScreen from '../screens/Client/Overnight/DetailsScreen'
import OverNightSummaryScreen from '../screens/Client/Overnight/SummaryScreen'
import OverNightConfirmationScreen from '../screens/Client/Overnight/ConfirmationScreen'
import OvernightRoomDetailsScreen from '../screens/Client/Overnight/RoomDetailsScreen'

import DaypassGuestScreen from '../screens/Client/Daypass/GuestScreen'
import DaypassSummaryScreen from '../screens/Client/Daypass/Summary'
import DayPassRoomDetailsScreen from '../screens/Client/Daypass/RoomDetailsScreen'
import PaymentScreen from '../screens/Admin/Dashboard/PaymentScreen'
import SettingScreen from '../screens/Admin/Dashboard/SettingScreen'
import RoomsScreen from '../screens/Admin/Dashboard/RoomsScreen'

const AllRoutes = () => {
  return (

    <Routes>

      {/* ADMIN ROUTES  */}
      <Route path='/admin/jara/'>
        <Route path='login' element={<LoginScreen />} />
        <Route path='booking' element={<BookingScreen />} />
        <Route path='guests' element={<GuestScreen />} />
        <Route path='day-pass' element={<DaypassScreen />} />
        <Route path='black-list-guests' element={<BlacklistScreen />} />
        <Route path='staff' element={<StaffScreen />} />
        <Route path='vouchers' element={<VoucherScreen />} />
        <Route path='discounts' element={<DiscountScreen />}/>
        <Route path='tasks' element={<TaskScreen />} />
        <Route path='discounts/daypass' element={<DaypassDiscountScreen />} />
        <Route path='vouchers/daypass' element={<DaypassVoucherScreen />} />
        <Route path='payment' element={<PaymentScreen />} />
        <Route path='setting' element={<SettingScreen />} />
        <Route path='rooms' element={<RoomsScreen />} />
      </Route>

      <Route path='/' element={<BookingTypeScreen/>}/>
      <Route path='/overnight/guest' element={<OvernightGuestScreen/>}/>
      <Route path='/overnight/details' element={<OvernightDetailsScreen/>}/>
      <Route path='/overnight/summary' element={<OverNightSummaryScreen/>}/>
      <Route path='/overnight/confirmation' element={<OverNightConfirmationScreen/>}/>
      <Route path='/overnight/room-details' element={<OvernightRoomDetailsScreen/>}/>

      <Route path='/daypass/guest' element={<DaypassGuestScreen/>}/>
      <Route path='/daypass/summary' element={<DaypassSummaryScreen/>}/>
      <Route path='/daypass/room-details' element={<DayPassRoomDetailsScreen/>}/>
      <Route path='/daypass/details' element={<DayPassDetailsScreen/>}/>


    </Routes>
  )
}

export default AllRoutes
