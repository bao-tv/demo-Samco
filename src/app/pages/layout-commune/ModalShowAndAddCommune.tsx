import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormCommunesInput, PropsModalShowAndAddCommune, prodDataInit} from './interface'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {usePageData} from '../../../_metronic/layout/core'
import {useSelector} from 'react-redux'
import {useIntl} from 'react-intl'
import {communeAPIGetByDistrict, communeCreatedAPI, communeEditAPIByID} from '../../../apis/communeAPI'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { provinceLiteAPIGetById } from '../../../apis/provinceAPI'
import { districtAPIGetByProvince } from '../../../apis/districtAPI'

const ModalShowAndAddCommune = (props: PropsModalShowAndAddCommune) => {
  const {dataModalCommune} = usePageData()

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    getValues,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      code: dataModalCommune.code || '',
      name: dataModalCommune.name || '',
      province: dataModalCommune?.district?.province || 0,
      district: dataModalCommune?.district || 0,
      shipmentType: dataModalCommune.shipmentType || '',
      id: dataModalCommune.id || 0,
    },
    shouldUnregister: false,
  })
  const {listProvinceLite} = useSelector((state: any) => state.provinceLites)
  const [listDistricts, setListDistricts] = useState<any[]>([])
  const onSubmit: SubmitHandler<IFormCommunesInput> = async (data: IFormCommunesInput) => {
    const communeObjConvert = {
      ...data,
      district: {id: data.district.id || data.district},
      province: {id: data.province.id || data.province},
    }
    try {
      if (communeObjConvert.id) {
        await communeEditAPIByID(communeObjConvert)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await communeCreatedAPI(communeObjConvert)
        ToastSuccess('Bạn đã tạo mới thành công')
      }
      props.refreshData()
      props.handleClose()
    } catch (err) {
      ToastError('Có lỗi xảy ra!')
    }
    reset()
  }
  const onErrors = async (e: any) => {
    if (Object.keys(e).length) {
      ToastError('Bạn nhập thiếu thông tin!')
    }
  }

  const dataInit = async ({provinceId}: prodDataInit) => {
    // console.log('bao provinceId: ', provinceId)
    try {
      if (provinceId) {
        const districtInProvince = await districtAPIGetByProvince(provinceId)
        setListDistricts(districtInProvince?.data || [])
      } else {
        setListDistricts([])
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    const provinceId = getValues('province')?.id
    provinceId && dataInit({provinceId})
  }, [])
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className='row'>
          <div className='card mb-5 p-5 pt-0 me-3'>
            <>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.name && 'border-danger'}`}>
                      Phường/Xã
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.name && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='name'
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.code && 'border-danger'}`}>
                      Mã Phường/Xã
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.code && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='code'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                  min: 0.1,
                }}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <InputGroup className='mb-3'>
                      <p className='fs-5 group-text align-content-center'>Thuộc Tỉnh/Thành phố</p>
                      <Select
                        className={`react-select-container react-select-styled h-43px w-50 ${
                          errors?.province && 'rounded border border-danger'
                        }`}
                        classNamePrefix='react-select h-43px text-dark'
                        options={listProvinceLite}
                        onBlur={onBlur}
                        onChange={async (selectedOption) => {
                          onChange(selectedOption)
                          setValue('district', '')
                          const districtInProvince = await districtAPIGetByProvince(selectedOption?.id)
                          setListDistricts(districtInProvince?.data || [])
                        }}
                        value={value}
                        getOptionLabel={(option) => option?.name}
                        getOptionValue={(option) => option?.id}
                        placeholder='Chọn một Tỉnh/Thành phố'
                      />
                    </InputGroup>
                  )
                }}
                name='province'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                  min: 0.1,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <p className='fs-5 group-text align-content-center'>Thuộc Quận/Huyện</p>
                    <Select
                      className={`react-select-styled h-43 w-50 ${errors?.district && 'rounded border border-danger'}`}
                      classNamePrefix='react-select text-dark'
                      options={listDistricts}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      isDisabled={!listDistricts?.length && !getValues('district')}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      placeholder='Chọn một Quận/Huyện'
                    />
                  </InputGroup>
                )}
                name='district'
              />

              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <InputGroup className='mb-3'>
                      <Form.Check
                        className={`${errors?.shipmentType && 'rounded border border-danger'}`}
                        type='radio'
                        id='IN_PROVINCE'
                        name='group'
                        label='Nội tỉnh'
                        onBlur={onBlur}
                        onChange={() => onChange('Nội tỉnh')}
                        checked={value === 'Nội tỉnh'}
                      />
                      <Form.Check
                        className={`ms-5 ${errors?.shipmentType && 'rounded border border-danger'}`}
                        type='radio'
                        id='OUT_PROVINCE'
                        name='group'
                        label='Ngoại tỉnh'
                        onBlur={onBlur}
                        onChange={() => onChange('Ngoại tỉnh')}
                        checked={value === 'Ngoại tỉnh'}
                      />
                    </InputGroup>
                  )
                }}
                name='shipmentType'
              />
            </>
          </div>
        </div>
        <div className='row'>
          <div className='col justify-content-end d-flex'>
            <div>
              <Button type='submit' className='btn btn-primary'>{`${
                dataModalCommune.id ? 'Cập nhật' : 'Tạo mới'
              } ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddCommune
