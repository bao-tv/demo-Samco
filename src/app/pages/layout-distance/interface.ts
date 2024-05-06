import { ColDef } from 'ag-grid-community';
import ButtonActionAddAndEditPriceObject from '../../../_metronic/helpers/components/ButtonActionAddAndEditPriceObject';

export   const columnDefsDistanceSetupPage: ColDef[] = [
  {
    headerName: 'STT',
    field: 'indexRow',
    width: 60,
  },
  {
    headerName: 'Action',
    field: '',
    width: 100,
  },
  {
    headerName: 'Name',
    field: 'distance_name',
    width: 110,
  },
  {
    headerName: 'Code',
    field: 'distance_code',
    width: 140,
  },
];

export   const columnDefsPriceInDistance: ColDef[] = [
    {
      headerName: 'STT',
      field: 'indexRow',
      width: 60,
    },
    {
      headerName: 'Action',
      field: '',
      width: 100,
      cellRenderer: ButtonActionAddAndEditPriceObject
    },
    {
      headerName: 'Price Name',
      field: 'priceName',
      width: 110,
    },
    {
      headerName: 'Price',
      field: 'price',
      width: 140,
    },
    {
        headerName: 'Min KG',
        field: 'minKG',
        width: 140,
      },
      {
        headerName: 'Max KG',
        field: 'maxKG',
        width: 140,
      },
  ];

  export interface IFormInput {
    priceName?: string,
    price?: number | string,
    minKG?: number | string,
    maxKG?: number | string,
    
  }