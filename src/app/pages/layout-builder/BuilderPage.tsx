/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import {InputGroup, Button, Form } from 'react-bootstrap';
import SendAndRecipe from './components/SendAndRecipe';
import Package from './components/Package';
import Cost from './components/Cost';
import { IFormInput } from './interface';
import { usePageData } from '../../../_metronic/layout/core';

const BuilderPage: React.FC<any> = ({handleClose}: any) => {
  const {setRowDataOrder} = usePageData();
  const [totalPay, setTotalPay] = useState<number>(0);
  const send = {
    header: 'Người gửi',
    inputGroup: {
      name: 'sendName',
      idPer: 'sendIdPer',
      phone:'sendPhone',
      address: 'sendAddress'
    }
  }
  const receipt = {
    header: 'Người nhận',
    inputGroup: {
      name: 'receiptName',
      idPer: 'receiptIdPer',
      phone:'receiptPhone',
      address: 'receiptAddress'
    }
  }

  const { control, watch, setValue, handleSubmit, formState: { errors }, } = useForm<IFormInput>({
    mode: 'all',
    defaultValues: { 
      sendName: '',
      sendIdPer: '',
      sendPhone: '',
      sendAddress: '',
      receiptName: '',
      receiptIdPer: '',
      receiptPhone: '',
      receiptAddress: '',
      packageName: '',
      packageValue: '',
      packageWeight: '',
      packageQuantity: '',
      shipName: '',
      price: 0,
      coefficient: 0,
      packagingServicePrice: 0,
      totalPrice: 0,
      sendPay: 0,
      receiptPay: 0,
     },
     shouldUnregister: false,
    })
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    setRowDataOrder && setRowDataOrder((prevRowData: any) => [...prevRowData, data]);
  }

  const priceValue: any = watch(["price", "packagingServicePrice"]);
  useEffect(() => {
    const value0 = priceValue[0] || 0;
    const value1 = priceValue[1] || 0;
    setTotalPay(+value0 + +value1);
    setValue("totalPrice", +value0 + +value1);
  },[priceValue])
  
  const sendPayValue = watch("sendPay");

  const [receiptPayValue, setRecipePayValue] = useState<number>(0);
  useEffect(() => {
    const value = sendPayValue || 0;
    setRecipePayValue(+totalPay - +value);
  },[priceValue, sendPayValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <div className='group card mb-5 p-5 pt-0 me-3'>
          <SendAndRecipe data={send} control={control}/>
        </div>
        <div className='group card mb-5 p-5 pt-0 ms-3'>
          <SendAndRecipe data={receipt} control={control}/>
        </div>
        <div className='group card mb-5 p-5 me-3'>
          <Package control={control}/>
        </div>
        <div className='group card mb-5 p-5 ms-3'>
          <Cost totalPay={totalPay} control={control}/>
        </div>
        <div className='group card p-5 me-3'>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="">
                <InputGroup.Text className='group-select'>
                  Người gửi thanh toán
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name='sendPay'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
            )}
            name="sendPay"
          />
        </div>
        <div className='group card p-5 ms-3'>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="">
                <InputGroup.Text className='group-select'>
                  Phải thu người nhận
                </InputGroup.Text>
                <Form.Control
                  disabled={true}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name='sendPay'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={receiptPayValue}
                />
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
              )}
            name="receiptPay"
          />
        </div>
      </div>
      <div className='row mt-6'>
        <div className='col justify-content-end d-flex'>
          <Button href="#" className="btn btn-secondary me-10" onClick={() => console.log('bao reset')}>Reset</Button>
          <Button type="submit" className="btn btn-primary" onClick={()=> handleClose()}>Add</Button>
        </div>
      </div>
    </form>
  )
}

export {BuilderPage}
