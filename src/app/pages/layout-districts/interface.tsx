import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { districtAPIDeleteById, districtAPIGetAll } from '../../../apis/districtAPI';
// import ButtonActionAddEditDistrict from '../../../_metronic/helpers/components/ButtonActionAddEditProvince';

const ButtonActionDistrict = (props: any) => {
  const intl = useIntl();
  const {setDataModalDistrict, setShowModalDistrict, setListDistricts} = usePageData();
  const handleEditRow = () => {
    setDataModalDistrict && setDataModalDistrict(props?.data);
    setShowModalDistrict && setShowModalDistrict(true);
  }
  const [titleDistrict, setTitleDistrict] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleDistrict(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}: ${props?.data?.name}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await districtAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        const responseDistrict = await districtAPIGetAll();
        responseDistrict.status === "OK" && setListDistricts && setListDistricts(responseDistrict?.data)  
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titleDistrict} onClickOK={buttonOK} handleClose={() => setTitleDistrict('')} />
    </>
  );
}

export   const columnDefsDistrictsSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionDistrict,
    width: 150,
  },
  {
    headerName: 'Mã Quận/Huyện',
    field: 'code',
    width: 140,
  },
  {
    headerName: 'Quận/Huyện',
    field: 'name',
    width: 150,
  },
  {
    headerName: 'Mã Tỉnh/Thành phố',
    field: 'province.code',
    width: 180,
  },
  {
    headerName: 'Tỉnh/Thành phố',
    field: 'province.name',
    width: 150,
  },
];

  export interface IFormDistrictsInput {
    code?: string,
    name?: string,
    province?: Array<object> | any,
    id: number,
  }
