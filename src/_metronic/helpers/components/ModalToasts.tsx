import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { boolean } from 'yup'

type Props = {
    title?: any,
    onClickOK: any,
    handleClose: any,
}

const ModalToasts = (props: Props) => {
  return (
    <Modal show={props?.title} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Footer className='justify-content-center'>
          <Button variant="danger" onClick={props?.onClickOK}>
            OK
          </Button>
          <Button variant="primary" onClick={props?.handleClose}>
            NO
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalToasts