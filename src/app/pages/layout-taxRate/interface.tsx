import { ColDef } from 'ag-grid-community';
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete';
import { usePageData } from '../../../_metronic/layout/core';
import { useState } from 'react';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts';
import { useIntl } from 'react-intl';
import { taxRateAPIDeleteById } from '../../../apis/taxRateAPI';
import { useDispatch } from 'react-redux';
import { taxRate } from '../../../slices/taxRateSlices';

const ButtonActionTaxRate = (props: any) => {
  const dispath = useDispatch();
  const intl = useIntl();
  const {setDataModalTaxRate, setShowModalTaxRate} = usePageData();
  const handleEditRow = () => {
    setDataModalTaxRate && setDataModalTaxRate(props?.data);
    setShowModalTaxRate && setShowModalTaxRate(true);
  }
  const [titleTaxRate, setTitleTaxRate] = useState<any>('');
  const handleRemoveRow =  () => {
    setTitleTaxRate(`Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.THUESUAT'})}: ${props?.data?.name}`);
}
const buttonOK = async () => {
    try {
        const response = props?.data?.id && await taxRateAPIDeleteById(props?.data?.id)
        response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
        // const responseTaxRate = await taxRateAPIGetAll();
        // responseTaxRate.status === "OK" && setListTaxRates && setListTaxRates(responseTaxRate?.data)    
        dispath(taxRate());
      }catch (err) {
        ToastError("Bạn xóa không thành công!")
      }
}
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow}/>
      <ModalToasts title={titleTaxRate} onClickOK={buttonOK} handleClose={() => setTitleTaxRate('')} />
    </>
  );
}

export  const columnDefsTaxRateSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionTaxRate,
    width: 150,
  },
  {
    headerName: 'Mã Thuế suất',
    field: 'code',
    width: 150,
  },
  {
    headerName: 'Tên Thuế suất',
    field: 'name',
    width: 200,
  },
  {
    headerName: 'Thuế (%)',
    field: 'tax',
    width: 200,
  },
];

  export interface IFormTaxRateRateInput {
    code?: string,
    name?: string,
    id: number,
  }