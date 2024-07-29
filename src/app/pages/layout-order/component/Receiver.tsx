import React, { useEffect, useState } from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {Controller} from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { districtAPIGetById } from '../../../../apis/districtAPI'
import ToastError from '../../../../_metronic/helpers/crud-helper/Toast'
import { provinceLiteAPIGetById } from '../../../../apis/provinceAPI'

type Props = {
  control: any
  errors: any
  watch: any
  setValue: any
}

const Receiver = (props: Props) => {
  const intl = useIntl();
  const {listProvinceLite} = useSelector((state: any) => state.provinceLites)
  const [listDistricts, setListDistricts] = useState<any[]>([])
  const [districtDetail, setDisTrictDetail] = useState<any>({});
  const getDisTrictDetail = async (id: number) => {
    try {
      const response = await districtAPIGetById(id)
      response.status === 'OK' && setDisTrictDetail(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  useEffect(() => {
    props?.watch('receiptDistrictsAddress')?.id && getDisTrictDetail(props?.watch('receiptDistrictsAddress')?.id);
  }, [props?.watch('receiptDistrictsAddress')?.id])
  return (
    <>
      <p className='list-unstyled text-gray-700 fw-bold fs-3'>Người nhận</p>
      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.receiptName && 'border-danger'}`}
            >
              Họ tên
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.receiptName && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='receiptName'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.receiptIdPer && 'border-danger'}`}
            >
              Số CCCD
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.receiptIdPer && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='receiptIdPer'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.receiptPhone && 'border-danger'}`}
            >
              Điện thoại
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.receiptPhone && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='receiptPhone'
      />
      <Controller
        name='receiptProvincesAddress'
        control={props?.control}
        rules={{
          required: true,
          min: 0.1,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <div
              className={`d-flex align-items-center w-100 mb-3 ${
                props?.errors?.receiptProvincesAddress && 'border-danger'
              }`}
            >
              <label className='form-label d-block me-5'>
                {intl.formatMessage({id: 'MENU.TINHNHANHANG'})}
              </label>
              <Select
                className={`react-select-styled w-50 ${
                  props?.errors?.receiptProvincesAddress && 'rounded border border-danger'
                }`}
                classNamePrefix='react-select text-dark'
                options={listProvinceLite}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onBlur={onBlur}
                onChange={async (selectedOption) => {
                  onChange(selectedOption)
                  props?.setValue('receiptAddress', '')
                  const responseProvinceDetail = await provinceLiteAPIGetById(selectedOption?.id);
                  console.log('bao responseProvinceDetail: ', responseProvinceDetail);
                  setListDistricts(responseProvinceDetail?.data?.districts)
                }}
                value={value}
                placeholder='Chọn một tỉnh'
              />
            </div>
          )
        }}
      />
      <Controller
        name='receiptDistrictsAddress'
        control={props?.control}
        rules={{
          required: true,
          min: 0.1,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <div
              className={`d-flex align-items-center w-100 mb-3 ${
                props?.errors?.receiptDistrictsAddress && 'border-danger'
              }`}
            >
              <label className='form-label d-block me-5'>Huyện nhận hàng</label>
              <Select
                className={`react-select-styled w-50 ${
                  props?.errors?.receiptDistrictsAddress && 'rounded border border-danger'
                }`}
                classNamePrefix='react-select text-dark'
                isDisabled={!listDistricts.length}
                options={listDistricts}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onBlur={onBlur}
                // onChange={onChange}
                onChange={(selectedOption) => {
                  onChange(selectedOption)
                  props?.setValue('receiptCommunesAddress', '')
                }}
                value={value}
                placeholder='Chọn Huyện nhận hàng'
              />
            </div>
          )
        }}
      />
      <Controller
        name='receiptCommunesAddress'
        control={props?.control}
        rules={{
          required: true,
          min: 0.1,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <div
              className={`d-flex align-items-center w-100 mb-3 ${
                props?.errors?.receiptCommunesAddress && 'border-danger'
              }`}
            >
              <label className='form-label d-block me-5'>Xã nhận hàng</label>
              <Select
                className={`react-select-styled w-50 ${
                  props?.errors?.receiptCommunesAddress && 'rounded border border-danger'
                }`}
                classNamePrefix='react-select text-dark'
                isDisabled={!districtDetail?.communes?.length}
                options={districtDetail?.communes}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder='Chọn Xã nhận hàng'
              />
            </div>
          )
        }}
      />
    </>
  )
}

export default Receiver
