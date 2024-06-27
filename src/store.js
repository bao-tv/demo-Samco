import { configureStore } from "@reduxjs/toolkit";
import provinceReducer from "./slices/provinceSlices";

const store = configureStore({
  reducer: {
    provinces: provinceReducer,
  },
});

export default store;