import React, {useCallback, useState} from 'react'
import Button from 'react-bootstrap/Button'
import {usePageData} from '../../layout/core'
import _ from 'lodash'
// import Receipt from '../../../_metronic/layout/components/Coupon/Receipt';
// import generatePDF, { Margin, Options } from "react-to-pdf";
import ToastError, {ToastSuccess} from '../crud-helper/Toast'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import ModalToasts from './ModalToasts'
import {
  receiptAPIDeleteById,
  receiptAPIGetByPagination,
  receiptEditAPIByID,
} from '../../../apis/receiptAPI'
import {useIntl} from 'react-intl'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import {defaultSearch} from '../../assets/define/Define'
import {useLocation} from 'react-router-dom'
// import html2canvas from 'html2canvas-pro';

export default function ButtonActionsRender(props: any) {
  const intl = useIntl()
  const location = useLocation()
  // console.log('bao location: ', location)
  const {
    setShowModalOrder,
    setRowDataOrder,
    reportTemplateRef1,
    reportTemplateRef2,
    reportTemplateRef3,
    setRowDataCouponReciept,
    setIsLoading,
    setRowDataSubPackage,
  } = usePageData()
  const [titleOrder, setTitleOrder] = useState<any>('')
  const [func, setFunc] = useState<string>('')
  const handleEditRow = (params: any) => {
    setShowModalOrder && setShowModalOrder(props?.data || false)
    setRowDataSubPackage && setRowDataSubPackage(props?.data.subPackages)
  }
  const buttonOKRemoveRow = async () => {
    const convertDefaultSearch: any = {
      ...defaultSearch,
      searchCriteria: {
        billStatus: ['CREATED', 'PENDING_APPROVAL', 'IN_WAREHOUSE', 'DELIVERED'],
      },
    }
    try {
      const response = props?.data?.id && (await receiptAPIDeleteById(props?.data?.id))
      response.status === 'OK' && ToastSuccess('Bạn đã xóa thành công!')
      const responseData = await receiptAPIGetByPagination(convertDefaultSearch)
      responseData.status === 'OK' && setRowDataOrder && setRowDataOrder(responseData?.data.content)
    } catch (err) {
      ToastError('Bạn xóa không thành công!')
    }
  }

  const handlePrintRow = async () => {
    try {
      setIsLoading(true) // Show loading GIF
      if (setRowDataCouponReciept) {
        await setRowDataCouponReciept({print: true, data: props.data})
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [210, 148],
        })
        let imgData1: any
        let imgData2: any
        let imgData3: any

        // Wait for the first canvas to finish
        imgData1 = await html2canvas(reportTemplateRef1.current).then((canvas) =>
          canvas.toDataURL('image/jpeg')
        )

        pdf.addImage(imgData1, 'image/jpeg', 2, 3, 206, 142) // Add first image

        // Wait for the second canvas to finish
        imgData2 = await html2canvas(reportTemplateRef2.current).then((canvas) =>
          canvas.toDataURL('image/jpeg')
        )

        pdf.addPage('a5', 'l')
        pdf.addImage(imgData2, 'image/jpeg', 2, 3, 206, 142) // Add second image

        // Wait for the third canvas to finish
        imgData3 = await html2canvas(reportTemplateRef3.current).then((canvas) =>
          canvas.toDataURL('image/jpeg')
        )

        pdf.addPage('a5', 'l')
        pdf.addImage(imgData3, 'image/jpeg', 2, 3, 206, 142) // Add third image
        // Convert PDF to Blob
        const pdfBlob = pdf.output('blob')

        // Create a Blob URL and open it in a new tab
        const blobUrl = URL.createObjectURL(pdfBlob)
        const newWindow = window.open(blobUrl, '_blank')
        // if (newWindow) {
        //   newWindow.onload = function() {
        //     newWindow.focus();  // Ensure the new tab is focused
        //     newWindow.print();  // Automatically trigger the print dialog
        //   };
        // }
        // pdf.save('download.pdf') // Save the PDF
        // setPdfUrl(pdfDataUrl);
      }
      ToastSuccess('In phiếu thành công')
    } catch (error) {
      console.error('Error:', error)
      ToastError('In phiếu thất bại')
    } finally {
      setIsLoading(false) // Hide loading GIF
      setRowDataCouponReciept && setRowDataCouponReciept(false)
    }
  }

  const buttonOKTransfertoWAREHOUSE = async () => {
    try {
      const response =
        props?.data?.id &&
        (await receiptEditAPIByID({...props?.data, billStatus: 'PENDING_APPROVAL'}))
      response.status === 'OK' && ToastSuccess('Bạn đã chuyển đến kho thành công!')
      const responseData = await receiptAPIGetByPagination(defaultSearch)
      responseData.status === 'OK' && setRowDataOrder && setRowDataOrder(responseData?.data.content)
    } catch (err) {
      ToastError('Bạn chuyển đến kho không thành công!')
    }
  }

  const buttonOKInWAREHOUSE = async () => {
    const convertDefaultSearch: any = {
      ...defaultSearch,
      searchCriteria: {
        billStatus: ['IN_WAREHOUSE', 'PENDING_APPROVAL', 'DELIVERED'],
      },
    }
    try {
      const response =
        props?.data?.id && (await receiptEditAPIByID({...props?.data, billStatus: 'IN_WAREHOUSE'}))
      response.status === 'OK' && ToastSuccess('Bạn đã nhận vào kho thành công!')
      const responseData = await receiptAPIGetByPagination(convertDefaultSearch)
      responseData.status === 'OK' && setRowDataOrder && setRowDataOrder(responseData?.data.content)
    } catch (err) {
      ToastError('Bạn chuyển đến kho không thành công!')
    }
  }

  const buttonOKTransfertoDELIVERED = async () => {
    const convertDefaultSearch: any = {
      ...defaultSearch,
      searchCriteria: {
        billStatus: ['IN_WAREHOUSE', 'PENDING_APPROVAL', 'DELIVERED'],
      },
    }
    try {
      const response =
        props?.data?.id && (await receiptEditAPIByID({...props?.data, billStatus: 'DELIVERED'}))
      response.status === 'OK' && ToastSuccess('Bạn chuyển đến đơn vị vận chuyển thành công!')
      const responseData = await receiptAPIGetByPagination(convertDefaultSearch)
      responseData.status === 'OK' && setRowDataOrder && setRowDataOrder(responseData?.data.content)
    } catch (err) {
      ToastError('Bạn chuyển đến đơn vị vận chuyển không thành công!')
    }
  }

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case 'DELETE':
        setTitleOrder(
          `Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}: ${props?.data?.id}`
        )
        setFunc('DELETE')
        break

      case 'TRANFERS':
        setTitleOrder(
          `Bạn có muốn chuyển ${intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}: ${
            props?.data?.id
          } đến kho`
        )
        setFunc('TRANFERS')
        break

      case 'IN_WAREHOUSE':
        setTitleOrder(
          `Bạn có muốn nhận ${intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}: ${
            props?.data?.id
          } vào kho`
        )
        setFunc('IN_WAREHOUSE')
        break

      case 'DELIVERED':
        setTitleOrder(
          `Bạn có muốn chuyển ${intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}: ${
            props?.data?.id
          } đến đơn vị vận chuyển`
        )
        setFunc('DELIVERED')
        break

      default:
        console.error('Unknown action type')
    }
  }

  return (
    <>
      <div className='d-flex h-100 justify-content-center align-items-center'>
        {location.pathname === '/quan-ly-don-hang/don-hang/phieu-nhan-hang' && (
          <>
            <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Chỉnh sửa</Tooltip>}>
              <span className='d-inline-block'>
                <Button
                  size='sm'
                  className='me-2 p-2'
                  style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
                  onClick={handleEditRow}
                  disabled={props?.data?.billStatus !== 'CREATED'}
                >
                  <i className='p-0 bi bi-pencil-square fs-2'></i>
                </Button>
              </span>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Xóa</Tooltip>}>
              <span className='d-inline-block'>
                <Button
                  size='sm'
                  className='me-2 p-2'
                  variant='danger'
                  style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
                  onClick={() => handleAction('DELETE')}
                  disabled={props?.data?.billStatus !== 'CREATED'}
                >
                  <i className='p-0 bi bi-x-circle fs-2'></i>
                </Button>
              </span>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Chuyển hàng đến kho</Tooltip>}>
              <span className='d-inline-block'>
                <Button
                  size='sm'
                  className='me-2 p-2'
                  variant='info'
                  style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
                  onClick={() => handleAction('TRANFERS')}
                  disabled={props?.data?.billStatus !== 'CREATED'}
                >
                  <i className='p-0 bi bi-shop-window fs-2'></i>
                </Button>
              </span>
            </OverlayTrigger>
          </>
        )}
        {location.pathname === '/quan-ly-kho/hang-trong-kho' && (
          <>
            <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Nhận hàng vào kho</Tooltip>}>
              <span className='d-inline-block'>
                <Button
                  size='sm'
                  className='me-2 p-2'
                  variant='info'
                  style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
                  onClick={() => handleAction('IN_WAREHOUSE')}
                  disabled={
                    props?.data?.billStatus === 'IN_WAREHOUSE' ||
                    props?.data?.billStatus === 'DELIVERED'
                  }
                >
                  <i className='p-0 bi bi-shop-window fs-2'></i>
                </Button>
              </span>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={<Tooltip id='tooltip-disabled'>Chuyển đến đơn vị vận chuyển</Tooltip>}
            >
              <span className='d-inline-block'>
                <Button
                  size='sm'
                  className='me-2 p-2'
                  variant='success'
                  style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
                  onClick={() => handleAction('DELIVERED')}
                  disabled={props?.data?.billStatus !== 'IN_WAREHOUSE'}
                >
                  <i className='p-0 bi bi-truck fs-2'></i>
                </Button>
              </span>
            </OverlayTrigger>
          </>
        )}

        <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>In phiếu nhận</Tooltip>}>
          <span className='d-inline-block'>
            <Button
              size='sm'
              className='me-2 p-2'
              variant='secondary'
              style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
              onClick={handlePrintRow}
            >
              <i className='p-0 bi bi-printer fs-2'></i>
            </Button>
          </span>
        </OverlayTrigger>
      </div>
      <ModalToasts
        title={titleOrder}
        onClickOK={() => {
          if (func === 'TRANFERS') {
            buttonOKTransfertoWAREHOUSE()
          } else if (func === 'DELETE') {
            buttonOKRemoveRow()
          } else if (func === 'IN_WAREHOUSE') {
            buttonOKInWAREHOUSE()
          } else if (func === 'DELIVERED') {
            buttonOKTransfertoDELIVERED()
          }
        }}
        handleClose={() => setTitleOrder('')}
      />
    </>
  )
}
