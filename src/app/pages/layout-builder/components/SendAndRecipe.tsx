import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Controller } from "react-hook-form";

type Props = {}

const SendAndRecipe = ({data, control}: any) => {
  return (
    <>
        <p className='list-unstyled text-gray-700 fw-bold fs-3'>{data?.header}</p>
        <InputGroup className="mb-3">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="">
                <InputGroup.Text className='group-text'>
                  Họ tên
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>
              )}
            name={data.inputGroup.name}
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
                  Số CCCD
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
            name={data.inputGroup.idPer}
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
                  Điện thoại
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
              name={data.inputGroup.phone}
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
                Địa chỉ
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </InputGroup>
              )}
              name={data.inputGroup.address}
          />
        </InputGroup>
      </>
  )
}

export default SendAndRecipe