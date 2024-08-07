import React, {useCallback, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { usePageData } from '../../layout/core';
import _ from 'lodash';
import Receipt from '../../../_metronic/layout/components/Coupon/Receipt';
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";
import { ToastSuccess } from '../crud-helper/Toast';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const ButtonActionsRender = (props: any) => {
    const {setShowModalOrder, setRowDataOrder, rowDataOrder, rowDataCouponReciept, setRowDataCouponReciept, setIsLoading} = usePageData();
    const handleEditRow = (params: any) => {
        setShowModalOrder && setShowModalOrder(props?.data || false)
    }
    const handleRemoveRow = useCallback(() => {
        if (!rowDataOrder) return;
        const newRowDataOrder = rowDataOrder.map((item) => {
            if (item.indexRow === props?.data?.indexRow) {
                return { ...item, isRemove: true };
            }
            return item;
        });
        
        setRowDataOrder && setRowDataOrder(newRowDataOrder);
        ToastSuccess('Xóa phiếu thành công');
    }, [rowDataOrder, props.data]);
    const options: Options = {
        filename: "goods-delivery.pdf",
        method: "save",
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        // resolution: Resolution.EXTREME,
        page: {
          // margin is in MM, default is Margin.NONE = 0
          margin: Margin.SMALL,
          // default is 'A4'
          format: "A5",
          // default is 'portrait'
          orientation: "landscape"
        },
        canvas: {
          // default is 'image/jpeg' for better size performance
          mimeType: "image/jpeg",
          qualityRatio: 0.1
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break,
        // so use with caution.
        overrides: {
          // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
          pdf: {
            compress: true
          },
          // see https://html2canvas.hertzen.com/configuration for more options
          canvas: {
            useCORS: false
          }
        }
      };
    const getTargetElement = () => document.getElementById("containerReceipt");
    const downloadPdf = () => generatePDF(getTargetElement, options);
    const handlePrintRow = async () => {
        try {
          setIsLoading(true); // Show loading GIF
          if (setRowDataCouponReciept) {
            await setRowDataCouponReciept({ print: true, data: props.data });
          }
          await downloadPdf();
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoading(false); // Hide loading GIF
          ToastSuccess('In phiếu thành công');
          if (setRowDataCouponReciept) {
            setRowDataCouponReciept(false);
          }
        }
    }
  return (
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
  )
}

export default ButtonActionsRender