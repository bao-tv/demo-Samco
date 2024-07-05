import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import { province } from '../../../slices/provinceSlices';
import { useDispatch } from 'react-redux';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { distanceAPIDeleteById } from '../../../apis/distanceAPI';
import { distance } from '../../../slices/distanceSlices';
// import ButtonActionAddEditProvince from '../../../_metronic/helpers/components/ButtonActionAddEditProvince';

const ButtonActionDistance = (props: any) => {
  const intl = useIntl();
  const dispath = useDispatch();
  const {setDataModalDistance, setShowModalDistance} = usePageData();
  const handleEditRow = () => {
    setDataModalDistance && setDataModalDistance(props?.data);
    setShowModalDistance && setShowModalDistance(true);
  }
  const [titleDistance, setTitleDistance] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleDistance(`Bạn có muốn xóa )} ${props?.data?.label}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await distanceAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        dispath(distance());
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titleDistance} onClickOK={buttonOK} handleClose={() => setTitleDistance('')} />
    </>
  );
}

const ButtonActionDistanceObject = (props: any) => {
  console.log('bao props: ', props)
  const {gridRefDistancePricebjectSetup, setDataModalDistancePriceObject, setShowModalDistancePriceObject} = usePageData();
  const handleEditRow = () => {
    setShowModalDistancePriceObject && setShowModalDistancePriceObject(true);
    setDataModalDistancePriceObject && setDataModalDistancePriceObject(props);
  }
  const [titleDistanceObject, setTitlesetDataModalDistancePriceObject] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitlesetDataModalDistancePriceObject('Bạn có muốn xóa Giá cho khoản cách này!');
}
const buttonOK = async () => {
    try {
        console.log('bao props: ', props);
        const rowData: any[] = [];
        gridRefDistancePricebjectSetup.current!.api.forEachNode(function (node: any) {
          node.rowIndex === props.rowIndex && rowData.push(node.data);
        });
        const res = gridRefDistancePricebjectSetup.current!.api.applyTransaction({
          remove: rowData,
        })!;
        res.remove.length && ToastSuccess("Bạn đã xóa thành công!");
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titleDistanceObject} onClickOK={buttonOK} handleClose={() => setTitlesetDataModalDistancePriceObject('')} />
    </>
  );
}
export   const columnDefsDistanceSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionDistance,
    width: 150,
  },
  {
    headerName: 'Tên loại giá',
    field: 'distanceName',
    width: 150,
  },
  {
    headerName: 'Mã khoảng cách',
    field: 'distanceCode',
    width: 140,
  },
  {
    headerName: 'Thời gian giao hàng',
    field: 'time',
    width: 150,
  },
  // {
  //   headerName: 'Số ngày giao',
  //   field: 'licenseplates',
  //   width: 150,
  // },
];

export   const columnDefsPricesInDistance: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      width: 60,
    },
    {
      headerName: 'Hành động',
      field: '',
      width: 100,
      cellRenderer: ButtonActionDistanceObject
    },
    {
      headerName: 'Tên loại giá',
      field: 'priceName',
      width: 110,
    },
    {
      headerName: 'Mã loại giá',
      field: 'priceCode',
      width: 140,
    },
    {
      headerName: 'Giá',
      field: 'priceNumber',
      width: 140,
    },
    {
      headerName: 'Số KG nhỏ nhất',
      field: 'minKG',
      width: 140,
    },
    {
      headerName: 'Số KG lớn nhất',
      field: 'maxKG',
      width: 140,
    },
    {
      headerName: 'Lũy tiến',
      field: 'priceAdd',
      width: 140,
      // cellRenderer: 'agCheckboxCellRenderer',
      // cellEditor: 'agCheckboxCellEditor',
    },
  ];

  export interface DistancePriceObject {
    priceName?: string,
    priceNumber?: number | string,
    priceCode?: string,
    minKG?: number | string,
    maxKG?: number | string,
    priceAdd?: boolean,
    id?: number,
  }

  export interface IFormProvinceInput {
    label?: string,
    value?: string,
    licenseplates?: number | string,
    transportation_route?: Array<object>,
    id: number,
  }