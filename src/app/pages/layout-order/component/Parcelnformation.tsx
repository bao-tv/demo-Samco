import React from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {Controller} from 'react-hook-form'
import {NumericFormat} from 'react-number-format'
import Select from 'react-select'

type Props = {
  control: any
  errors: any
  watch: any
}

const Parcelnformation = (props: Props) => {
  return (
    <>
      <p className='list-unstyled text-gray-700 fw-bold fs-3'>Thông tin bưu kiện</p>
      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.packageName && 'border-danger'}`}
            >
              Tên hàng
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.packageName && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='packageName'
      />

      <Controller
        name='packageValue'
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}: any) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.packageValue && 'border-danger'}`}
            >
              Trị giá
            </InputGroup.Text>
            <NumericFormat
              value={value}
              className={`text-dark ${props?.errors?.packageValue && 'border-danger'} form-control`}
              onBlur={onBlur}
              onChange={onChange}
              allowLeadingZeros
              thousandSeparator=','
            />
            <InputGroup.Text className={`${props?.errors?.packageValue && 'border-danger'}`}>
              VND
            </InputGroup.Text>
          </InputGroup>
        )}
      />

      <div className='d-flex'>
        <Controller
          name='packageLength'
          control={props?.control}
          rules={{
            required: true,
            min: 0.001,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3 me-3'>
              <InputGroup.Text className={`${props?.errors?.packageLength && 'border-danger'}`}>
                Dài
              </InputGroup.Text>
              <Form.Control
                className={`text-dark ${props?.errors?.packageLength && 'border-danger'}`}
                type='number'
                aria-label='Default'
                aria-describedby='inputGroup-sizing-default'
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </InputGroup>
          )}
        />
        <Controller
          name='packageWidth'
          control={props?.control}
          rules={{
            required: true,
            min: 0.001,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3  me-3'>
              <InputGroup.Text className={`${props?.errors?.packageWidth && 'border-danger'}`}>
                Rộng
              </InputGroup.Text>
              <Form.Control
                className={`text-dark ${props?.errors?.packageWidth && 'border-danger'}`}
                type='number'
                aria-label='Default'
                aria-describedby='inputGroup-sizing-default'
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </InputGroup>
          )}
        />
        <Controller
          name='packageHeight'
          control={props?.control}
          rules={{
            required: true,
            min: 0.001,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3'>
              <InputGroup.Text className={`${props?.errors?.packageHeight && 'border-danger'}`}>
                Cao
              </InputGroup.Text>
              <Form.Control
                className={`text-dark ${props?.errors?.packageHeight && 'border-danger'}`}
                type='number'
                aria-label='Default'
                aria-describedby='inputGroup-sizing-default'
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </InputGroup>
          )}
        />
      </div>

      <Controller
        name='packageWeight'
        control={props?.control}
        rules={{
          required: true,
          min: 0.001,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.packageWeight && 'border-danger'}`}
            >
              Trọng lượng
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.packageWeight && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
            <InputGroup.Text
              className={`${props?.errors?.packageWeight && 'border-danger'}`}
              style={{padding: '0.75rem 1.45rem'}}
            >
              KG
            </InputGroup.Text>
          </InputGroup>
        )}
      />

      <div className='d-flex'>
        <Controller
          control={props?.control}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3 w-50'>
              <Form.Check // prettier-ignore
                type='checkbox'
                id={`default-checkbox`}
                label='Hàng dễ vỡ'
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </InputGroup>
          )}
          name='fragile'
        />

        <Controller
          name='packageQuantity'
          control={props?.control}
          rules={{
            required: true,
            min: 0.001,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3'>
              <InputGroup.Text
                className={`group-text ${props?.errors?.packageQuantity && 'border-danger'}`}
              >
                Số kiện
              </InputGroup.Text>
              <Form.Control
                className={`text-dark ${props?.errors?.packageQuantity && 'border-danger'}`}
                type='number'
                aria-label='Default'
                aria-describedby='inputGroup-sizing-default'
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </InputGroup>
          )}
        />
      </div>
    </>
  )
}

export default Parcelnformation
