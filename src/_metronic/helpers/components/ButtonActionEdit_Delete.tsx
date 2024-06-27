import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { usePageData } from '../../layout/core';
import { provinceAPIDeleteById } from '../../../apis/provinceAPI';
import ToastError, {ToastSuccess} from '../crud-helper/Toast';
import { useDispatch } from 'react-redux';
import { province } from '../../../slices/provinceSlices';
import ModalToasts from './ModalToasts';

type Props = {
    handleEditRow?: void,
    handleRemoveRow?: void,
}
const ButtonActionEdit_Delete = ({props}: any) => {
    const {gridRefProvinceSetup, setShowCreateProvinceModal} = usePageData();
    const dispath = useDispatch();
    const handleEditRow = () => {
        props?.data?.id && setShowCreateProvinceModal && setShowCreateProvinceModal(props?.data)
    }
    const [title, setTitle] = useState<any>('');
    const handleRemoveRow =  () => {
        setTitle('Bạn có muốn xóa Tỉnh nhận hàng');
    }
    const buttonOK = async () => {
        try {
            const response = props?.data?.id && await provinceAPIDeleteById(props?.data?.id)
            response.status === "OK" && ToastSuccess("Bạn đã xóa thành công!");
            dispath(province());
          }catch (err) {
            // setErr(err.response?.data?.content)
            ToastError("Bạn xóa không thành công!")
          }
    }
    return (
        <div className='d-flex h-100 justify-content-center align-items-center'>
        <Button
            size='sm'
            className='me-1'
            style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
            onClick={handleEditRow}
        >
            <i className="bi bi-pencil-square fs-2"></i>
        </Button>
        <Button
            size='sm'
            className='me-1'
            variant="danger"
            style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
            onClick={handleRemoveRow}
        >
            <i className="bi bi-x-circle fs-2"></i>
        </Button>
        <ModalToasts title={title} onClickOK={buttonOK} handleClose={() => setTitle('')} />
        {/* <div className='' id="containerReceipt">
            <Receipt data={props.data}/>
        </div> */}
    </div>
  )
}

export default ButtonActionEdit_Delete