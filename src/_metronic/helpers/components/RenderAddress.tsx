import React from 'react'

type Props = {}

export const RenderAddress = (props: any) => {
    // console.log('bao props: ', props)
  return (
    <div>{`${props?.data.receiverAddress}, ${props?.data.receiverCommune.name}, ${props?.data.receiverDistrict.name}, ${props?.data.receiverProvince.name}`}</div>
  )
}

export default RenderAddress