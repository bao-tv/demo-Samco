import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import { useDispatch } from 'react-redux';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { packagesCBMPrice } from '../../../slices/packageCBMPriceSlice';
import { packageCBMPriceAPIDeleteById } from '../../../apis/packageCBMPriceAPI';

const ButtonActionPackge = (props: any) => {
  const intl = useIntl();
  const dispath = useDispatch();
  const {setDataModalPackageCBMPrice, setShowModalPackageCBMPrice} = usePageData();
  const handleEditRow = () => {
    setDataModalPackageCBMPrice && setDataModalPackageCBMPrice(props?.data);
    setShowModalPackageCBMPrice && setShowModalPackageCBMPrice(true);
  }
  const [titlePackageCBMPrice, setTitlePackageCBMPrice] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitlePackageCBMPrice(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.DONGGOICBM'})} ${props?.data?.label}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await packageCBMPriceAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        dispath(packagesCBMPrice());
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titlePackageCBMPrice} onClickOK={buttonOK} handleClose={() => setTitlePackageCBMPrice('')} />
    </>
  );
}

export const columnDefsPackageCBMPriceSetupPage: ColDef[] = [
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
    field: 'code',
    width: 100,
  },
  {
    headerName: 'Loại đóng gói',
    field: 'name',
    width: 200,
  },
  {
    headerName: 'Từ CBM',
    field: 'fromCbm',
    width: 150,
  },
  {
    headerName: 'Đến CBM',
    field: 'toCbm',
    width: 150,
  },
  {
    headerName: 'Giá',
    field: 'price',
    width: 150,
  },
  {
    headerName: 'Trọng lượng cộng thêm',
    field: 'additionalWeightAfterPacking',
    width: 150,
  },
  {
    headerName: 'Trọng lượng tối đa',
    field: 'maxWeightPerPackage',
    width: 150,
  },
  {
    headerName: 'Chi phí đóng kiện',
    field: 'additionalPrice',
    width: 150,
  },
  {
    headerName: 'Thuế(%)',
    field: 'vat',
    width: 150,
  },
  {
    headerName: 'Hệ số tính giá',
    field: 'priceCoefficient',
    width: 150,
  },
  {
    headerName: 'Note',
    field: 'note',
    width: 150,
  },

];

  export interface IFormPackageCBMPriceInput {
    code: string
    name: string
    fromCbm: number
    toCbm: number
    price: number
    additionalWeightAfterPacking: number
    maxWeightPerPackage: number
    additionalPrice: number
    priceCoefficient: number
    vat: number
    note: string
    id: number
  }