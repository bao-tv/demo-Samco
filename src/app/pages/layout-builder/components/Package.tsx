import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from 'react-select';
import { Controller } from "react-hook-form";

const Package = ({control}: any) => {
    const options = [
        { value: 'option 1', label: 'Samco' },
        { value: 'option 2', label: 'Phương Trang' },
        { value: 'option 3', label: 'Thành Bưởi' },
        { value: 'option 4', label: 'Bus Line' },
        { value: 'option 5', label: 'Vận chuyển siêu tốc' },
    ]
    return (
        <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>Bưu kiện</p>
            <InputGroup className="mb-3">
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <InputGroup className="">
                        <InputGroup.Text className='group-text'>
                        Tên hàng
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
                    name='packageName'
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Controller
                    name="packageValue"
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <InputGroup className="">
                        <InputGroup.Text className='group-text'>
                        Trị giá
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
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Controller
                    name="packageWeight"
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <InputGroup className="">
                        <InputGroup.Text className='group-text'>
                        Trọng lượng
                        </InputGroup.Text>
                        <Form.Control
                            type='number'
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                        />
                        <InputGroup.Text>KG</InputGroup.Text>
                    </InputGroup>
                    )}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Controller
                    name="packageQuantity"
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <InputGroup className="">
                        <InputGroup.Text className='group-text'>
                            Số kiện
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
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Controller
                    name="shipName"
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <div className='d-flex align-items-center w-100'>
                        <label className='form-label d-block me-5'>Đơn vị vận chuyển</label>
                        <Select 
                            className='react-select-styled w-50' 
                            classNamePrefix='react-select' 
                            options={options} 
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            placeholder='Chọn một đơn vị vận chuyển' 
                        />
                        </div>
                    )}
                />
            </InputGroup>
        </>
    )
}

export default Package