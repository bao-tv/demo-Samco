import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import { provinceAPIDeleteById } from '../../../apis/provinceAPI';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import { province } from '../../../slices/provinceSlices';
import { useDispatch } from 'react-redux';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
// import ButtonActionAddEditProvince from '../../../_metronic/helpers/components/ButtonActionAddEditProvince';

const ButtonActionProvince = (props: any) => {
  const intl = useIntl();
  const dispath = useDispatch();
  const {setDataModalProvince, setShowModalProvince} = usePageData();
  const handleEditRow = () => {
    setDataModalProvince && setDataModalProvince(props?.data);
    setShowModalProvince && setShowModalProvince(true);
  }
  const [titleProvince, setTitleProvince] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleProvince(`Bạn có muốn xóa )} ${props?.data?.label}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await provinceAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        dispath(province());
      }catch (err) {
        // setErr(err.response?.data?.content)
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titleProvince} onClickOK={buttonOK} handleClose={() => setTitleProvince('')} />
    </>
  );
}

const ButtonActionProvinceObject = (props: any) => {
  const dispath = useDispatch();
  const {gridRefProvinceObjectSetup, setDataModalProvinceObject, setShowModalProvinceObject} = usePageData();
  const handleEditRow = () => {
    // console.log('bao props: ', props)
    setShowModalProvinceObject && setShowModalProvinceObject(true);
    setDataModalProvinceObject && setDataModalProvinceObject(props);
  }
  const [titleProvinceObject, setTitleProvinceObject] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleProvinceObject('Bạn có muốn xóa Khu vực nhận hàng');
}
const buttonOK = async () => {
    try {
        console.log('bao props: ', props);
        const rowData: any[] = [];
        gridRefProvinceObjectSetup.current!.api.forEachNode(function (node: any) {
          node.rowIndex === props.rowIndex && rowData.push(node.data);
        });
        const res = gridRefProvinceObjectSetup.current!.api.applyTransaction({
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
      <ModalToasts title={titleProvinceObject} onClickOK={buttonOK} handleClose={() => setTitleProvinceObject('')} />
    </>
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
      cellRenderer: ButtonActionProvinceObject
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
    id: number,
  }