import React from 'react';
import styled from 'styled-components';
import {Form, InputNumber, Slider} from "antd";

interface IOptions {
    value: number
    label: string
    key: string
    col?: number
    slider?: any
}

interface IFormFieldsProps {
    options: IOptions[]
}

const FormFields = ({options}: IFormFieldsProps) => {
    return (
        <NumberFieldsStyled className="row">
            {options.map(({label, value, key, col, slider}, idx) =>
                <div key={key} className={`col-${col || 6}`}>
                    <Form.Item
                        name={key}
                        label={label}
                        initialValue={value}
                    >
                        {slider ? <Slider {...slider}/> : <InputNumber />}
                    </Form.Item>
                </div>
            )}
        </NumberFieldsStyled>
    )
};

const NumberFieldsStyled = styled.div`
`

export default (FormFields);
