import { configureStore } from "@reduxjs/toolkit";
import provinceLiteReducer from "./slices/provinceLiteSlices";
import packagePriceReducer from "./slices/packagePriceSlice";
import packageCBMPriceReducer from "./slices/packageCBMPriceSlice";
import taxRateReducer from "./slices/taxRateSlices";

const store = configureStore({
  reducer: {
    provinceLites: provinceLiteReducer,
    packagesPrice: packagePriceReducer,
    packagesCBMPrice: packageCBMPriceReducer,
    taxRate: taxRateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default store;
export type { RootState, AppDispatch };