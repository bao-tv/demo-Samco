import {ColDef} from 'ag-grid-community'
import {FormatsDate, RenderAddress, FormatsDateReceiver} from '../../../../_metronic/helpers'
import ButtonActionsRender from '../../../../_metronic/helpers/components/ButtonActionsRender'
// import  from '../../../_metronic/helpers/components/ButtonActionsRender';

export interface IFormInput {
  id?: any
  sendDate?: any
  senderName?: string
  senderIdCard?: string
  senderPhone?: number | string
  senderAddress?: string
  receiptDate?: any
  receiverName?: string
  receiverIdCard?: string
  receiverPhone?: number | string
  receiverProvince?: any
  receiverDistrict?: any
  receiverCommune?: any
  receiverAddress?: any
  itemName?: string
  itemValue?: number
  itemWidth?: number
  itemHeight?: number
  itemWeight?: number
  itemLength?: number
  itemFragile?: boolean
  itemQuantity?: number
  shipName?: string
  serviceFee?: number
  packagingServices?: any
  packagingServiceQuantity?: any
  packagingServiceDetail?: any
  packagingServiceFee?: number
  totalAmount?: number
  // sendPay?: number,
  // receiptPay?: number,
  indexRow?: number
}
export interface prodDataInit {
  provinceId: number,
  districtId: number,
}

export type PropsReceiver = {
  control: any
  errors: any
  watch: any
  setValue: any
  getValues: any
  setProvinceDetail: any
  provinceDetail: any
  setCommuneDetail: any
  communeDetail: any
}
export const columnDefsOrderManagerment: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Actions',
    field: '',
    width: 180,
    cellRenderer: ButtonActionsRender,
  },
  {
    headerName: 'Ngày gửi',
    field: 'createdDate',
    width: 110,
    cellRenderer: FormatsDate,
  },
  {
    headerName: 'Tên người gửi',
    field: 'senderName',
    width: 140,
  },
  {
    headerName: 'CCCD người gửi',
    field: 'senderIdCard',
    width: 140,
  },
  {
    headerName: 'SĐT người gửi',
    field: 'senderPhone',
    width: 140,
  },
  {
    headerName: 'Địa chỉ người gửi',
    field: 'senderAddress',
    width: 150,
  },
  {
    headerName: 'Ngày nhận',
    field: 'receiptDate',
    width: 110,
    cellRenderer: FormatsDateReceiver,
  },
  {
    headerName: 'Tên người nhận',
    field: 'receiverName',
    width: 140,
  },
  {
    headerName: 'CCCD người nhận',
    field: 'receiverIdCard',
    width: 140,
  },
  {
    headerName: 'SĐT người nhận',
    field: 'receiverPhone',
    width: 140,
  },
  {
    headerName: 'Địa chỉ người nhận',
    cellRenderer: RenderAddress,
    width: 350,
  },
  {
    headerName: 'Tên hàng',
    field: 'itemName',
    width: 110,
  },
  {
    headerName: 'Trị giá hàng',
    field: 'itemValue',
    width: 110,
  },
  {
    headerName: 'Số kiện hàng',
    field: 'itemQuantity',
    width: 120,
  },
  {
    headerName: 'Giá dịch vụ',
    field: 'serviceFee',
    width: 110,
  },
  {
    headerName: 'Giá đóng gói',
    field: 'packagingServiceFee',
    width: 120,
  },
  {
    headerName: 'Tổng tiền dịch vụ',
    field: 'totalAmount',
    width: 150,
  },
]
