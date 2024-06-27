import { ColDef } from 'ag-grid-community';
import ButtonActionAddAndEditPriceObject from '../../../_metronic/helpers/components/ButtonActionAddAndEditPriceObject';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { Button } from 'bootstrap';
// import ButtonActionAddEditProvince from '../../../_metronic/helpers/components/ButtonActionAddEditProvince';

const ButtonActionProvince = (props: any) => {
  return (
    <ButtonActionEdit_Delete props={props}/>
  );
}
export   const columnDefsProvinceSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionProvince,
    width: 150,
  },
  // {
  //   headerName: 'ID',
  //   field: 'id',
  //   width: 140,
  // },
  {
    headerName: 'Mã',
    field: 'value',
    width: 140,
  },
  {
    headerName: 'Tỉnh',
    field: 'label',
    width: 150,
  },
  {
    headerName: 'Mã biển số',
    field: 'licenseplates',
    width: 150,
  },
];

export   const columnDefsAreaInProvince: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      width: 60,
    },
    {
      headerName: 'Hành động',
      field: '',
      width: 100,
      cellRenderer: ButtonActionAddAndEditPriceObject
    },
    {
      headerName: 'Khu vực nhận hàng',
      field: 'label',
      width: 110,
    },
    {
      headerName: 'Mã khu vực',
      field: 'transportationRouteCode',
      width: 140,
    },
    {
        headerName: 'Khoảng cách',
        field: 'distanceName',
        width: 140,
      },
      {
        headerName: 'Mã đơn vi',
        field: 'value',
        width: 140,
      },
  ];

  export interface IFormAreaInput {
    areaName?: string,
    transportation_route_code?: number | string,
    distance?: number | string,
    distanceCode?: number | string,
  }

  export interface IFormProvinceInput {
    label?: string,
    value?: string,
    licenseplates?: number | string,
    transportation_route?: Array<object>,
  }