import React from 'react';
import styled from 'styled-components';
import {Collapse, Form} from "antd";
import NumberFields from "./FormFields";
import {stage as STAGE} from '../graphics/stage'

const stage = {...STAGE}

const {Panel} = Collapse

interface IFormMenuProps {
    onChange: (key: string, value: number) => void
}

const FormMenu = ({onChange}: IFormMenuProps) => {
    const [form] = Form.useForm()

    const options = [
        {
            active: true,
            title: 'Grid',
            options: [
                {label: 'px/cm', value: stage.px_per_sm, key: 'px_per_sm', col: 6},
                {label: 'W|H', value: stage.grid_width, key: 'grid_width', col: 6},
            ]
        },
        {
            active: true,
            title: 'Dimensions',
            options: [
                {label: 'D1', value: stage.figure.d1, key: 'figure.d1'},
                {label: 'D2', value: stage.figure.d2, key: 'figure.d2'},
                {label: 'R1', value: stage.figure.r1, key: 'figure.r1'},
                {label: 'R2', value: stage.figure.r2, key: 'figure.r2'},
                {label: 'D3', value: stage.figure.d3, key: 'figure.d3'},
                {label: 'D4', value: stage.figure.d4, key: 'figure.d4'},
                {label: 'R3', value: stage.figure.r3, key: 'figure.r3'},
                {label: 'R4', value: stage.figure.r4, key: 'figure.r4'},
            ]
        },
        {
            active: true,
            title: 'Shift',
            options: [
                {label: 'X', value: stage.shift.x, key: 'shift.x'},
                {label: 'Y', value: stage.shift.y, key: 'shift.y'},
            ]
        },
        {
            active: false,
            title: 'Rotation',
            options: [
                {label: 'X', value: stage.rotation.x, key: 'rotation.x'},
                {label: 'Y', value: stage.rotation.y, key: 'rotation.y'},
                {
                    label: 'Angle',
                    value: stage.rotation.angle,
                    key: 'rotation.angle',
                    col: 12,
                    slider: {
                        min: 0,
                        max: Math.PI * 2,
                        step: .02,
                        marks: {
                            0: 0,
                            [Math.PI/2]: 'PI/2',
                            [Math.PI]: 'PI',
                            [3*Math.PI/2]: '3PI/2',
                            [Math.PI * 2]: '2PI',
                        }
                    }
                },
            ]
        },
        {
            active: false,
            title: 'Affine',
            options: [
                {label: 'Xx', value: stage.affine.xx, key: 'affine.xx'},
                {label: 'Xy', value: stage.affine.xy, key: 'affine.xy'},
                {label: 'Yx', value: stage.affine.yx, key: 'affine.yx'},
                {label: 'Yy', value: stage.affine.yy, key: 'affine.yy'},
                {label: 'Ox', value: stage.affine.ox, key: 'affine.ox'},
                {label: 'Oy', value: stage.affine.oy, key: 'affine.oy'},
            ]
        },
        {
            active: false,
            title: 'Projective',
            className: 'projective-menu',
            options: [
                {label: 'Xx', value: stage.projective.xx, key: 'projective.xx', col: 4},
                {label: 'Xy', value: stage.projective.xy, key: 'projective.xy', col: 4},
                {label: 'wX', value: stage.projective.wx, key: 'projective.wx', col: 4},
                {label: 'Yx', value: stage.projective.yx, key: 'projective.yx', col: 4},
                {label: 'Yy', value: stage.projective.yy, key: 'projective.yy', col: 4},
                {label: 'wY', value: stage.projective.wy, key: 'projective.wy', col: 4},
                {label: 'Ox', value: stage.projective.ox, key: 'projective.ox', col: 4},
                {label: 'Oy', value: stage.projective.oy, key: 'projective.oy', col: 4},
                {label: 'wO', value: stage.projective.wo, key: 'projective.wo', col: 4},
            ]
        }
    ]

    const onFinish = (_: any, values: any) => {
        _.forEach((i:any) => {
            onChange(i.name[0], i.value)
        })
    };

    return (
        <FormMenuStyled
            form={form}
            name="menu"
            className="ant-advanced-search-form"
            onFieldsChange={onFinish}
            size="small"
        >
            <Collapse defaultActiveKey={options.filter(i => i.active).map(i => i.title)}>
                {options.map((i, idx) => (
                    <Panel header={i.title} showArrow={idx !== 0}  key={i.title} className={i.className || ''}>
                        <NumberFields options={i.options}/>
                    </Panel>
                ))}

                {/*<Panel header="This is panel header with no arrow icon" key="2">*/}
                {/*    <FormFields options={options} />*/}
                {/*</Panel>*/}
            </Collapse>
        </FormMenuStyled>
    )
};

const FormMenuStyled = styled(Form)`
    .projective-menu {
      .ant-input-number {
        max-width: 50px !important;
      }
    }
`

export default (FormMenu);
