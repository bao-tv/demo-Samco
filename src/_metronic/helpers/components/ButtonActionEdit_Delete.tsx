import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { usePageData } from '../../layout/core';
import { provinceAPIDeleteById } from '../../../apis/provinceAPI';
import ToastError, {ToastSuccess} from '../crud-helper/Toast';
import { useDispatch } from 'react-redux';
import { province } from '../../../slices/provinceSlices';
import ModalToasts from './ModalToasts';

type Props = {
    handleEditRow?: () => void,
    handleRemoveRow?: () => void,
}
const ButtonActionEdit_Delete = (props: Props) => {
    return (
        <div className='d-flex h-100 justify-content-center align-items-center'>
        <Button
            size='sm'
            className='me-1'
            style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
            onClick={props.handleEditRow}
        >
            <i className="bi bi-pencil-square fs-2"></i>
        </Button>
        <Button
            size='sm'
            className='me-1'
            variant="danger"
            style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
            onClick={props.handleRemoveRow}
        >
            <i className="bi bi-x-circle fs-2"></i>
        </Button>
    </div>
  )
}

export default ButtonActionEdit_Delete