import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {provinceLiteAPIGetAll} from '../apis/provinceAPI';

export const provinceLite: any = createAsyncThunk(
    'provincesLite/fetchProvinceLite',
    async () => {
        // console.log('bao value: ', value)
        try {
            const data = await provinceLiteAPIGetAll();
            return data.data;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    listProvinceLite: [],
    isLoading: false,
    error: null
}
const provinceLiteSlice = createSlice ({
    name: 'provincesLite',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(provinceLite.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(provinceLite.fulfilled, (state, action) => {
            return {...state, isLoading: false, listProvinceLite: action.payload, error: null}
        });
        builder.addCase(provinceLite.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

// export const {province_remove, province_created} = provinceSlice.actions;

export default provinceLiteSlice.reducer;