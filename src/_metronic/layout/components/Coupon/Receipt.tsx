import React from 'react'
import { receiptDate, toAbsoluteUrl } from '../../../helpers'
import dayjs from 'dayjs'
import { Button } from 'react-bootstrap';
import Barcode from 'react-barcode';

type Props = {
    data?: any,
}

const Receipt = ({data}: Props) => {
    console.log('bao data: ', data);
    
  return (
    <div className='containerReceipt'>
        <div className='container' >
            <div className='row fs-4 border border-dark'>
                <div className="col-2 pt-3">
                    <img src={toAbsoluteUrl('/media/logos/logo-new.png')} alt="Logo" className='w-100'/>
                </div>
                <div className="col-7 text-center pt-3">
                    <p className='fw-bold m-0'>TỔNG CÔNG TY CƠ KHÍ GIAO THÔNG VẬN TẢI CƠ KHÍ SÀI GÒN - TNHH MTV</p>
                    <p className='fw-bold m-0 mb-2'>BẾN XE MIỀN ĐÔNG MỚI</p>
                    <p className='m-0 fs-5'>Địa chỉ: 501 Hoàng Hữu Nam, P.Long Bình, Tp.Thủ Đức, Tp.Hồ Chí Minh</p>
                    <p className='m-0 fs-5 mb-2'>MST: 0300 481 551 - Điện thoại: 0373.501.501</p>
                    <p className='fw-bolder m-0 ' style={{fontSize: '30px'}}>PHIẾU NHẬN HÀNG</p>
                    <p className='fst-italic fs-5 m-0'>(Liên 1: Giao cho khách hàng)</p>
                    <div className='container'>
                        <div className="row">
                            <div className="col-6 text-start">
                                <p className='m-0'>Ngày gửi: <span>{dayjs(data?.sendDate).format('DD/MM/YYYY')}</span></p>
                                <p className='m-0'>Giờ gửi: <span>{dayjs(data?.sendDate).format('hh:mm A')}</span></p>
                            </div>
                            <div className="col-6 text-start">
                                <p className='m-0'>Ngày giao hàng dự kiến: <span>{dayjs(receiptDate({ createdDate: data?.sendDate || '', daysToAdd: +data?.receiptDate }))?.format('DD/MM/YYYY') || ''}</span></p>
                                <p className='m-0'>Nhân viên tiếp nhận: </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 text-center fw-bold border-start border-dark p-0">
                    <div className='border-bottom border-dark'>
                        <p className='pt-3'>SỐ ĐƠN HÀNG: </p>
                        <p className='text-danger'>{data?.indexRow}</p>
                    </div>
                    <div>
                        <p>MÃ NHẬN HÀNG: </p>
                        <div className='d-flex barcodeCSS'>
                            <Barcode
                                value={`A24MDM.91.3-5377-DH${data?.indexRow}`} 
                                // height={100}
                                displayValue={false}
                            />
                        </div>
                        <p className='text-danger'>A24MDM.91.3-5377-DH{data?.indexRow}</p>
                    </div>
                </div>
            </div>

            <div className='row border-start border-end border-bottom border-dark'>
                <div className="col-5 fs-4 border-end border-dark">
                    <p className='fw-bold fs-3'>A. THÔNG TIN NGƯỜI GỬI VÀ NHẬN HÀNG</p>
                    <div className=''>
                        <p className='fw-bold'>1. Người gửi:</p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Họ tên:</span><span>{data?.senderName}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Số CCCD:</span><span>{data?.senderIdCard}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Điện thoại:</span><span>{data?.senderPhone}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Địa chỉ:</span><span>{data?.senderAddress}</span></p>
                    </div>
                    <div>
                        <p className='fw-bold'>2. Người nhận:</p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Họ tên:</span> <span>{data?.receiverName}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Số CCCD:</span><span>{data?.receiverIdCard}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Điện thoại:</span> <span>{data?.receiverPhone}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Địa chỉ:</span><span>{`${data?.receiverAddress}, ${data?.receiverCommune?.name}, ${data?.receiverDistrict?.name}, ${data?.receiverProvince?.name}`}</span></p>
                    </div>
                </div>
                <div className="col-7 fs-4 p-0">
                    <p className='fw-bold fs-3 px-3'>B. THÔNG TIN HÀNG HÓA</p>
                    <div className='border-bottom border-dark'>
                        <p className='fw-bold px-3'>1. Bưu kiện</p>
                        <div className='container px-3'>
                            <div className="row">
                                <div className="col-7">
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>a. Tên hàng:</p><span>{data?.itemName}</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>b. Trị giá:</p><span style={{width: 'calc(100% - 200px)'}}>{data?.itemValue?.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>c. Trọng lượng:</p><span style={{width: 'calc(100% - 200px)'}}>{data?.itemWeight?.toLocaleString()}</span><span>Kg</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>d. Số kiện:</p><span>{data?.itemQuantity?.toLocaleString()}</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>e. Phân tuyến:</p><span>{data?.receiverCommune?.shipmentType.toLocaleString()}</span></p>
                                </div>
                                <div className='col-5'>
                                    <p>(Trường hợp nơi nhận thuộc khu vực huyện xã sẽ cộng thêm 25% vào giá dịch vụ vận chuyển)</p>
                                    {/* <p>{data?.shipName?.fullName}</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-bottom border-dark'>
                        <p className='fw-bold px-3'>2. Tiền dịch vụ vận chuyển</p>
                        <div className='container px-3'>
                            <div className="row">
                                <div className="col">
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '400px'}}>a. Giá dịch vụ khai giá trị hàng hóa:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.itemValue?.toLocaleString()}</span><span>đồng</span></p>
                                    {/* <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>b. Hệ số dịch vụ:</p><span>{data?.coefficient?.code}</span></p> */}
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '400px'}}>b. Giá dịch vụ đóng gói:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.packagingServiceFee?.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '400px'}}>c. Giá dịch vụ vận chuyển:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.serviceFee?.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '400px'}}>e. Tiền dịch vụ (a*b)+c:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.totalAmount?.toLocaleString()}</span><span>đồng</span></p>
                                </div>
                                {/* <div className='col-5 fst-italic'>
                                    <p className='mb-0 fw-bold'>Ghi chú:</p>
                                    <p className='mb-0 fw-bold'>Mục 2.b hệ số dịch vụ gồm:</p>
                                    <p className='mb-0'>- Hàng quá tải (1,2)</p>
                                    <p className='mb-0'>- Hàng quá khổ (1,2)</p>
                                    <p className='mb-0'>- Hàng quá tải và quá khổ (1,2)</p>
                                    <p className='mb-0'>- Hàng giao tận nơi (1,3)</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <p className='fw-bold border-dark px-3 m-0 d-flex h-50px align-items-center'><p className='m-0' style={{width: '200px'}}>3. Người gửi thanh toán:</p><span className='fs-1' style={{width: 'calc(100% - 250px)'}}>{data?.totalAmount?.toLocaleString()}</span><span>đồng</span></p>
                    {/* <p className='fw-bold px-3 d-flex'><p className='m-0' style={{width: '200px'}}>4. Phải thu người nhận:</p><span style={{width: 'calc(100% - 250px)'}}>{data?.receiptPay}</span><span>đồng</span></p> */}
                </div>
            </div>
            <div className="row">
                <div className="col-5 p-0 border-end border-start border-bottom border-dark">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-8 border-end border-dark h-100">
                                <p className='mb-0 fst-italic text-center'>Tôi đã đọc và đồng ý với các nội dung được ghi trên cả 2 mặt của Phiếu nhận hàng này</p>
                                <p className='fw-bold text-center'>(Khách hàng ký và ghi rõ họ tên)</p>
                            </div>
                            <div className="col-4">
                                <p className='mb-0 fst-italic text-center'>Nhân viên tiếp nhận</p>
                                <p className='fw-bold text-center'>(Ký và ghi rõ họ tên)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-7 border-end border-bottom border-dark" style={{paddingBottom: '60px'}}>
                    <p className='fw-bold fs-3 px-3'>C. XÁC NHẬN CỦA NGƯỜI NHẬN HÀNG</p>
                    <p className='mb-0 px-3'>- Ngày nhận: ......../......../ 2024</p>
                    <p className='mb-0 px-3'>- Ký và ghi họ tên:</p>
                </div>
            </div>
            <div className="row border-start border-end border-bottom border-dark">
                <span className='py-2 fst-italic fw-bold text-center'>Khi có khiếu nại hoặc đến nhận tiền thu hộ (COD), Quý khách vui lòng mang theo Phiếu gửi hàng này và xuất trình các giấy tờ có liên quan</span>
            </div>
        </div>
    </div>
  )
}

export default Receipt