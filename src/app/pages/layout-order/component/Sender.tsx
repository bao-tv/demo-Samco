import React from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {Controller} from 'react-hook-form'

type Props = {
  control: any
  errors: any
}

const Sender = (props: Props) => {
  return (
    <>
      <p className='list-unstyled text-gray-700 fw-bold fs-3'>Người gửi</p>
      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text className={`group-text ${props?.errors?.senderName && 'border-danger'}`}>
              Họ tên
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.senderName && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='senderName'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.senderIdCard && 'border-danger'}`}
            >
              Số CCCD
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.senderIdCard && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='senderIdCard'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.senderPhone && 'border-danger'}`}
            >
              Điện thoại
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.senderPhone && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='senderPhone'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.senderAddress && 'border-danger'}`}
            >
              Địa chỉ
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.senderAddress && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='senderAddress'
      />
    </>
  )
}

export default Sender
