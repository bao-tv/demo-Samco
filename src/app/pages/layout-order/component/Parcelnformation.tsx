import React from 'react'
import {Button, Form, InputGroup} from 'react-bootstrap'
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
              className={`group-text ${props?.errors?.itemName && 'border-danger'}`}
            >
              Tên hàng
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.itemName && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='itemName'
      />

      <Controller
        name='itemValue'
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}: any) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.itemValue && 'border-danger'}`}
            >
              Trị giá
            </InputGroup.Text>
            <NumericFormat
              value={value}
              className={`text-dark ${props?.errors?.itemValue && 'border-danger'} form-control`}
              onBlur={onBlur}
              onChange={onChange}
              allowLeadingZeros
              thousandSeparator=','
            />
            <InputGroup.Text className={`${props?.errors?.itemValue && 'border-danger'}`}>
              VND
            </InputGroup.Text>
          </InputGroup>
        )}
      />

      <div className='d-flex'>
        <Controller
          name='itemLength'
          control={props?.control}
          rules={{
            required: true,
            min: 0.001,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3 me-3'>
              <InputGroup.Text className={`${props?.errors?.itemLength && 'border-danger'}`}>
                Dài
              </InputGroup.Text>
              <Form.Control
                className={`text-dark ${props?.errors?.itemLength && 'border-danger'}`}
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
          name='itemWidth'
          control={props?.control}
          rules={{
            required: true,
            min: 0.001,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3  me-3'>
              <InputGroup.Text className={`${props?.errors?.itemWidth && 'border-danger'}`}>
                Rộng
              </InputGroup.Text>
              <Form.Control
                className={`text-dark ${props?.errors?.itemWidth && 'border-danger'}`}
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
          name='itemHeight'
          control={props?.control}
          rules={{
            required: true,
            min: 0.001,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3'>
              <InputGroup.Text className={`${props?.errors?.itemHeight && 'border-danger'}`}>
                Cao
              </InputGroup.Text>
              <Form.Control
                className={`text-dark ${props?.errors?.itemHeight && 'border-danger'}`}
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
        name='itemWeight'
        control={props?.control}
        rules={{
          required: true,
          min: 0.001,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.itemWeight && 'border-danger'}`}
            >
              Trọng lượng
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.itemWeight && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
            <InputGroup.Text
              className={`${props?.errors?.itemWeight && 'border-danger'}`}
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
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <InputGroup className='mb-3 w-50'>
                <Form.Check // prettier-ignore
                  type='checkbox'
                  id={`default-checkbox`}
                  label='Hàng dễ vỡ'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  checked={value}
                />
              </InputGroup>
            )
          }
          
        }
          name='itemFragile'
        />

        <Controller
          name='itemQuantity'
          control={props?.control}
          rules={{
            required: true,
            min: 0.001,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputGroup className='mb-3'>
              <InputGroup.Text
                className={`group-text ${props?.errors?.itemQuantity && 'border-danger'}`}
              >
                Số kiện
              </InputGroup.Text>
              <Form.Control
                className={`text-dark ${props?.errors?.itemQuantity && 'border-danger'}`}
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
