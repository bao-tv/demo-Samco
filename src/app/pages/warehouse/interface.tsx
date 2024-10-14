import { ColDef } from 'ag-grid-community';
import ButtonActionsRender from '../../../_metronic/helpers/components/ButtonActionsRender';
import { FormatsDate, FormatsDateReceiver, NumberFormat, RenderAddress } from '../../../_metronic/helpers';


export   const columnDefsWarehousesSetupPage: ColDef[] = [
  {
    headerName: '',
    field: 'id', // Transfer status
    width: 80,
    filter: false,
    // idReplace: '1',
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    cellStyle: {
      textAlign: 'center',
      // background: 'white',
      padding: '0 10x !important',
      borderRight: '1px solid #dde2eb',
      borderBottom: '1px solid #dde2eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
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
    valueFormatter: p => NumberFormat(p.value),
    width: 110,
  },
  {
    headerName: 'Số kiện hàng',
    field: 'itemQuantity',
    valueFormatter: p => NumberFormat(p.value),
    width: 120,
  },
  {
    headerName: 'Giá dịch vụ',
    field: 'serviceFee',
    valueFormatter: p => NumberFormat(p.value),
    width: 110,
  },
  {
    headerName: 'Giá đóng gói',
    field: 'packagingServiceFee',
    valueFormatter: p => NumberFormat(p.value),
    width: 120,
  },
  {
    headerName: 'Tổng tiền dịch vụ',
    field: 'totalAmount',
    valueFormatter: p => NumberFormat(p.value),
    width: 150,
  },
  {
    headerName: 'Tình trạng phiếu',
    field: 'billStatus',
    width: 110,
    // cellRenderer: FormatsDate,
  },
];

export type PropsModalShowAndAddWarehouse = {
  title: string,
  refreshData?: any,
  handleClose?: any,
}

  export interface IFormWarehousesInput {
    code?: string,
    name?: string,
    province?: Array<object> | any,
    district?: Array<object> | any,
    id: number,
  }
  
  export interface prodDataInit {
    provinceId: number,
  }