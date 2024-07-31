import {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react'
import qs from 'qs'
import {ID, QueryResponseContextProps, QueryState} from './models'
import { Tooltip } from 'react-bootstrap'

function createResponseContext<T>(initialState: QueryResponseContextProps<T>) {
  return createContext(initialState)
}

function isNotEmpty(obj: unknown) {
  return obj !== undefined && obj !== null && obj !== ''
}

// Example: page=1&items_per_page=10&sort=id&order=desc&search=a&filter_name=a&filter_online=false
function stringifyRequestQuery(state: QueryState): string {
  const pagination = qs.stringify(state, {filter: ['page', 'items_per_page'], skipNulls: true})
  const sort = qs.stringify(state, {filter: ['sort', 'order'], skipNulls: true})
  const search = isNotEmpty(state.search)
    ? qs.stringify(state, {filter: ['search'], skipNulls: true})
    : ''

  const filter = state.filter
    ? Object.entries(state.filter as Object)
        .filter((obj) => isNotEmpty(obj[1]))
        .map((obj) => {
          return `filter_${obj[0]}=${obj[1]}`
        })
        .join('&')
    : ''

  return [pagination, sort, search, filter]
    .filter((f) => f)
    .join('&')
    .toLowerCase()
}

function parseRequestQuery(query: string): QueryState {
  const cache: unknown = qs.parse(query)
  return cache as QueryState
}

function calculatedGroupingIsDisabled<T>(isLoading: boolean, data: Array<T> | undefined): boolean {
  if (isLoading) {
    return true
  }

  return !data || !data.length
}

function calculateIsAllDataSelected<T>(data: Array<T> | undefined, selected: Array<ID>): boolean {
  if (!data) {
    return false
  }

  return data.length > 0 && data.length === selected.length
}

function groupingOnSelect(
  id: ID,
  selected: Array<ID>,
  setSelected: Dispatch<SetStateAction<Array<ID>>>
) {
  if (!id) {
    return
  }

  if (selected.includes(id)) {
    setSelected(selected.filter((itemId) => itemId !== id))
  } else {
    const updatedSelected = [...selected]
    updatedSelected.push(id)
    setSelected(updatedSelected)
  }
}

function groupingOnSelectAll<T>(
  isAllSelected: boolean,
  setSelected: Dispatch<SetStateAction<Array<ID>>>,
  data?: Array<T & {id?: ID}>
) {
  if (isAllSelected) {
    setSelected([])
    return
  }

  if (!data || !data.length) {
    return
  }

  setSelected(data.filter((item) => item.id).map((item) => item.id))
}

// Hook
function useDebounce(value: string | undefined, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}

const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    Xem phiếu xuất hàng
  </Tooltip>
);

function roundToNearestHalf(value: number, step = 0.5) {
  step || (step = 1.0);
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}
function customRoundKG(value: number): number {
  const roundedValue = (Math.ceil(value * 2)) / 2;
  return roundedValue;
}

const calculatePriceByKG = (arrayPrice: any[], KG: number) => {
  let totalPrice: number = 0;
  let totalPriceAdd: number = 0;
  arrayPrice.forEach((item: any) => {
    if (KG > item.fromKg && !item.additionalPrice && !item.additionalWeight) {
      totalPrice = item.price;
    } 
    if (item.additionalPrice && !item.additionalWeight && KG > item.toKg) {
      const step = customRoundKG(item.toKg - item.fromKg) / 0.5;
      totalPriceAdd += item.price*step;
    } else if (item.additionalPrice && !item.additionalWeight && KG <= item.toKg && KG > item.fromKg) {
      const step = customRoundKG(KG - item.fromKg) / 0.5;
      totalPriceAdd += item.price*step;
    } else if (item.additionalPrice && item.additionalWeight && KG > item.fromKg) {
      const step = customRoundKG(KG - item.fromKg) / 0.5;
      totalPriceAdd += item.price*step;
    }
  })
  return totalPrice + totalPriceAdd;
}

const calculatePriceByCBM = (arrayPrice: any[], CBM: number) => {
  let totalPrice: number = 0;
  console.log('bao CBM: ', CBM);
  arrayPrice.forEach((item: any) => {
    if (item.toVolume == CBM) {
      // console.log('bao item1: ', item)
      totalPrice = item.price;
    } else if (item.fromVolume < CBM && item.toVolume >= CBM && item.fromVolume && item.toVolume) {
      console.log('bao item2: ', item)

      totalPrice = item.price;
    } else if (item.fromVolume < CBM && !item.toVolume) {
      console.log('bao item3: ', item)

      totalPrice = item.price;
    }
  })
  return totalPrice ;
}

const calculatePricePackageByCBM = (arrayPrice: any[], PricePackageByCBM: number) => {
  let totalPrice: number = 0;
  console.log('bao PricePackageByCBM: ', PricePackageByCBM);
  arrayPrice.forEach((item: any) => {
    if (item.fromCbm < PricePackageByCBM && item.toCbm >= PricePackageByCBM) {
      console.log('bao item2: ', item)

      totalPrice = item;
    } else if (item.fromCbm < PricePackageByCBM && !item.toCbm) {
      console.log('bao item3: ', item)

      totalPrice = item;
    }
  })
  return totalPrice ;
}

const NumberConverterRejectSystax = (number: any) => {
  if(!number) return "";
  return Number(number?.toString()?.replace(/,/g, ''));
}

export {
  createResponseContext,
  stringifyRequestQuery,
  parseRequestQuery,
  calculatedGroupingIsDisabled,
  calculateIsAllDataSelected,
  groupingOnSelect,
  groupingOnSelectAll,
  useDebounce,
  isNotEmpty,
  renderTooltip,
  calculatePriceByKG,
  calculatePriceByCBM,
  calculatePricePackageByCBM,
  NumberConverterRejectSystax,
}
