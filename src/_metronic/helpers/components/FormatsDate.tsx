import React from 'react'
import dayjs from 'dayjs'

type Props = {}

export const FormatsDate: React.FC<any> = (params) => {
  // console.log('bao params: ', params)
  const formattedDate = dayjs(params?.value).format()
  const formattedDateString = dayjs(formattedDate).format('DD/MM/YYYY')
  return (
    <>
      <span>
        {formattedDateString}
      </span>
    </>
  )
}

export const FormatsDateReceiver: React.FC<any> = (params) => {
  // Convert the string to a Date object
  let date = new Date(params?.data.createdDate)

  // Number of days you want to add
  let daysToAdd = params?.data.receiverProvince.regionFreightPrice.deliveryTime

  // Add the days
  date.setUTCDate(date.getUTCDate() + daysToAdd)

  // Convert back to ISO string format if needed
  let newDate = date.toISOString()
  const formattedDateString = dayjs(newDate).format('DD/MM/YYYY')
  return (
    <>
      <span>
        {formattedDateString}
      </span>
    </>
  )
}

export default FormatsDate
