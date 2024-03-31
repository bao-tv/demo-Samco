import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from 'react-select';
import { Controller } from "react-hook-form";

const Cost = ({totalPay, control}: any) => {
  // console.log('bao totalPay: ', totalPay)
  const options = [
    { value: 'option 1', label: 'Hàng bình thường (1)' },
    { value: 'option 2', label: 'Hàng quá tải (1.2)' },
    { value: 'option 3', label: 'Hàng quá khổ (1.2)' },
    { value: 'option 4', label: 'Hàng quá tải và quá khổ (1.2)' },
  ]
  return (
    <>
        <p className='list-unstyled text-gray-700 fw-bold fs-3'>Tiền dịch vụ</p>
        <InputGroup className="mb-3">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="">
                <InputGroup.Text className='group-text'>
                  Giá dịch vụ
                </InputGroup.Text>
                <Form.Control
                  type='number'
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
              )}
            name='price'
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <div className='d-flex align-items-center w-100'>
              <label className='form-label d-block me-5'>Hệ số dịch vụ</label>
                <Select 
                    className='react-select-styled w-50' 
                    classNamePrefix='react-select' 
                    options={options}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder='Chọn một hệ số dịch vụ' 
                />
              </div>
              )}
              name='coefficient'
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <InputGroup className="">
                <InputGroup.Text className='group-text'>
                  Giá dịch vụ đóng gói
                </InputGroup.Text>
                <Form.Control
                  type='number'
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
            </InputGroup>
            )}
            name='packagingServicePrice'
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            defaultValue={totalPay}
            render={({ field: { onChange, onBlur, value } }) => (
            <InputGroup className="">
                <InputGroup.Text className='group-text'>
                  Tổng tiền
                </InputGroup.Text>
                <Form.Control
                  disabled={true}
                  type='number'
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  // onBlur={onBlur}
                  // onChange={onChange}
                  value={totalPay}
                />
                <InputGroup.Text>VND</InputGroup.Text>
            </InputGroup>
            )}
            name='totalPrice'
          />
        </InputGroup>

    </>
  )
}

export default Cost