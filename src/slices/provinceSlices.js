import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {provinceAPIGetAll} from '../apis/provinceAPI';

export const province: any = createAsyncThunk(
    'provinces/fetchProvince',
    async (value) => {
        // console.log('bao value: ', value)
        try {
            const data = await provinceAPIGetAll(value);
            return data.data;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    listProvince: [],
    isLoading: false,
    error: null
}
const provinceSlice = createSlice ({
    name: 'provinces',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(province.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(province.fulfilled, (state, action) => {
            return {...state, isLoading: false, listProvince: action.payload, error: null}
        });
        builder.addCase(province.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

// export const {province_remove, province_created} = provinceSlice.actions;

export default provinceSlice.reducer;