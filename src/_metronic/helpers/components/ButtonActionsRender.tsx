import React, {useCallback, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { usePageData } from '../../layout/core';
import _ from 'lodash';
// import Receipt from '../../../_metronic/layout/components/Coupon/Receipt';
// import generatePDF, { Margin, Options } from "react-to-pdf";
import ToastError, { ToastSuccess } from '../crud-helper/Toast';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalToasts from './ModalToasts';
import { receiptAPIDeleteById, receiptAPIGetAll } from '../../../apis/receiptAPI';
import { useIntl } from 'react-intl';
import { useRef } from 'react';
import { Document, Page, Text, PDFDownloadLink } from '@react-pdf/renderer';
// import ReportTemplate from './ReportTemplate';

export const ButtonActionsRender = (props: any) => {
  const intl = useIntl();
    const {setShowModalOrder, setRowDataOrder, reportTemplateRef, rowDataOrder, rowDataCouponReciept, setRowDataCouponReciept, setIsLoading} = usePageData();
    const [titleOrder, setTitleOrder] = useState<any>('');
    const handleEditRow = (params: any) => {
        setShowModalOrder && setShowModalOrder(props?.data || false)
    }
    const handleRemoveRow = useCallback(() => {
      setTitleOrder(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}: ${props?.data?.id}`);
    }, []);

    const handlePrintRow = async () => {
        try {
          setIsLoading(true); // Show loading GIF
          if (setRowDataCouponReciept) {
            await setRowDataCouponReciept({ print: true, data: props.data });
          }
          
          // await downloadPdf();

        } catch (error) {
          console.error('bao Error:', error);
        } finally {
          setIsLoading(false); // Hide loading GIF
          ToastSuccess('In phiếu thành công');
          if (setRowDataCouponReciept) {
            setRowDataCouponReciept(false);
          }
        }

    }
    const buttonOK = async () => {
      try {
          const response = props?.data?.id && await receiptAPIDeleteById(props?.data?.id)
          response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
          const responseDistrict = await receiptAPIGetAll();
          responseDistrict.status === "OK" && setRowDataOrder && setRowDataOrder(responseDistrict?.data)  
        }catch (err) {
          ToastError("Bạn xóa không thành công!")
        }
  }
  return (
    <>
      <div className='d-flex h-100 justify-content-center align-items-center'>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Chỉnh sửa</Tooltip>}>
          <span className="d-inline-block">
            <Button
                size='sm'
                className='me-1 p-2'
                style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
                onClick={handleEditRow}
            >
                <i className="p-0 bi bi-pencil-square fs-2"></i>
            </Button>
          </span>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Xóa</Tooltip>}>
          <span className="d-inline-block">
            <Button
                size='sm'
                className='me-1 p-2'
                variant="danger"
                style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
                onClick={handleRemoveRow}
            >
              <i className="p-0 bi bi-x-circle fs-2"></i>
            </Button>
          </span>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">In phiếu nhận</Tooltip>}>
          <span className="d-inline-block">
            <Button 
                size='sm' 
                className='me-1 p-2'
                variant="secondary" 
                style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
                onClick={handlePrintRow}
            >
              <i className="p-0 bi bi-printer fs-2"></i>
            </Button>
          </span>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Xuất hóa đơn</Tooltip>}>
          <span className="d-inline-block">
          <Button 
              size='sm'
              className='p-2'
              variant="success"
              style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
              // onClick={handlePrintRow}
          >
              <i className="p-0 bi bi-receipt-cutoff fs-2"></i>
          </Button>
          </span>
        </OverlayTrigger>
          {/* <div className='' id="containerReceipt">
              <Receipt data={props.data}/>
          </div> */}
      </div>
      <ModalToasts title={titleOrder} onClickOK={buttonOK} handleClose={() => setTitleOrder('')} />
    </>
  )
}

export default ButtonActionsRender