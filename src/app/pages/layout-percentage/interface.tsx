import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { deliveryConfigAPIDeleteById } from '../../../apis/deliveryConfigAPI';
import { useDispatch } from 'react-redux';
import { Percentage } from '../../../slices/percentageSlices';

const ButtonActionPercentage = (props: any) => {
  const dispath = useDispatch();
  const intl = useIntl();
  const {setDataModalPercentage, setShowModalPercentage} = usePageData();
  const handleEditRow = () => {
    setDataModalPercentage && setDataModalPercentage(props?.data);
    setShowModalPercentage && setShowModalPercentage(true);
  }
  const [titlePercentage, setTitlePercentage] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitlePercentage(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.PHI-THUE'})}: ${props?.data?.name}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await deliveryConfigAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        // const responsePercentage = await taxRateAPIGetAll();
        // responsePercentage.status === "OK" && setListPercentages && setListPercentages(responsePercentage?.data)    
        dispath(Percentage());
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titlePercentage} onClickOK={buttonOK} handleClose={() => setTitlePercentage('')} />
    </>
  );
}

export  const columnDefsPercentageSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionPercentage,
    width: 150,
  },
  {
    headerName: 'Mã Phí/Thuế',
    field: 'code',
    width: 150,
  },
  {
    headerName: 'Tên Phí/Thuế',
    field: 'name',
    width: 250,
  },
  {
    headerName: 'Phí/Thuế (%)',
    field: 'percentage',
    width: 120,
  },
  {
    headerName: 'Ghi chú',
    field: 'note',
    width: 200,
  },
  {
    headerName: 'Ngày tạo',
    field: 'createdDate',
    width: 230,
  },
];

  export interface IFormPercentageInput {
    code?: string,
    name?: string,
    id: number,
  }