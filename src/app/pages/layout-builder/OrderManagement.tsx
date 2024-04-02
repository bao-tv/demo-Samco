import React, {useMemo, useCallback} from 'react'
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { usePageData } from '../../../_metronic/layout/core';
import { useThemeMode } from '../../../_metronic/partials';

type Props = {}

const OrderManagement = (props: Props) => {
  const {rowDataOrder} = usePageData();
  const columnDefsOrderManagerment: ColDef[] = [
    {
      headerName: 'STT',
      field: 'index',
      width: 60,
    },
    {
      headerName: 'Ngày gửi',
      field: 'moment(sendDate).format("DD - MM - YY")',
      width: 110,
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
      field: 'receiptAddress',
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
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const onGridReady = useCallback((params: any) => {
  }, []);
  const {modeCurrent} = useThemeMode();
  const cloneRowDataAddIndex = rowDataOrder?.map((item, index) => ({...item, index}))
  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", boxSizing: "border-box" }}>
        <div
          style={gridStyle}
          className={
            modeCurrent === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
          }
        >
          <AgGridReact
            rowData={cloneRowDataAddIndex}
            columnDefs={columnDefsOrderManagerment}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderManagement