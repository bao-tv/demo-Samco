import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {taxRateAPIGetAll} from '../apis/taxRateAPI';

export const taxRate: any = createAsyncThunk(
    'taxRate/fetchTax',
    async () => {
        // console.log('bao value: ', value)
        try {
            const data = await taxRateAPIGetAll();
            return data.data;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)



const initialState: any = {
    listTax: [],
    isLoading: false,
    error: null
}
const taxRateSlice = createSlice ({
    name: 'taxRate',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(taxRate.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(taxRate.fulfilled, (state, action) => {
            return {...state, isLoading: false, listTax: action.payload, error: null}
        });
        builder.addCase(taxRate.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

// export const {province_remove, province_created} = provinceSlice.actions;

export default taxRateSlice.reducer;