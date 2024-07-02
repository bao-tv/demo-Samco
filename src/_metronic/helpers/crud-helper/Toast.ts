import React from 'react'
import { Bounce, toast } from 'react-toastify';
const ToastError = (message : any) => (
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  })
)

export const ToastSuccess = (string: any) => {
    return (
      toast.success(string, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          })
    )
  }

export const ToastWarn = (string: any) => {
return (
    toast.warn(string, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        })
)
}

export const covertNumberWithReject = (number: string|number) => (`${number}`).replace(/,/g, '');

export default ToastError