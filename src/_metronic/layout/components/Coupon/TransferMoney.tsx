import React from 'react'
import {usePageData} from '../../core'
import {NumberFormat, toAbsoluteUrl} from '../../../helpers'
import dayjs from 'dayjs'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap'

type Props = {
  data?: any
  show?: boolean
  handleClose?: any
  hanleGetPDFTranfMoney?: any
}

const TransferMoney = ({data, show, handleClose, hanleGetPDFTranfMoney}: Props) => {
  const dataRender = []
  for (let i = 0; i < 10; i++) {
    const obj = {
      id: '',
      receiptCode: '',
      itemName: '',
      itemQuantity: 0,
      itemWeight: 0,
      totalAmount: 0,
      itemFragile: '',
      receiverProvince: '',
      subPackages: [],
      isNull: true,
    }
    if(data.length > i) {
        dataRender.push(data[i]) 
    } else dataRender.push(obj)
    // Or any value
  }
  // console.log('bao dataL: ', dataRender);
  // const [totalItem, set]
  let totalserviceFee: number = 0
  // let totalVAT: number = 0
  let totalMoney: number = 0
  const {tranferMoneyTemplateRef} = usePageData()
  return (
    <Modal show={show} backdrop="static" onHide={handleClose} fullscreen='true' size='xl' bsPrefix='modalTransferMoney modal' contentClassName='modal-size' centered={true}>
      <Modal.Header closeButton className='p-2'>
          <Modal.Title>BẢNG KÊ THU TIỀN</Modal.Title>
        </Modal.Header >
        <Modal.Body className='p-2'>
        <div className='' style={{width: '1240px'}}>
          <div className='container' style={{width: '1240px'}} ref={tranferMoneyTemplateRef}>
            <div className='row fs-4 border border-dark'>
              <div className='col-2 pt-3'>
                <img src={toAbsoluteUrl('/media/logos/logo-new.png')} alt='Logo' className='w-100' />
              </div>
              <div className='col-7 text-center pt-3'>
                <p className='fw-bold m-0'>
                  TỔNG CÔNG TY CƠ KHÍ GIAO THÔNG VẬN TẢI CƠ KHÍ SÀI GÒN - TNHH MTV
                </p>
                <p className='fw-bold m-0 mb-2'>BẾN XE MIỀN ĐÔNG MỚI</p>
                <p className='m-0 fs-5'>
                  Địa chỉ: 501 Hoàng Hữu Nam, P.Long Bình, Tp.Thủ Đức, Tp.Hồ Chí Minh
                </p>
                <p className='m-0 fs-5 mb-2'>MST: 0300 481 551 - Điện thoại: 0373.501.501</p>
                <p className='fw-bolder m-0 ' style={{fontSize: '24px'}}>
                BẢNG KÊ THU TIỀN DỊCH VỤ LOGISTICS NGÀY {dayjs(data?.createdDate).format('DD/MM/YYYY')}
                </p>
              </div>
              {/* <div className='col-3 text-center fw-bold border-dark p-0'>
                    
                </div> */}
            </div>
            <div className='row border-start border-end border-bottom border-dark'>
              <div className='col-5 align-content-center' style={{height: '32px'}}>
                <p className='m-0'>Người lập: </p>
              </div>
              <div className='col-5 align-content-center' style={{height: '32px'}}>
                <p className='m-0'>Ca lam việc: </p>
              </div>
            </div>
            <div className='row border-start border-end border-bottom border-dark'>
              <Table className=' mb-0' bordered={true} variant='light'>
                <thead>
                  <tr>
                    <th className='tableHeader' style={{width: '3%'}}>STT</th>
                    <th className='tableHeader' style={{width: '3%'}}>SỐ ĐƠN HÀNG</th>
                    <th className='tableHeader' style={{width: '6%'}}>MÃ NHẬN HÀNG</th>
                    <th className='tableHeader' style={{width: '6%'}}>NGÀY NHẬN</th>
                    <th className='tableHeader' style={{width: '8%'}}>NHÂN VIÊN NHẬN</th>
                    <th className='tableHeader' style={{width: '8%'}}>KHÁCH HÀNG</th>
                    <th className='tableHeader' style={{width: '18%'}}>ĐỊA CHỈ</th>
                    <th className='tableHeader' style={{width: '6%'}}>MÃ SỐ THUẾ</th>
                    <th className='tableHeader' style={{width: '9%'}}>EMAIL</th>
                    <th className='tableHeader' style={{width: '10%'}}>DOANH THU TRƯỚC THUẾ</th>
                    <th className='tableHeader' style={{width: '7%'}}>THUẾ GTGT</th>
                    <th className='tableHeader' style={{width: '10%'}}>THÀNH TIỀN</th>
                    <th className='tableHeader' style={{width: '10%'}}>NƠI ĐẾN</th>
                    <th className='tableHeader' style={{width: '2%'}}>XUẤT HĐ</th>
                  </tr>
                </thead>
                <tbody style={{fontSize: '10px'}}>
                  {dataRender.map((item: any, i: number) => {
                    totalserviceFee += ((isNaN(item.serviceFee) ? 0 : item.serviceFee) + (isNaN(item.packagingServiceFee) ? 0 : item.packagingServiceFee))
                    console.log('bao totalserviceFee: ', totalserviceFee);
                    // totalVAT += item?.itemWeight
                    totalMoney += item?.totalAmount
                    return (
                      <tr style={{height: '40px'}} key={item?.id}>
                        <td className='tableBody'>{!item?.isNull && i + 1}</td>
                        <td className='tableBody'>{item?.id}</td>
                        <td className='tableBody'>{item?.receiptCode}</td>
                        <td className='tableBody'>{item?.createdDate ? dayjs(item?.createdDate).format('DD/MM/YYYY') : ''}</td>
                        <td className='tableBody'></td>
                        <td className='tableBody'>{item?.senderName}</td>
                        <td className='tableBody'>{item?.senderAddress}</td>
                        <td className='tableBody'></td>
                        <td className='tableBody'></td>
                        <td className='tableBody'>{!item?.isNull && NumberFormat(item?.serviceFee + item?.packagingServiceFee)}</td>
                        <td className='tableBody'>{!item?.isNull &&  NumberFormat(item?.totalAmount * 0.08)}</td>
                        <td className='tableBody'>{!item?.isNull &&  NumberFormat(item?.totalAmount * 1.08)}</td>
                        <td className='tableBody'>{!item?.isNull && (item?.receiverProvince.name)}</td>
                        <td className='tableBody'></td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td colSpan={5}></td>
                    <td className='fw-bold fs-3 p-0' colSpan={3}>Tổng cộng: </td>
                    {/* <td className='fw-bold fs-3 p-0' colSpan={3}>{data?.length}</td> */}
                    <td className='fw-bold fs-3 p-0'>{NumberFormat(totalserviceFee)}</td>
                    <td className='fw-bold fs-3 p-0'>{NumberFormat(totalMoney * 0.08)}</td>
                    <td className='fw-bold fs-3 p-0'>{NumberFormat(totalMoney  * 1.08)}</td>
                    <td className='fw-bold fs-3 p-0'></td>
                    <td className='fw-bold fs-3 p-0'></td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className='row border-start border-end border-bottom border-dark'>
              <div className='col-6 text-center'>
                <p className='m-0'>NGƯỜI LẬP BIỂU</p>
                <p className='m-0'>(Ký và ghi rõ họ tên)</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
              <div className='col-6 text-center'>
                <p className='m-0'>Tp.HCM, ngày {dayjs().date()} tháng {dayjs().month()} năm {dayjs().year()}</p>
                <p className='m-0'>PHÒNG KINH DOANH</p>
                <p className='m-0'>(Ký và ghi rõ họ tên)</p>
              </div>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer className='p-0'>
          <Button onClick={() => hanleGetPDFTranfMoney()} variant="primary">In BẢNG KÊ THU TIỀN</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default TransferMoney
