import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import { provinceAPIDeleteById, provinceAPIGetAll } from '../../../apis/provinceAPI';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import { useDispatch } from 'react-redux';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';

const ButtonActionProvince = (props: any) => {
  const intl = useIntl();
  const dispath = useDispatch();
  const {setDataModalProvince, setShowModalProvince, setListProvinces} = usePageData();
  const handleEditRow = () => {
    setDataModalProvince && setDataModalProvince(props?.data);
    setShowModalProvince && setShowModalProvince(true);
  }
  const [titleProvince, setTitleProvince] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleProvince(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.TINHNHANHANG'})}: ${props?.data?.name}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await provinceAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        const responseProvince = await provinceAPIGetAll();
        responseProvince.status === "OK" && setListProvinces && setListProvinces(responseProvince?.data)  
      }catch (err) {
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
  {
    headerName: 'Mã Tỉnh/Thành phố',
    field: 'code',
    width: 200,
  },
  {
    headerName: 'Tỉnh/Thành phố',
    field: 'name',
    width: 150,
  },
  {
    headerName: 'Biển số',
    field: 'licensePlateCode',
    width: 150,
  },
  {
    headerName: 'Khoản cách (km)',
    field: 'km',
    width: 150,
  },
  {
    headerName: 'Mã vùng',
    field: 'regionFreightPrice.code',
    width: 150,
  },
  {
    headerName: 'Tên vùng',
    field: 'regionFreightPrice.name',
    width: 150,
  },
  {
    headerName: 'Mã khu vực',
    field: 'region.code',
    width: 150,
  },
  {
    headerName: 'Tên khu vực',
    field: 'region.name',
    width: 150,
  },
];

  export interface IFormProvinceInput {
    code: string,
    name: string,
    km?: number | string,
    licensePlateCode?: number | string,
    routeCode?: string,
    region?: Array<object> | any,
    regionFreightPrice?: Array<object> | any,
    id: number,
  }
