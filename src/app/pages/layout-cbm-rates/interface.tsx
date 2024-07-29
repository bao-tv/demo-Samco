import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { region_rateAPIDeleteById, region_rateAPIGetAll } from '../../../apis/region-rateAPI';
// import ButtonActionAddEditProvince from '../../../_metronic/helpers/components/ButtonActionAddEditProvince';

const ButtonActionCBM_Rate = (props: any) => {
  const intl = useIntl();
  const {setDataModalCBM_Rate, setShowModalCBM_Rate, setListCBM_Rates} = usePageData();
  const handleEditRow = () => {
    setDataModalCBM_Rate && setDataModalCBM_Rate(props?.data);
    setShowModalCBM_Rate && setShowModalCBM_Rate(true);
  }
  const [titleProvince, setTitleProvince] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleProvince(`Bạn có muốn xóa Giá từ ${props?.data?.fromKg} KG - đến ${props?.data?.toKg} KG`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await region_rateAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        const responseCBM_Rate = await region_rateAPIGetAll();
        responseCBM_Rate.status === "OK" && setListCBM_Rates && setListCBM_Rates(responseCBM_Rate?.data)  
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

export const columnDefsCBM_Rates_SetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionCBM_Rate,
    width: 150,
  },
  {
    headerName: 'CBM từ',
    field: 'fromVolume',
    width: 140,
  },
  {
    headerName: 'CBM đến',
    field: 'toVolume',
    width: 150,
  },
  // {
  //   headerName: 'Cân nặng đến tối đa',
  //   field: 'additionalWeight',
  //   width: 150,
  //   cellDataType: 'boolean'
  // },
  {
    headerName: 'Giá',
    field: 'price',
    width: 180,
  },
  {
    headerName: 'Giá lũy tiến',
    field: 'additionalPrice',
    width: 150,
    cellDataType: 'boolean'
  },
  {
    headerName: 'Mã vùng',
    field: 'regionFreightPrice.code',
    width: 150,
  },
  {
    headerName: 'Vùng',
    field: 'regionFreightPrice.name',
    width: 150,
  },
  {
    headerName: 'Ghi chú',
    field: 'note',
    width: 150,
  },
];

  export interface IFormCBMsInput {
    fromVolume?: number,
    toVolume?: number,
    price?: number,
    additionalPrice?: number,
    additionalWeight?: number,
    // note?: string,
    regionFreightPrice?: Array<object> | any,
    id: number,
  }