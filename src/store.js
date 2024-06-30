import { configureStore } from "@reduxjs/toolkit";
import provinceReducer from "./slices/provinceSlices";
import packageReducer from "./slices/packSlices";
import distanceReducer from "./slices/distanceSlices";

const store = configureStore({
  reducer: {
    provinces: provinceReducer,
    packages: packageReducer,
    distances: distanceReducer,
  },
});

export default store;