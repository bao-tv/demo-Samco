import { ColDef } from 'ag-grid-community';

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