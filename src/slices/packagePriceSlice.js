import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {packagePriceAPIGetAll} from '../apis/packagePriceAPI';

export const packagesPrice: any = createAsyncThunk(
    'packagesPrice/fetchPackagePrice',
    async (value) => {
        // console.log('bao value: ', value)
        try {
            const data = await packagePriceAPIGetAll(value);
            return data.data;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    listPackagesPrice: [],
    isLoading: false,
    error: null
}
const packagesPriceSlice = createSlice ({
    name: 'packagesPrice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(packagesPrice.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(packagesPrice.fulfilled, (state, action) => {
            return {...state, isLoading: false, listPackagesPrice: action.payload, error: null}
        });
        builder.addCase(packagesPrice.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

// export const {packages_remove, packages_created} = packagesSlice.actions;

export default packagesPriceSlice.reducer;