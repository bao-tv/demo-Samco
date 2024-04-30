import React, {useCallback} from 'react';
import Button from 'react-bootstrap/Button';
import { usePageData } from '../../layout/core';
import _ from 'lodash';
import Receipt from '../../../_metronic/layout/components/Coupon/Receipt';
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

export const ButtonActionsRender = (props: any) => {
    const {setShowCreateAppModal, setRowDataOrder, rowDataOrder, rowDataCouponReciept, setRowDataCouponReciept} = usePageData();
    const handleEditRow = (params: any) => {
      console.log('bao props?.data: ', props.data)
        setShowCreateAppModal && setShowCreateAppModal(props?.data || false)
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
    }, [rowDataOrder, props.data]);
    const options: Options = {
        filename: "advanced-example.pdf",
        method: "save",
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        // resolution: Resolution.EXTREME,
        page: {
          // margin is in MM, default is Margin.NONE = 0
          margin: Margin.MEDIUM,
          // default is 'A4'
          format: "A4",
          // default is 'portrait'
        //   orientation: "landscape"
        },
        canvas: {
          // default is 'image/jpeg' for better size performance
          mimeType: "image/jpeg",
          qualityRatio: 2
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
            useCORS: true
          }
        }
      };
    const getTargetElement = () => document.getElementById("containerReceipt");
    const downloadPdf = () => generatePDF(getTargetElement, options);
    const handlePrintRow = async () => {
        setRowDataCouponReciept && await setRowDataCouponReciept({print: true, data: props.data});
        await downloadPdf();
        setRowDataCouponReciept && setRowDataCouponReciept(false);
        // generatePDF(getTargetElement, options);
    }
  return (
    <div className='d-flex h-100 justify-content-center align-items-center'>
        <Button
            size='sm'
            className='me-1'
            style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
            onClick={handleEditRow}
        >
            <i className="bi bi-pencil-square fs-2"></i>
        </Button>
        <Button
            size='sm'
            className='me-1'
            variant="danger"
            style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
            onClick={handleRemoveRow}
        >
            <i className="bi bi-x-circle fs-2"></i>
        </Button>
        <Button 
            size='sm' 
            variant="secondary" 
            style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
            onClick={handlePrintRow}
        >
            <i className="bi bi-printer fs-2"></i>
        </Button>
        {/* <div className='' id="containerReceipt">
            <Receipt data={props.data}/>
        </div> */}
    </div>
  )
}

export default ButtonActionsRender