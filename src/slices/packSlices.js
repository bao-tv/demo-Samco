import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {packageAPIGetAll} from '../apis/packageAPI';

export const packages: any = createAsyncThunk(
    'packages/fetchProvince',
    async (value) => {
        // console.log('bao value: ', value)
        try {
            const data = await packageAPIGetAll(value);
            return data.data;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    listPackages: [],
    isLoading: false,
    error: null
}
const packagesSlice = createSlice ({
    name: 'packages',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(packages.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(packages.fulfilled, (state, action) => {
            return {...state, isLoading: false, listPackages: action.payload, error: null}
        });
        builder.addCase(packages.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

// export const {packages_remove, packages_created} = packagesSlice.actions;

export default packagesSlice.reducer;