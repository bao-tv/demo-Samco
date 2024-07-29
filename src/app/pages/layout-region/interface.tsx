import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { regionAPIDeleteById, regionAPIGetAll } from '../../../apis/regionAPI';

const ButtonActionRegion = (props: any) => {
  const intl = useIntl();
  const {setDataModalRegion, setShowModalRegion, setListRegions} = usePageData();
  const handleEditRow = () => {
    setDataModalRegion && setDataModalRegion(props?.data);
    setShowModalRegion && setShowModalRegion(true);
  }
  const [titleRegion, setTitleRegion] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleRegion(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.KHUVUC'})}: ${props?.data?.name}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await regionAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        const responseRegion = await regionAPIGetAll();
        responseRegion.status === "OK" && setListRegions && setListRegions(responseRegion?.data)     
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titleRegion} onClickOK={buttonOK} handleClose={() => setTitleRegion('')} />
    </>
  );
}

export  const columnDefsRegionSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionRegion,
    width: 150,
  },
  {
    headerName: 'Mã Khu vực',
    field: 'code',
    width: 150,
  },
  {
    headerName: 'Khu vực',
    field: 'name',
    width: 200,
  },
];

  export interface IFormRegionInput {
    code?: string,
    name?: string,
    id: number,
  }