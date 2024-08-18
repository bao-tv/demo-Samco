import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

type Props = {
    lable?: string,
    placeholder?: string,
    type?: string,
    handleClick?: any,
}

const SearchData = (props: Props) => {
    const [text, setText] = useState<string>('')
    // console.log('bao text: ', text)
  return (
    <Form>
      <Form.Group className="d-flex">
        {props.lable && <Form.Label>{props.lable}</Form.Label>}
        <Form.Control onChange={(e: any) => setText(e?.target?.value)} className='p-2' type={props.type} placeholder={props.placeholder} />
        <Button variant="outline-secondary" className='p-2' onClick={() => props.handleClick(text)}><i className="bi bi-search fs-3"></i></Button>
      </Form.Group>
    </Form>
  )
}

export default SearchData