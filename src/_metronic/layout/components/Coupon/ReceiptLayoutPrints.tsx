import React from 'react'
import { toAbsoluteUrl } from '../../../helpers'
import dayjs from 'dayjs'
import Barcode from 'react-barcode';
import Table from 'react-bootstrap/Table';

type Props = {
    data?: any,
}

const ReceiptLayoutPrints = ({data}: Props) => {
    // console.log('bao data: ', data);
    
  return (
    <div className='' style={{width: '1240px'}} id='containerReceipt'>
        <div className='container' >
            <div className='row fs-3 border border-dark'>
                <div className="col pt-3">
                    <img src={toAbsoluteUrl('/media/logos/logo.png')} alt="Logo" className='h-45px'/>
                </div>
                <div className="col-8 text-center pt-3">
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
                                <p className='m-0'>Ngày giao hàng dự kiến: <span>{dayjs(data?.receiptDate).format('DD/MM/YYYY')}</span></p>
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
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Họ tên:</span><span>{data?.sendName}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Số CCCD:</span><span>{data?.sendIdPer}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Điện thoại:</span><span>{data?.sendPhone}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Địa chỉ:</span><span>{data?.sendAddress}</span></p>
                    </div>
                    <div>
                        <p className='fw-bold'>2. Người nhận:</p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Họ tên:</span> <span>{data?.receiptName}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Số CCCD:</span><span>{data?.receiptIdPer}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Điện thoại:</span> <span>{data?.receiptPhone}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Địa chỉ:</span><span>{ `${data?.receiptAddress?.label ? data?.receiptAddress?.label : ''} - ${data?.receiptProvinceAddress?.label ? data?.receiptProvinceAddress?.label : ''}`}</span></p>
                    </div>
                </div>
                <div className="col-7 fs-4 p-0">
                    <p className='fw-bold fs-3 px-3'>B. THÔNG TIN HÀNG HÓA</p>
                    <div className='border-bottom border-dark'>
                        <p className='fw-bold px-3'>1. Bưu kiện</p>
                        <div className='container px-3'>
                            <div className="row">
                                <div className="col-7">
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>a. Tên hàng:</p><span>{data?.packageName}</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>b. Trị giá:</p><span style={{width: 'calc(100% - 200px)'}}>{data?.packageValue}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>c. Trọng lượng:</p><span style={{width: 'calc(100% - 200px)'}}>{data?.packageWeight}</span><span>Kg</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>d. Số kiện:</p><span>{data?.packageQuantity}</span></p>
                                </div>
                                <div className='col-5'>
                                    <p>e. Yêu cầu đơn vị vận chuyển</p>
                                    <p>{data?.shipName?.fullName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-bottom border-dark'>
                        <p className='fw-bold px-3'>2. Tiền dịch vụ vận chuyển</p>
                        <div className='container px-3'>
                            <div className="row">
                                <div className="col-7">
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>a. Giá dịch vụ:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.price.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>b. Hệ số dịch vụ:</p><span>{data?.coefficient?.value}</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>c. Giá dịch vụ đóng gói:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.packagingServicePrice.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>d. Tiền dịch vụ (a*b)+c:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.totalPrice.toLocaleString()}</span><span>đồng</span></p>
                                </div>
                                <div className='col-5 fst-italic'>
                                    <p className='mb-0'>Ghi chú hệ số dịch vụ gồm:</p>
                                    <p className='mb-0'>- Hàng bình thường (1)</p>
                                    <p className='mb-0'>- Hàng quá tải (1.2)</p>
                                    <p className='mb-0'>- Hàng quá khổ (1.2)</p>
                                    <p className='mb-0'>- Hàng quá tải và quá khổ (1.2)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='fw-bold border-bottom border-dark px-3 pb-4 m-0 d-flex'><p className='m-0' style={{width: '200px'}}>3. Người gửi thanh toán:</p><span style={{width: 'calc(100% - 250px)'}}>{data?.sendPay.toLocaleString()}</span><span>đồng</span></p>
                    <p className='fw-bold px-3 d-flex'><p className='m-0' style={{width: '200px'}}>4. Phải thu người nhận:</p><span style={{width: 'calc(100% - 250px)'}}>{data?.receiptPay.toLocaleString()}</span><span>đồng</span></p>
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
                <div className="col-7 border-end border-bottom border-dark" style={{paddingBottom: '114px'}}>
                    <p className='fw-bold fs-3 px-3'>C. XÁC NHẬN CỦA NGƯỜI NHẬN HÀNG</p>
                    <p className='mb-0 px-3'>- Ngày nhận: ......../......../ 2024</p>
                    <p className='mb-0 px-3'>- Ký và ghi họ tên:</p>
                </div>
            </div>
        </div>

        <div className='container' style={{marginTop: '70px'}}>
            <div className='row fs-3 border border-dark'>
                <div className="col pt-3">
                    <img src={toAbsoluteUrl('/media/logos/logo.png')} alt="Logo" className='h-45px'/>
                </div>
                <div className="col-8 text-center pt-3">
                    <p className='fw-bold m-0'>TỔNG CÔNG TY CƠ KHÍ GIAO THÔNG VẬN TẢI CƠ KHÍ SÀI GÒN - TNHH MTV</p>
                    <p className='fw-bold m-0 mb-2'>BẾN XE MIỀN ĐÔNG MỚI</p>
                    <p className='m-0 fs-5'>Địa chỉ: 501 Hoàng Hữu Nam, P.Long Bình, Tp.Thủ Đức, Tp.Hồ Chí Minh</p>
                    <p className='m-0 fs-5 mb-2'>MST: 0300 481 551 - Điện thoại: 0373.501.501</p>
                    <p className='fw-bolder m-0 ' style={{fontSize: '30px'}}>PHIẾU NHẬN HÀNG</p>
                    <p className='fst-italic fs-5 m-0'>(Liên 2: Lưu)</p>
                    <div className='container'>
                        <div className="row">
                            <div className="col-6 text-start">
                                <p className='m-0'>Ngày gửi: <span>{dayjs(data?.sendDate).format('DD/MM/YYYY')}</span></p>
                                <p className='m-0'>Giờ gửi: <span>{dayjs(data?.sendDate).format('hh:mm A')}</span></p>
                            </div>
                            <div className="col-6 text-start">
                                <p className='m-0'>Ngày giao hàng dự kiến: <span>{dayjs(data?.receiptDate).format('DD/MM/YYYY')}</span></p>
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
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Họ tên:</span><span>{data?.sendName}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Số CCCD:</span><span>{data?.sendIdPer}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Điện thoại:</span><span>{data?.sendPhone}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Địa chỉ:</span><span>{data?.sendAddress}</span></p>
                    </div>
                    <div>
                        <p className='fw-bold'>2. Người nhận:</p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Họ tên:</span> <span>{data?.receiptName}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Số CCCD:</span><span>{data?.receiptIdPer}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Điện thoại:</span> <span>{data?.receiptPhone}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Địa chỉ:</span><span>{ `${data?.receiptAddress?.label ? data?.receiptAddress?.label : ''} - ${data?.receiptProvinceAddress?.label ? data?.receiptProvinceAddress?.label : ''}`}</span></p>
                    </div>
                </div>
                <div className="col-7 fs-4 p-0">
                    <p className='fw-bold fs-3 px-3'>B. THÔNG TIN HÀNG HÓA</p>
                    <div className='border-bottom border-dark'>
                        <p className='fw-bold px-3'>1. Bưu kiện</p>
                        <div className='container px-3'>
                            <div className="row">
                                <div className="col-7">
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>a. Tên hàng:</p><span>{data?.packageName}</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>b. Trị giá:</p><span style={{width: 'calc(100% - 200px)'}}>{data?.packageValue}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>c. Trọng lượng:</p><span style={{width: 'calc(100% - 200px)'}}>{data?.packageWeight}</span><span>Kg</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>d. Số kiện:</p><span>{data?.packageQuantity}</span></p>
                                </div>
                                <div className='col-5'>
                                    <p>e. Yêu cầu đơn vị vận chuyển</p>
                                    <p>{data?.shipName?.fullName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-bottom border-dark'>
                        <p className='fw-bold px-3'>2. Tiền dịch vụ vận chuyển</p>
                        <div className='container px-3'>
                            <div className="row">
                                <div className="col-7">
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>a. Giá dịch vụ:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.price.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>b. Hệ số dịch vụ:</p><span>{data?.coefficient?.value}</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>c. Giá dịch vụ đóng gói:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.packagingServicePrice.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>d. Tiền dịch vụ (a*b)+c:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.totalPrice.toLocaleString()}</span><span>đồng</span></p>
                                </div>
                                <div className='col-5 fst-italic'>
                                    <p className='mb-0'>Ghi chú hệ số dịch vụ gồm:</p>
                                    <p className='mb-0'>- Hàng bình thường (1)</p>
                                    <p className='mb-0'>- Hàng quá tải (1.2)</p>
                                    <p className='mb-0'>- Hàng quá khổ (1.2)</p>
                                    <p className='mb-0'>- Hàng quá tải và quá khổ (1.2)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='fw-bold border-bottom border-dark px-3 pb-4 m-0 d-flex'><p className='m-0' style={{width: '200px'}}>3. Người gửi thanh toán:</p><span style={{width: 'calc(100% - 250px)'}}>{data?.sendPay.toLocaleString()}</span><span>đồng</span></p>
                    <p className='fw-bold px-3 d-flex'><p className='m-0' style={{width: '200px'}}>4. Phải thu người nhận:</p><span style={{width: 'calc(100% - 250px)'}}>{data?.receiptPay.toLocaleString()}</span><span>đồng</span></p>
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
                <div className="col-7 border-end border-bottom border-dark" style={{paddingBottom: '114px'}}>
                    <p className='fw-bold fs-3 px-3'>C. XÁC NHẬN CỦA NGƯỜI NHẬN HÀNG</p>
                    <p className='mb-0 px-3'>- Ngày nhận: ......../......../ 2024</p>
                    <p className='mb-0 px-3'>- Ký và ghi họ tên:</p>
                </div>
            </div>
        </div>

        <div className='container mt-1' >
            <div className='row fs-3 border border-dark'>
                <div className="col pt-3">
                    <img src={toAbsoluteUrl('/media/logos/logo.png')} alt="Logo" className='h-45px'/>
                </div>
                <div className="col-8 text-center pt-3">
                    <p className='fw-bold m-0'>TỔNG CÔNG TY CƠ KHÍ GIAO THÔNG VẬN TẢI CƠ KHÍ SÀI GÒN - TNHH MTV</p>
                    <p className='fw-bold m-0 mb-2'>BẾN XE MIỀN ĐÔNG MỚI</p>
                    <p className='m-0 fs-5'>Địa chỉ: 501 Hoàng Hữu Nam, P.Long Bình, Tp.Thủ Đức, Tp.Hồ Chí Minh</p>
                    <p className='m-0 fs-5 mb-2'>MST: 0300 481 551 - Điện thoại: 0373.501.501</p>
                    <p className='fw-bolder m-0 ' style={{fontSize: '30px'}}>PHIẾU NHẬN HÀNG</p>
                    <p className='fst-italic fs-5 m-0'>(Liên 3: Nội bộ)</p>
                    <div className='container'>
                        <div className="row">
                            <div className="col-6 text-start">
                                <p className='m-0'>Ngày gửi: <span>{dayjs(data?.sendDate).format('DD/MM/YYYY')}</span></p>
                                <p className='m-0'>Giờ gửi: <span>{dayjs(data?.sendDate).format('hh:mm A')}</span></p>
                            </div>
                            <div className="col-6 text-start">
                                <p className='m-0'>Ngày giao hàng dự kiến: <span>{dayjs(data?.receiptDate).format('DD/MM/YYYY')}</span></p>
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
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Họ tên:</span><span>{data?.sendName}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Số CCCD:</span><span>{data?.sendIdPer}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Điện thoại:</span><span>{data?.sendPhone}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Địa chỉ:</span><span>{data?.sendAddress}</span></p>
                    </div>
                    <div>
                        <p className='fw-bold'>2. Người nhận:</p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Họ tên:</span> <span>{data?.receiptName}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Số CCCD:</span><span>{data?.receiptIdPer}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Điện thoại:</span> <span>{data?.receiptPhone}</span></p>
                        <p className='mb-1 d-flex'><span className='d-block' style={{width: '120px'}}>Địa chỉ:</span><span>{ `${data?.receiptAddress?.label ? data?.receiptAddress?.label : ''} - ${data?.receiptProvinceAddress?.label ? data?.receiptProvinceAddress?.label : ''}`}</span></p>
                    </div>
                </div>
                <div className="col-7 fs-4 p-0">
                    <p className='fw-bold fs-3 px-3'>B. THÔNG TIN HÀNG HÓA</p>
                    <div className='border-bottom border-dark'>
                        <p className='fw-bold px-3'>1. Bưu kiện</p>
                        <div className='container px-3'>
                            <div className="row">
                                <div className="col-7">
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>a. Tên hàng:</p><span>{data?.packageName}</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>b. Trị giá:</p><span style={{width: 'calc(100% - 200px)'}}>{data?.packageValue}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>c. Trọng lượng:</p><span style={{width: 'calc(100% - 200px)'}}>{data?.packageWeight}</span><span>Kg</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '150px'}}>d. Số kiện:</p><span>{data?.packageQuantity}</span></p>
                                </div>
                                <div className='col-5'>
                                    <p>e. Yêu cầu đơn vị vận chuyển</p>
                                    <p>{data?.shipName?.fullName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-bottom border-dark'>
                        <p className='fw-bold px-3'>2. Tiền dịch vụ vận chuyển</p>
                        <div className='container px-3'>
                            <div className="row">
                                <div className="col-7">
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>a. Giá dịch vụ:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.price.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>b. Hệ số dịch vụ:</p><span>{data?.coefficient?.value}</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>c. Giá dịch vụ đóng gói:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.packagingServicePrice.toLocaleString()}</span><span>đồng</span></p>
                                    <p className='mb-1 d-flex'><p className='m-0' style={{width: '190px'}}>d. Tiền dịch vụ (a*b)+c:</p><span style={{width: 'calc(100% - 240px)'}}>{data?.totalPrice.toLocaleString()}</span><span>đồng</span></p>
                                </div>
                                <div className='col-5 fst-italic'>
                                    <p className='mb-0'>Ghi chú hệ số dịch vụ gồm:</p>
                                    <p className='mb-0'>- Hàng bình thường (1)</p>
                                    <p className='mb-0'>- Hàng quá tải (1.2)</p>
                                    <p className='mb-0'>- Hàng quá khổ (1.2)</p>
                                    <p className='mb-0'>- Hàng quá tải và quá khổ (1.2)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='fw-bold border-bottom border-dark px-3 pb-4 m-0 d-flex'><p className='m-0' style={{width: '200px'}}>3. Người gửi thanh toán:</p><span style={{width: 'calc(100% - 250px)'}}>{data?.sendPay.toLocaleString()}</span><span>đồng</span></p>
                    <p className='fw-bold px-3 d-flex'><p className='m-0' style={{width: '200px'}}>4. Phải thu người nhận:</p><span style={{width: 'calc(100% - 250px)'}}>{data?.receiptPay.toLocaleString()}</span><span>đồng</span></p>
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
                <div className="col-7 border-end border-bottom border-dark" style={{paddingBottom: '114px'}}>
                    <p className='fw-bold fs-3 px-3'>C. XÁC NHẬN CỦA NGƯỜI NHẬN HÀNG</p>
                    <p className='mb-0 px-3'>- Ngày nhận: ......../......../ 2024</p>
                    <p className='mb-0 px-3'>- Ký và ghi họ tên:</p>
                </div>
            </div>
        </div>

        {/* <div className='container' style={{marginTop: '25px'}}>
            <div className="row fs-4 border border-dark">
                <div className="col pt-3">
                    <img src={toAbsoluteUrl('/media/logos/logo.png')} alt="Logo" className='h-45px'/>
                </div>
                <div className="col-11 text-center pt-3">
                    <p className='fw-bold m-0'>TỔNG CÔNG TY CƠ KHÍ GIAO THÔNG VẬN TẢI SÀI GÒN - TNHH MTV</p>
                    <p className='fw-bold m-0'>BẾN XE MIỀN ĐÔNG MỚI</p>
                    <p className='fw-bold m-0'>QUY ĐỊNH DỊCH VỤ TẠI KHU VỰC KHO VẬN - LOGISTICS</p>
                </div>
            </div>
            <div className='row border-start border-end border-bottom border-dark'>
                <div className="col fs-7 border-end border-dark">
                    <div className='mb-3'>
                        <p className='fw-bold m-0'><span className='me-3'>1. </span>Những mặt hàng không nhận gửi:</p>
                        <p className='mb-0'><span className='me-2'>-</span>Ấn phẩm, vật phẩm mà nhà nước Việt Nam cấm lưu thông.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Vật, chất dễ cháy nổ, mất vệ sinh, gây ô nhiễm môi trường.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Tiền Việt Nam , tiền nước ngoài và các giấy tờ có giá trị như tiền. Các loại kim khí quý.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Sinh vật sống, vật nuôi hoặc hàng hóa không đảm bảo tính an toàn khi vận chuyển.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Hàng hóa có chứa nhiều hàng hóa nhỏ lẻ.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Các vật phẩm, hàng hóa mà tính chất hoặc cách đóng gói có thể gây nguy hiểm cho nhân viên Bến xe Miền Đông, người dân hoặc làm mất vệ sinh, gây ô nhiễm môi trường.</p>
                    </div>
                    <div className='mb-3'>
                        <p className='fw-bold m-0'><span className='me-3'>2.</span>Vật chất có điều kiện:</p>
                        <p className='mb-0'><span className='me-2'>-</span>Hàng hóa kinh doanh phải có hóa đơn, chứng từ theo quy định của pháp luật.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Hàng hóa xuất nhập khẩu phải thực hiện theo quy định của cơ quan quản lý chuyên ngành có thẩm quyền.</p>
                    </div>
                    <div className='mb-3'>
                        <p className='fw-bold m-0'><span className='me-3'>3.</span>Trách nhiệm của người gửi:</p>
                        <p className='mb-0'><span className='me-2'>-</span>Giữ gìn Phiếu Nhận/Gửi hàng hóa. Khi gửi hàng phải nghiêm túc thực hiện nội quy của Bến xe Miền Đông mới tại khu vực kho vận – logistics.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Khách hàng khi đến gửi hoặc nhận hàng phải có một trong số những giấy tờ sau: CMND/CCCD/Hộ chiếu/Giấy phép lái xe và số seri trên Phiếu gửi hàng. Đối với Công ty phải có giấy giới thiệu khi đến nhận hàng.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Khai báo thông tin đầy đủ, chính xác và các tài liệu có liên quan đến việc gửi hàng hóa</p>
                        <p className='mb-0'><span className='me-2'>-</span>Chịu trách nhiệm về việc đảm bảo hóa đơn, tính pháp lý, chứng từ chứng minh nguồn gốc hàng hóa đi kèm khi vận chuyển.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Gói, bọc hàng hóa đảm bảo an toàn.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Thanh toán đầy đủ cước vận chuyển hàng hóa.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Nếu hàng hóa đặc biệt hoặc hàng hóa có giá trị cao thì khách hàng phải thông báo với nhân viên và được tính theo giá cước vận chuyển hàng đặc biệt.</p>
                    </div>
                </div>
                <div className="col fs-7">
                    <div className='mb-3'>
                        <p className='fw-bold m-0'><span className='me-3'>4. </span>Trách nhiệm của người nhận:</p>
                        <p className='mb-0'><span className='me-2'>-</span>Xuất trình các giấy tờ tùy thân hợp pháp hoặc giấy giới thiệu của cơ quan công ty.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Quá ngày dự kiến nhận thì người nhận phải thanh toán tiền dịch vụ lưu kho theo quy định.</p>
                    </div>
                    <div className='mb-3'>
                        <p className='fw-bold m-0'><span className='me-3'>5. </span>Trách nhiệm của BXMĐM:</p>
                        <p className='mb-0'><span className='me-2'>-</span>Kiểm tra tính hợp pháp của hàng hóa trước khi chấp nhận.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Từ chối phục vụ trong trường hợp có dấu hiệu vi phạm pháp luật.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Đảm bảo an toàn cho hàng hóa kể từ khi nhận hàng hóa đến khi hàng hóa được gửi.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Giải quyết khiếu nại, bồi thường cho khách hàng theo quy định bồi thường, khiếu nại được niêm yết tại khu vực kho vận – logistcs.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Không chịu trách nhiệm bồi thường đối với các thiệt hại gián tiếp do việc mất, hư hỏng hàng hóa và gửi chậm so với chỉ tiêu thời gian.</p>
                    </div>
                    <div className='mb-3'>
                        <p className='fw-bold m-0'><span className='me-3'>7. </span>Thời hạn khiếu nại:</p>
                        <p className='mb-0'><span className='me-2'>-</span>Người gửi thừa nhận và đồng ý thực hiện theo quy định bồi thường, khiếu nại được niêm yết tại khu vực kho vận – logistics do Bến xe Miền Đông mới.</p>
                    </div>
                    <div className='mb-3'>
                        <p className='fw-bold m-0'><span className='me-3'>8. </span>Quy định khác:</p>
                        <p className='mb-0'><span className='me-2'>-</span>Phiếu này có giá trị tương đương hợp đồng vận chuyển, giao nhận hàng hóa.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Các quy định khác được niêm yết tại khu vực kho vận – logistics tại Bến xe Miền Đông mới.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Người gửi thừa nhận và đồng ý thực hiện theo Quy định giao nhận hàng hóa được niêm yết tại khu vực kho vận – logistics tại Bến xe Miền Đông mới.</p>
                        <p className='mb-0'><span className='me-2'>-</span>Người gửi và người nhận chỉ thanh toán đúng số tiền hiển thị trên phiếu.</p>
                    </div>
                </div>
            </div>
            <div className="row fs-4 border-start border-end border-bottom border-dark">
                <div className="col text-center py-1">
                    <p className='fw-bold m-0'>TRÁCH NHIỆM BỒI THƯỜNG CỦA TỔNG CÔNG TY CƠ KHÍ GIAO THÔNG VẬN TẢI SÀI GÒN - TNHH MTV (SAMCO)</p>
                </div>
            </div>
            <div className="row fs-7 border-start border-end border-bottom border-dark mb-0">
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Loại hàng hóa</th>
                            <th>Mất, hư hỏng hoặc bị trao đổi hoàn toàn.</th>
                            <th  style={{width: '160px'}}>Chậm chỉ tiêu thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Bưu phẩm, bưu kiện</td>
                            <td>Bồi thường tối đa bằng bốn (04) lần cước đã thu khi chấp nhận nhưng không vượt quá 5.000.000 VNĐ.</td>
                            <td rowSpan={3}>Hoàn lại cước đã sử dụng.</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Khai giá</td>
                            <td>
                                <p className='m-0'>- Người gửi có khai báo giá trị hàng hóa thì khoản tiền bồi thường Bến xe Miền Đông mới sẽ trả cho người gửi nhưng không quá 04 lần giá dịch vụ vận chuyển hoặc không vượt quá 5.000.000 VNĐ.</p>
                                <p className='m-0'>- Người gửi không khai báo giá trị hàng hóa thì đền bù tối đa 04 lần giá trị dịch vụ.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Các trường hợp khác</td>
                            <td>Theo chính sách bồi thường, khiếu nại do Bến xe Miền Đông mới ban hành và niêm yết.</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="row fs-5 border-start border-end border-bottom border-dark">
                <div className="col text-center py-1">
                    <p className='fw-bold m-0'>HỖ TRỢ KHÁCH HÀNG</p>
                    <p className='m-0 fs-6'>Mọi ý kiến đóng góp, phản ánh vui lòng liên hệ qua email: kinhdoanhbxmdm@gmail.com hoặc số điện thoại CSKH: 0373.501.501</p>
                </div>
            </div>
        </div> */}

        <div className='container mt-1'>
            <div className='row'></div>
        </div>
    </div>
  )
}

export default ReceiptLayoutPrints