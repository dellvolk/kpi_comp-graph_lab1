import React from 'react';
import styled from 'styled-components';
import {Form, InputNumber} from "antd";

interface IOptions {
    value: number
    label: string
    key: string
    col?: number
}

interface INumberFieldsProps {
    options: IOptions[]
}

const NumberFields = ({options}: INumberFieldsProps) => {
    return (
        <NumberFieldsStyled className="row">
            {options.map(({label, value, key, col}, idx) =>
                <div key={key} className={`col-${col || 6}`}>
                    <Form.Item
                        name={key}
                        label={label}
                        initialValue={value}
                    >
                        <InputNumber />
                    </Form.Item>
                </div>
            )}
        </NumberFieldsStyled>
    )
};

const NumberFieldsStyled = styled.div`
`

export default (NumberFields);
