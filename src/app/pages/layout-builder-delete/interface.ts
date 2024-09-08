import { ColDef } from 'ag-grid-community';
import { FormatsDate } from '../../../_metronic/helpers';
// import  from '../../../_metronic/helpers/components/ButtonActionsRender';

export interface IFormInput {
    sendDate?: any,
    sendName?: string,
    sendIdPer?: string,
    senderAddress?: number | string,
    sendAddress?: string,
    receiptDate?: any,
    receiverName?: string,
    receiptIdPer?: string,
    receiverPhone?: number | string,
    receiptAddress?: any,
    receiptProvinceAddress?: any,
    packageName?: string,
    packageValue?: string,
    packageWeight?: string,
    packageQuantity?: string,
    shipName?: string,
    price?: number,
    coefficient?: number,
    packagingService?: any,
    packagingServicePrice?: number,
    totalPrice?: number,
    sendPay?: number,
    receiptPay?: number,
    indexRow?: number,
  }
export   const columnDefsOrderManagerment: ColDef[] = [
  {
    headerName: 'STT',
    field: 'indexRow',
    width: 60,
  },
  // {
  //   headerName: 'Actions',
  //   field: '',
  //   width: 180,
  //   cellRenderer: ButtonActionsRender,

  // },
  {
    headerName: 'Ngày gửi',
    field: 'sendDate',
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
    cellRenderer: FormatsDate,
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
    field: 'receiverAddress',
    width: 150,
  },
  {
    headerName: 'Xã nhận hàng',
    field: 'receiverCommune.name',
    width: 150,
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
    headerName: 'Trọng lượng hàng',
    field: 'itemWeight',
    width: 150,
  },
  {
    headerName: 'Số kiện hàng',
    field: 'itemQuantity',
    width: 120,
  },
  {
    headerName: 'Đơn vị vận chuyển',
    field: 'shipName.label',
    width: 160,
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
];