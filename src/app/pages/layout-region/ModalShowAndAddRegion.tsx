import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormRegionInput} from './interface'
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import { usePageData } from '../../../_metronic/layout/core'
import { regionCreatedAPI, regionEditAPIByID } from '../../../apis/regionAPI';

type Props = {
  title: string,
  refreshData?: any,
  handleClose?: any,
}

const ModalShowAndAddRegion = (props: Props) => {
  const {dataModalRegion} = usePageData();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      code: dataModalRegion.code || '',
      name: dataModalRegion.name || '',
      id: dataModalRegion.id || 0,
     },
    shouldUnregister: false,
  })
  const onSubmit: SubmitHandler<IFormRegionInput> = async(data: IFormRegionInput) =>{
    const objectConvert = {...data, provinces: [], prices: []} ;
    try{
      if(data.id) {
        await regionEditAPIByID(objectConvert);
        ToastSuccess("Bạn đã cập nhật thành công");
      } else {
        await regionCreatedAPI(objectConvert);
        ToastSuccess("Bạn đã tạo mới thành công");
      }
      props.refreshData();
      props.handleClose();
    }catch (err) {
    ToastError("Có lỗi xảy ra!");

    }
    reset();
  }
  const onErrors = async (e: any) => {
    if (Object.keys(e).length) {
      ToastError("Bạn nhập thiếu thông tin!");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className='row'>
          <div className='card mb-5 p-5 pt-0 me-3'>
            <>
              <p className='list-unstyled text-gray-700 fw-bold fs-3'>{`Tên ${props.title}`}</p>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.code && 'border-danger'}`}>
                      Mã khu vực
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
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.name && 'border-danger'}`}>
                      Tên khu vực
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
             
            </>
          </div>
        </div>
        <div className='row'>
          <div className='col justify-content-end d-flex'>
            <div>
              <Button type="submit" className="btn btn-primary">{`${dataModalRegion.id ? "Cập nhật" : "Tạo mới"} ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddRegion

