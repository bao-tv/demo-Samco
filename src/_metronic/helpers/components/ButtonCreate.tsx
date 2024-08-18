import React from 'react'

type Props = {
  setData?: any
  title: string
}

const ButtonCreate = (props: Props) => {
  return (
    <div onClick={() => props?.setData(true)} className='btn btn-sm fw-bold btn-primary h-100'>
      {props.title}
    </div>
  )
}

export default ButtonCreate
