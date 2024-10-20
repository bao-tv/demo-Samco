import React, { useState }  from 'react'
import Modal from 'react-bootstrap/Modal';
import Receipt from '../../../_metronic/layout/components/Coupon/Receipt';
// import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";
import { usePageData } from '../../../_metronic/layout/core';
import { useRef } from 'react';
import ReceiptLayoutPrints from '../../../_metronic/layout/components/Coupon/ReceiptLayoutPrints';
// import ReportTemplate from './ReportTemplate';

// const options: Options = {
//     filename: "goods-delivery.pdf",
//     method: "save",
//     // default is Resolution.MEDIUM = 3, which should be enough, higher values
//     // increases the image quality but also the size of the PDF, so be careful
//     // using values higher than 10 when having multiple pages generated, it
//     // might cause the page to crash or hang.
//     // resolution: Resolution.EXTREME,
//     page: {
//       // margin is in MM, default is Margin.NONE = 0
//       margin: Margin.MEDIUM,
//       // default is 'A4'
//       format: "letter",
//       // default is 'portrait'
//     //   orientation: "landscape"
//     },
//     canvas: {
//       // default is 'image/jpeg' for better size performance
//       mimeType: "image/jpeg",
//       qualityRatio: 1
//     },
//     // Customize any value passed to the jsPDF instance and html2canvas
//     // function. You probably will not need this and things can break,
//     // so use with caution.
//     overrides: {
//       // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
//       pdf: {
//         compress: true
//       },
//       // see https://html2canvas.hertzen.com/configuration for more options
//       canvas: {
//         useCORS: true
//       }
//     }
//   };
  
// you can also use a function to return the target element besides using React refs
const getTargetElement = () => document.getElementById("container");

// const downloadPdf = () => generatePDF(getTargetElement, options);

const ModalShowImport = () => {
  const {rowDataCouponReciept, setRowDataCouponReciept} = usePageData();
  // console.log('bao rowDataCouponReciept: ', rowDataCouponReciept);
  const handleClose = () => (setRowDataCouponReciept && setRowDataCouponReciept(false));
  return (
    <>
      <Modal show={rowDataCouponReciept.isShowReceipt || rowDataCouponReciept.isPrintReceipt} onHide={handleClose} size='xl'>
        <Modal.Header closeButton className='p-3'>
          {/* <Modal.Title>PHIẾU NHẬN HÀNG</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className='p-2'>
          {rowDataCouponReciept.isShowReceipt && <Receipt data={rowDataCouponReciept}/>}
          {rowDataCouponReciept.isPrintReceipt && <ReceiptLayoutPrints data={rowDataCouponReciept.data}/>}
            
            {/* <ReceiptLayoutPrints data={rowDataCouponReciept}/> */}
        </Modal.Body>
        {/* <Modal.Footer className='p-3'>
            <p role="button" onClick={downloadPdf}>Download PDF</p>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default ModalShowImport