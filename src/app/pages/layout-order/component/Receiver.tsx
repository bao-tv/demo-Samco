import React, {useEffect, useState} from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import {Controller} from 'react-hook-form'
import {useIntl} from 'react-intl'
import {useSelector} from 'react-redux'
import Select from 'react-select'
import {districtAPIGetByProvince} from '../../../../apis/districtAPI'
import {communeAPIGetByDistrict} from '../../../../apis/communeAPI'

type Props = {
  control: any
  errors: any
  watch: any
  setValue: any
  getValues: any
  setProvinceDetail: any
  provinceDetail: any
  setCommuneDetail: any
  communeDetail: any
}

const Receiver = (props: Props) => {
  const intl = useIntl()
  const {listProvinceLite} = useSelector((state: any) => state.provinceLites)
  const [listDistricts, setListDistricts] = useState<any>([])
  const [listCommunes, setListCommunes] = useState<any>([])
  const dataInit = async () => {
    try {
      const provinceId = props.getValues('receiverProvince')?.id;
      if (provinceId) {
        const districtInProvince = await districtAPIGetByProvince(provinceId);
        setListDistricts(districtInProvince?.data || []);
        
        const districtId = props.getValues('receiverDistrict')?.id;
        if (districtId) {
          const communeInDistrict = await communeAPIGetByDistrict(districtId);
          setListCommunes(communeInDistrict?.data || []);
        } else {
          setListCommunes([]);
        }
      } else {
        setListDistricts([]);
        setListCommunes([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
  
  if (props.getValues('receiverProvince')) {
    useEffect(() => {
      dataInit();
    }, [])
  }
  
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
              className={`group-text ${props?.errors?.receiverName && 'border-danger'}`}
            >
              Họ tên
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.receiverName && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='receiverName'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.receiverIdCard && 'border-danger'}`}
            >
              Số CCCD
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.receiverIdCard && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='receiverIdCard'
      />

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.receiverPhone && 'border-danger'}`}
            >
              Điện thoại
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.receiverPhone && 'border-danger'}`}
              type='number'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='receiverPhone'
      />
      <Controller
        name='receiverProvince'
        control={props?.control}
        rules={{
          required: true,
          min: 0.1,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <div
              className={`d-flex align-items-center w-100 mb-3 ${
                props?.errors?.receiverProvince && 'border-danger'
              }`}
            >
              <label className='form-label d-block me-5'>
                {intl.formatMessage({id: 'MENU.TINHNHANHANG'})}
              </label>
              <Select
                className={`react-select-styled w-50 ${
                  props?.errors?.receiverProvince && 'rounded border border-danger'
                }`}
                classNamePrefix='react-select text-dark'
                options={listProvinceLite}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onBlur={onBlur}
                onChange={async (selectedOption) => {
                  onChange(selectedOption)
                  console.log('bao selectedOption: ', selectedOption);
                  props?.setValue('receiverDistrict', '')
                  props?.setValue('receiverCommune', '')
                  const districtInProvince = await districtAPIGetByProvince(selectedOption?.id)
                  setListDistricts(districtInProvince?.data || [])
                }}
                value={value}
                placeholder='Chọn một tỉnh'
              />
            </div>
          )
        }}
      />
      <Controller
        name='receiverDistrict'
        control={props?.control}
        rules={{
          required: true,
          min: 0.1,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <div
              className={`d-flex align-items-center w-100 mb-3 ${
                props?.errors?.receiverDistrict && 'border-danger'
              }`}
            >
              <label className='form-label d-block me-5'>Huyện nhận hàng</label>
              <Select
                className={`react-select-styled w-50 ${
                  props?.errors?.receiverDistrict && 'rounded border border-danger'
                }`}
                classNamePrefix='react-select text-dark'
                isDisabled={!listDistricts?.length && !props.getValues('receiverDistrict')}
                options={listDistricts}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onBlur={onBlur}
                onChange={async (selectedOption) => {
                  onChange(selectedOption)
                  props?.setValue('receiverCommune', '')
                  const communeInDistrict = await communeAPIGetByDistrict(selectedOption?.id)
                  setListCommunes(communeInDistrict?.data || [])
                }}
                value={value}
                placeholder='Chọn Huyện nhận hàng'
              />
            </div>
          )
        }}
      />
      <Controller
        name='receiverCommune'
        control={props?.control}
        rules={{
          required: true,
          min: 0.1,
        }}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <div
              className={`d-flex align-items-center w-100 mb-3 ${
                props?.errors?.receiverCommune && 'border-danger'
              }`}
            >
              <label className='form-label d-block me-5'>Xã nhận hàng</label>
              <Select
                className={`react-select-styled w-50 ${
                  props?.errors?.receiverCommune && 'rounded border border-danger'
                }`}
                classNamePrefix='react-select text-dark'
                isDisabled={
                  (!listDistricts?.length || !listCommunes.length) &&
                  !props.getValues('receiverCommune')
                }
                options={listCommunes}
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

      <Controller
        control={props?.control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${props?.errors?.receiverAddress && 'border-danger'}`}
            >
              Địa chỉ
            </InputGroup.Text>
            <Form.Control
              className={`text-dark ${props?.errors?.receiverAddress && 'border-danger'}`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </InputGroup>
        )}
        name='receiverAddress'
      />
    </>
  )
}

export default Receiver
