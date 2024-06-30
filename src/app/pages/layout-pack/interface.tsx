import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import { useDispatch } from 'react-redux';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { packageAPIDeleteById } from '../../../apis/packageAPI';
import { packages } from '../../../slices/packSlices';

const ButtonActionPackge = (props: any) => {
  const intl = useIntl();
  const dispath = useDispatch();
  const {setDataModalPackage, setShowModalPackage} = usePageData();
  const handleEditRow = () => {
    setDataModalPackage && setDataModalPackage(props?.data);
    setShowModalPackage && setShowModalPackage(true);
  }
  const [titlePackage, setTitlePackage] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitlePackage(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.DONGGOI'})} ${props?.data?.label}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await packageAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        dispath(packages());
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titlePackage} onClickOK={buttonOK} handleClose={() => setTitlePackage('')} />
    </>
  );
}

export   const columnDefsPackageSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionPackge,
    width: 150,
  },
  {
    headerName: 'Mã',
    field: 'value',
    width: 100,
  },
  {
    headerName: 'Loại đóng gói',
    field: 'label',
    width: 200,
  },
  {
    headerName: 'Tên tắt',
    field: 'packagingName',
    width: 150,
  },
  {
    headerName: 'Giá',
    field: 'price',
    width: 150,
  },
  {
    headerName: 'Đơn vị',
    field: 'uom',
    width: 150,
  },
];

  export interface IFormPackageInput {
    label?: string,
    packagingName?: string,
    value?: string,
    price?: number | string,
    uom?: string,
    id: number,
  }