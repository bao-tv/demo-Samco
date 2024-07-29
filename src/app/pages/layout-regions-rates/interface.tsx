import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { region_rateAPIDeleteById, region_rateAPIGetAll } from '../../../apis/region-rateAPI';
// import ButtonActionAddEditProvince from '../../../_metronic/helpers/components/ButtonActionAddEditProvince';

const ButtonActionRegion_Rate = (props: any) => {
  const intl = useIntl();
  const {setDataModalRegion_Rate, setShowModalRegion_Rate, setListRegion_Rates} = usePageData();
  const handleEditRow = () => {
    setDataModalRegion_Rate && setDataModalRegion_Rate(props?.data);
    setShowModalRegion_Rate && setShowModalRegion_Rate(true);
  }
  const [titleProvince, setTitleProvince] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleProvince(`Bạn có muốn xóa Giá từ ${props?.data?.fromKg} KG - đến ${props?.data?.toKg} KG`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await region_rateAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        const responseRegion_Rate = await region_rateAPIGetAll();
        responseRegion_Rate.status === "OK" && setListRegion_Rates && setListRegion_Rates(responseRegion_Rate?.data)  
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

export const columnDefsRegion_Rates_SetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionRegion_Rate,
    width: 150,
  },
  {
    headerName: 'KG từ',
    field: 'fromKg',
    width: 140,
  },
  {
    headerName: 'KG đến',
    field: 'toKg',
    width: 150,
  },
  {
    headerName: 'Cân nặng đến tối đa',
    field: 'additionalWeight',
    width: 150,
    cellDataType: 'boolean'
  },
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

  export interface IFormRegionsInput {
    fromKg?: number,
    toKg?: number,
    price?: number,
    additionalPrice?: number,
    additionalWeight?: number,
    note?: string,
    regionFreightPrice?: Array<object> | any,
    id: number,
  }