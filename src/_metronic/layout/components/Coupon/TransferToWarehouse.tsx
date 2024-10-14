import React from 'react'
import {usePageData} from '../../core'
import {NumberFormat, toAbsoluteUrl} from '../../../helpers'
import dayjs from 'dayjs'
import Table from 'react-bootstrap/Table'

type Props = {
  data?: any
}

const TransferToWarehouse = ({data}: Props) => {
  //   console.log('bao data: ', data)
  // data = [...data, ...data]
  // const dataRender =
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
  // const [totalItem, set]
  let totalItem: number = 0
  let totalKG: number = 0
  let totalMoney: number = 0
  const {tranferToWarehouseTemplateRef} = usePageData()
  return (
    <div className='' style={{width: '1240px'}}>
      <div className='container' style={{width: '1240px'}} ref={tranferToWarehouseTemplateRef}>
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
            <p className='fw-bolder m-0 ' style={{fontSize: '30px'}}>
              PHIẾU NHẬP KHO
            </p>
          </div>
          {/* <div className='col-3 text-center fw-bold border-dark p-0'>
                
            </div> */}
        </div>
        <div className='row border-start border-end border-bottom border-dark'>
          <div className='col-5'>
            <p className='m-0'>
              Ngày gửi: <span>{dayjs(data?.createdDate).format('DD/MM/YYYY')}</span>
            </p>
            <p className='m-0'>Nhân viên nhận hàng: Võ Hoài Sơn</p>
            <p className='m-0'>Nhân viên kho: Vũ Thành Nhân</p>
          </div>
          <div className='col-5'>
            <p className='m-0'>
              Giờ gửi: <span>{dayjs(data?.createdDate).format('hh:mm A')}</span>
            </p>
            <p className='m-0'>Trưởng bộ phận: Vũ Thành Nhân</p>
          </div>
          <div className='col-2'>
            <p className='m-0'>SỐ PHIẾU:</p>
          </div>
        </div>
        <div className='row border-start border-end border-bottom border-dark'>
          <Table className=' mb-0' bordered={true} variant='light'>
            <thead>
              <tr>
                <th className='bg-warning-subtle'>STT</th>
                <th className='bg-warning-subtle'>SỐ ĐƠN HÀNG</th>
                <th className='bg-warning-subtle'>MÃ NHẬN HÀNG</th>
                <th className='bg-warning-subtle'>TÊN HÀNG</th>
                <th className='bg-warning-subtle'>SỐ KIỆN</th>
                <th className='bg-warning-subtle'>TRỌNG LƯỢNG (KG)</th>
                <th className='bg-warning-subtle'>TỔNG TIỀN DỊCH VỤ (ĐỒNG)</th>
                <th className='bg-warning-subtle'>LOẠI HÀNG</th>
                <th className='bg-warning-subtle'>TỈNH ĐẾN</th>
              </tr>
            </thead>
            <tbody>
              {dataRender.map((item: any, i: number) => {
                totalItem += item?.itemQuantity + item?.subPackages?.length
                totalKG += item?.itemWeight
                totalMoney += item?.totalAmount
                return (
                  <tr style={{height: '40px'}} key={item?.id}>
                    <td>{!item?.isNull && i + 1}</td>
                    <td>{item?.id}</td>
                    <td>{item?.receiptCode}</td>
                    <td>{item?.itemName}</td>
                    <td>{!item?.isNull && NumberFormat(item?.itemQuantity + item?.subPackages?.length)}</td>
                    <td>{!item?.isNull &&  NumberFormat(item?.itemWeight)}</td>
                    <td>{!item?.isNull &&  NumberFormat(item?.totalAmount)}</td>
                    <td>{!item?.isNull && (item?.itemFragile ? 'Bình thường' : 'Dễ vỡ')}</td>
                    <td>{item?.receiverProvince.name}</td>
                  </tr>
                )
              })}
              <tr>
                <td className='fw-bold fs-3'>Tổng</td>
                <td className='fw-bold fs-3' colSpan={3}>{data?.length}</td>
                <td className='fw-bold fs-3'>{NumberFormat(totalItem)}</td>
                <td className='fw-bold fs-3'>{NumberFormat(totalKG)}</td>
                <td className='fw-bold fs-3'>{NumberFormat(totalMoney)}</td>
                <td className='fw-bold fs-3'></td>
                <td className='fw-bold fs-3'></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className='row border-start border-end border-bottom border-dark'>
          <div className='col-4 text-center'>
            <p className='m-0'>NGƯỜI LẬP PHIẾU</p>
            <p className='m-0'>(Ký và ghi rõ họ tên)</p>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className='col-4 text-center'>
            <p className='m-0'>TRƯỞNG BỘ PHẬN</p>
            <p className='m-0'>(Ký và ghi rõ họ tên)</p>
          </div>
          <div className='col-4 text-center'>
            <p className='m-0'>NHÂN VIÊN KHO</p>
            <p className='m-0'>(Ký và ghi rõ họ tên)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransferToWarehouse
