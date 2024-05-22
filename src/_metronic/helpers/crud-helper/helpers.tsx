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

const calculatePrice = (arrayPrice: any[], KG: number) => {
  let totalPrice: number = 0;
  let KGOver: number = 0;
  arrayPrice.forEach((item: any) => {
    const step = roundToNearestHalf(item.maxKG) - roundToNearestHalf(item.minKG);
    if (KG > +item.minKG && KG <= +item.maxKG) {
      KGOver = KG - roundToNearestHalf(item.minKG);
    }
    if (KG >= item.maxKG) {
      if (!item.price_add) {
        totalPrice = +item.price_number;
      } else {
        totalPrice += (+item.price_number)*step*2;
      }
    } else if (KG < item.maxKG && KG >= item.minKG && step) {
      totalPrice += +item.price_number*KGOver*2
    } else if (KG > 40) {
      // console.log('bao customRoundKG(KG-40): ', customRoundKG(KG-40));
      totalPrice += +item.price_number*customRoundKG(KG-40)*2
    }
  })
  return totalPrice;
}

const calculatePriceVehicle = (arrayPrice: any[], price_code: number) => {
  // console.log('bao arrayPrice: ', arrayPrice);
  // console.log('bao price_code: ', price_code);
  const objectPrice = arrayPrice.filter((item: any) => item.price_code === price_code)
  // console.log('bao objectPrice: ', objectPrice)
  return objectPrice[0]?.price_number
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
  calculatePrice,
  calculatePriceVehicle,
}
