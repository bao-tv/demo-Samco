import { ColDef } from 'ag-grid-community';
import { FormatsDate, ButtonActionsRender } from '../../../_metronic/helpers';
// import  from '../../../_metronic/helpers/components/ButtonActionsRender';

export interface IFormInput {
    sendDate?: any,
    sendName?: string,
    sendIdPer?: string,
    sendPhone?: number | string,
    sendAddress?: string,
    receiptDate?: any,
    receiptName?: string,
    receiptIdPer?: string,
    receiptPhone?: number | string,
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
    field: 'sendName',
    width: 140,
  },
  {
    headerName: 'CCCD người gửi',
    field: 'sendIdPer',
    width: 140,
  },
  {
    headerName: 'SĐT người gửi',
    field: 'sendPhone',
    width: 140,
  },
  {
    headerName: 'Địa chỉ người gửi',
    field: 'sendAddress',
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
    field: 'receiptName',
    width: 140,
  },
  {
    headerName: 'CCCD người nhận',
    field: 'receiptIdPer',
    width: 140,
  },
  {
    headerName: 'SĐT người nhận',
    field: 'receiptPhone',
    width: 140,
  },
  {
    headerName: 'Địa chỉ người nhận',
    field: 'receiptAddressJoin',
    width: 150,
  },
  {
    headerName: 'Tên hàng',
    field: 'packageName',
    width: 110,
  },
  {
    headerName: 'Trị giá hàng',
    field: 'packageValue',
    width: 110,
  },
  {
    headerName: 'Trọng lượng hàng',
    field: 'packageWeight',
    width: 150,
  },
  {
    headerName: 'Số kiện hàng',
    field: 'packageQuantity',
    width: 120,
  },
  {
    headerName: 'Đơn vị vận chuyển',
    field: 'shipName.label',
    width: 160,
  },
  {
    headerName: 'Giá dịch vụ',
    field: 'price',
    width: 110,
  },
  {
    headerName: 'Hệ số dịch vụ',
    field: 'coefficient.label',
    width: 130,
  },
  {
    headerName: 'Giá đóng gói',
    field: 'packagingServicePrice',
    width: 120,
  },
  {
    headerName: 'Tổng tiền dịch vụ',
    field: 'totalPrice',
    width: 150,
  },
];