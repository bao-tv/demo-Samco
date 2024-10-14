import React from 'react'
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

type Props = {
  dataPagination?: any
  setDataSearch?: any
  handlegGetDataTranfToWarehouse?: any
  handlegGetDataTranfMoneySelected?: any
}

const Pagination = (props: Props) => {
  const changePage = (number: number) => {
    props?.setDataSearch((prevState: any) => ({
      ...prevState,
      page: prevState.page + number,
    }))
  }

  const toPage = (number: number) => {
    props?.setDataSearch((prevState: any) => ({
      ...prevState,
      page: number,
    }))
  }

  const changePageSize = (number: any) => {
    props?.setDataSearch((prevState: any) => ({
      ...prevState,
      pageSize: number,
      page: 0,
    }))
  }
  const pageSizeArray: number[] = [20, 50, 100]
  return (
    props?.dataPagination?.size && (
      <div className={`d-flex ${props?.handlegGetDataTranfToWarehouse ? 'justify-content-between' : 'justify-content-end'} mt-2 fs-5`}>
        <div className='d-flex'>
          {props?.handlegGetDataTranfToWarehouse && <>
            <div>
              <Button onClick={props?.handlegGetDataTranfToWarehouse}>Phiếu Nhập Kho</Button>
            </div>
          </>
          }
          {props?.handlegGetDataTranfToWarehouse && <>
            <div className='ms-2'>
              <Button onClick={props?.handlegGetDataTranfMoneySelected}>Bảng kê thu tiền</Button>
            </div>
          </>
          }
        </div>
        <div className='d-flex text-dark align-items-center'>
          <div className='me-5 mb-0 d-flex align-items-center'>
            <p className='mb-0 text-nowrap me-3'>Kích thước trang: </p>
            <Form.Select onChange={(e) => {
                // console.log('bao e, ', e.currentTarget.value)
                changePageSize(e.currentTarget.value)
            }
            }>
                {pageSizeArray.map((item, index) => <option key={index} value={item}>{item}</option>)}
            </Form.Select>
          </div>
          <div className='ms-5 me-5 mb-0 d-flex'>
            <p className='mb-0 text-center fw-bold' style={{width: '50px'}}>
              {props?.dataPagination?.pageable.pageNumber * props?.dataPagination?.size + 1}
            </p>
            đến
            <p className='mb-0 text-center fw-bold' style={{width: '50px'}}>
              {(props?.dataPagination?.size * (props?.dataPagination?.pageable.pageNumber + 1)) > props?.dataPagination?.totalElements ? props?.dataPagination?.totalElements : (props?.dataPagination?.size * (props?.dataPagination?.pageable.pageNumber + 1))}
            </p>
            của
            <p className='mb-0 text-center fw-bold' style={{width: '50px'}}>
              {props?.dataPagination?.totalElements}
            </p>
          </div>
          <div className='d-flex ms-5 align-items-center'>
            <Button variant='outline-secondary' onClick={() => toPage(0)} className='me-1 p-1'>
              <i className='bi bi-chevron-bar-left text-dark fs-3'></i>
            </Button>
            <Button
              variant='outline-secondary'
              onClick={() => changePage(-1)}
              className='me-3 p-1'
              disabled={props?.dataPagination?.pageable.pageNumber == 0}
            >
              <i
                className={`bi bi-chevron-left ${
                  props?.dataPagination?.pageable.pageNumber == 0 ? 'text-black-50' : 'text-dark'
                } fs-3`}
              ></i>
            </Button>
            <div className='ms-3 me-3 mb-0 d-flex'>
              Trang
              <p className='mb-0 text-center fw-bold' style={{width: '32px'}}>
                {props?.dataPagination?.pageable.pageNumber + 1}
              </p>
              của
              <p className='mb-0 text-center fw-bold' style={{width: '32px'}}>
                {props?.dataPagination?.totalPages}
              </p>
            </div>
            {/* <p className='mb-0'>Trang {props?.dataPagination?.pageable.pageNumber + 1} đến {props?.dataPagination?.totalPages}</p> */}
            <Button
              variant='outline-secondary'
              onClick={() => changePage(1)}
              className='me-1 ms-3 p-1'
              disabled={
                props?.dataPagination?.pageable.pageNumber == props?.dataPagination?.totalPages - 1
              }
            >
              <i
                className={`bi bi-chevron-right ${
                  props?.dataPagination?.pageable.pageNumber ==
                  props?.dataPagination?.totalPages - 1
                    ? 'text-black-50'
                    : 'text-dark'
                } fs-3`}
              ></i>
            </Button>
            <Button
              variant='outline-secondary'
              onClick={() => toPage(props?.dataPagination?.totalPages - 1)}
              className='p-1'
            >
              <i className='bi bi-chevron-bar-right text-dark fs-3'></i>
            </Button>
          </div>
        </div>
      </div>
    )
  )
}

export default Pagination
