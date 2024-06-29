import React, {useCallback} from 'react';
import Button from 'react-bootstrap/Button';

type Props = {}

const ButtonActionAddAndEditPriceObject = (props: Props) => {
    const handleEditRow = () => {
        
    }

    const handleRemoveRow = () => {
        
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
        {/* <div className='' id="containerReceipt">
            <Receipt data={props.data}/>
        </div> */}
    </div>
  )
}

export default ButtonActionAddAndEditPriceObject