import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { region_priceAPIDeleteById, region_priceAPIGetAll } from '../../../apis/region-priceAPI';
// import ButtonActionAddEditProvince from '../../../_metronic/helpers/components/ButtonActionAddEditProvince';

const ButtonActionRegion_Freight_Price = (props: any) => {
  const intl = useIntl();
  const {setDataModalRegion_Freight_Price, setShowModalRegion_Freight_Price, setListRegion_Freight_Prices} = usePageData();
  const handleEditRow = () => {
    setDataModalRegion_Freight_Price && setDataModalRegion_Freight_Price(props?.data);
    setShowModalRegion_Freight_Price && setShowModalRegion_Freight_Price(true);
  }
  const [titleProvince, setTitleProvince] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleProvince(`Bạn có muốn xóa Xã ${props?.data?.name}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await region_priceAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        const responseRegion_Freight_Price = await region_priceAPIGetAll();
        responseRegion_Freight_Price.status === "OK" && setListRegion_Freight_Prices && setListRegion_Freight_Prices(responseRegion_Freight_Price?.data)  
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

export const columnDefsRegion_Freight_Prices_SetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionRegion_Freight_Price,
    width: 150,
  },
  {
    headerName: 'Mã Vùng',
    field: 'code',
    width: 140,
  },
  {
    headerName: 'Tên Vùng',
    field: 'name',
    width: 150,
  },
  {
    headerName: 'Thời gian giao',
    field: 'deliveryTime',
    width: 180,
  },
  {
    headerName: 'Khu vực',
    field: 'region.name',
    width: 150,
  },
  {
    headerName: 'Mức giảm (%z)',
    field: 'discount',
    width: 150,
  },
  {
    headerName: 'Đề xuất',
    field: 'proposal',
    width: 150,
  },
];

  export interface IFormRegionsInput {
    code?: string,
    name?: string,
    delivery_time?: string,
    discount?: string,
    proposal?: string,
    region?: Array<object> | any,
    id: number,
  }