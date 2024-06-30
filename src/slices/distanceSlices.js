import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {distanceAPIGetAll} from '../apis/distanceAPI';

export const distance: any = createAsyncThunk(
    'distances/fetchProvince',
    async (value) => {
        // console.log('bao value: ', value)
        try {
            const data = await distanceAPIGetAll(value);
            return data.data;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    listDistance: [],
    isLoading: false,
    error: null
}
const distanceSlice = createSlice ({
    name: 'distances',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(distance.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(distance.fulfilled, (state, action) => {
            return {...state, isLoading: false, listDistance: action.payload, error: null}
        });
        builder.addCase(distance.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

// export const {distance_remove, distance_created} = distanceSlice.actions;

export default distanceSlice.reducer;