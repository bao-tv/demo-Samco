import { configureStore } from "@reduxjs/toolkit";
import provinceLiteReducer from "./slices/provinceLiteSlices";
import packagePriceReducer from "./slices/packagePriceSlice";
import packageCBMPriceReducer from "./slices/packageCBMPriceSlice";

const store = configureStore({
  reducer: {
    provinceLites: provinceLiteReducer,
    packagesPrice: packagePriceReducer,
    packagesCBMPrice: packageCBMPriceReducer,
  },
});

export default store;