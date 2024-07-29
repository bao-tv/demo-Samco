import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {packageCBMPriceAPIGetAll} from '../apis/packageCBMPriceAPI';

export const packagesCBMPrice: any = createAsyncThunk(
    'packagesCBMPrice/fetchPackageCBMPrice',
    async (value) => {
        // console.log('bao value: ', value)
        try {
            const data = await packageCBMPriceAPIGetAll(value);
            return data.data;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    listPackagesCBMPrice: [],
    isLoading: false,
    error: null
}
const packagesCBMPriceSlice = createSlice ({
    name: 'packagesCBMPrice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(packagesCBMPrice.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(packagesCBMPrice.fulfilled, (state, action) => {
            return {...state, isLoading: false, listPackagesCBMPrice: action.payload, error: null}
        });
        builder.addCase(packagesCBMPrice.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

// export const {packagesCBM_remove, packagesCBM_created} = packagesCBMSlice.actions;

export default packagesCBMPriceSlice.reducer;