import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {deliveryConfigAPIGetAll} from '../apis/deliveryConfigAPI';

export const Percentage: any = createAsyncThunk(
    'Percentage/fetchTax',
    async () => {
        // console.log('bao value: ', value)
        try {
            const data = await deliveryConfigAPIGetAll();
            return data.data;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)



const initialState: any = {
    percentage: {},
    listPercentage: {},
    isLoading: false,
    error: null
}

const getValueDefineInit = (listPercentage: any) => {
    // console.log('bao listPercentage: ', listPercentage);
    
    const data = listPercentage.reduce((acc: any, item: any) => {
      if (!acc[item.code] || (item.createdDate) > (acc[item.code].createdDate)) {
        acc[item.code] = { percentage: item.percentage, createdDate: item.createdDate };
      }
      return acc;
    }, {});
  
    // Map to only include code: percentage
    const result = Object.keys(data).reduce((acc: any, key: string) => {
      acc[key] = data[key].percentage;
      return acc;
    }, {});
  
    // console.log('bao data: ', result);
    return result;
  };
  
  
const taxRateSlice = createSlice ({
    name: 'Percentage',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(Percentage.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(Percentage.fulfilled, (state, action) => {
            return {...state, isLoading: false, listPercentage: action.payload ,percentage: getValueDefineInit(action.payload), error: null}
        });
        builder.addCase(Percentage.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

// export const {province_remove, province_created} = provinceSlice.actions;

export default taxRateSlice.reducer;