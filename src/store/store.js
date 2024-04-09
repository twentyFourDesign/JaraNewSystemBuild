import { configureStore } from '@reduxjs/toolkit'
import daypassBookingInfo from './slices/daypass.slice'
import daypassAvailablity from './slices/daypassAvailablity.slice'

const store = configureStore({
  reducer: {
    daypassBookingInfo:daypassBookingInfo,
    daypassAvailablity:daypassAvailablity,
    // daypassPersonalInfo:""
  }
})

export default store