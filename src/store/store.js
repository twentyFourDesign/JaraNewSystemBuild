import { configureStore } from '@reduxjs/toolkit'
import daypassBookingInfo from './slices/daypass.slice'
import daypassAvailablity from './slices/daypassAvailablity.slice'
import daypassUserInfo from './slices/daypassUserInfo.slice'
import overnightGuestInfo from './slices/overnight/overnightGuest.slice'
import overnightRoomInfo from './slices/overnight/roomDetails.slice'
import overnightGuestDetails from './slices/overnight/guestInfo.slice'

const store = configureStore({
  reducer: {

    daypassBookingInfo:daypassBookingInfo,
    daypassAvailablity:daypassAvailablity,
    daypassUserInfo:daypassUserInfo,

    overnightGuestCount:overnightGuestInfo,
    overnightRoomInfo:overnightRoomInfo,
    overnightGuestDetails:overnightGuestDetails

  }
})

export default store