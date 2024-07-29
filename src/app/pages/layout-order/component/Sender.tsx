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
            <InputGroup.Text className={`group-text ${props?.errors?.sendName && 'border-danger'}`}>
              Họ tên
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.sendName && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='sendName'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.sendIdPer && 'border-danger'}`}
            >
              Số CCCD
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.sendIdPer && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='sendIdPer'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.sendPhone && 'border-danger'}`}
            >
              Điện thoại
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.sendPhone && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='sendPhone'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.sendAddress && 'border-danger'}`}
            >
              Địa chỉ
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.sendAddress && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='sendAddress'
      />
    </>
  )
}

export default Sender
