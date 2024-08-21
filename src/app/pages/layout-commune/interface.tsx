import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { communeAPIDeleteById, communeAPIGetAll } from '../../../apis/communeAPI';
import { useIntl } from 'react-intl';

const ButtonActionCommune = (props: any) => {
  const intl = useIntl();
  const {setDataModalCommune, setShowModalCommune, setListCommunes} = usePageData();
  const handleEditRow = () => {
    setDataModalCommune && setDataModalCommune(props?.data);
    setShowModalCommune && setShowModalCommune(true);
  }
  const [titleCommune, setTitleCommune] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleCommune(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.TINHNHANHANG'})}: ${props?.data?.name}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await communeAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        const responseCommune = await communeAPIGetAll();
        responseCommune.status === "OK" && setListCommunes && setListCommunes(responseCommune?.data)  
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titleCommune} onClickOK={buttonOK} handleClose={() => setTitleCommune('')} />
    </>
  );
}

const ShippingType = (props: any) => {
  return props?.data.shipmentType === 'IN_PROVINCE' ? 'Nội Tỉnh' : 'Ngoại Tỉnh'
}

export   const columnDefsCommunesSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionCommune,
    width: 150,
  },
  {
    headerName: 'Mã Phường/Xã',
    field: 'code',
    width: 140,
  },
  {
    headerName: 'Phường/Xã',
    field: 'name',
    width: 150,
  },
  {
    headerName: 'Nội/Ngoại Tỉnh',
    field: 'shipmentType',
    cellRenderer: ShippingType,
    width: 150,
  },
  {
    headerName: 'Mã Quận/Huyện',
    field: 'district.code',
    width: 180,
  },
  {
    headerName: 'Quận/Huyện',
    field: 'district.name',
    width: 150,
  },
  {
    headerName: 'Mã Tỉnh/Thành phố',
    field: 'district.province.code',
    width: 180,
  },
  {
    headerName: 'Tỉnh/Thành phố',
    field: 'district.province.name',
    width: 150,
  },
];

  export interface IFormCommunesInput {
    code?: string,
    name?: string,
    province?: Array<object> | any,
    district?: Array<object> | any,
    id: number,
  }
