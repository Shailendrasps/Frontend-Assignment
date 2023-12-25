import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import InputField from './InputField';
import SelectField from './SelectField';
import SwitchField from './SwitchField';
import RadioField from './RadioField';

export default function GroupType(props) {
    const uiSchema = props.uiSchema;
    const [selectedTab, setSelectedTab] = useState(uiSchema.subParameters[0].validate.defaultValue);
    const selectHandeler = (key) => {
        setSelectedTab(key);
    }

    return (
        <div>
            <Form.Group key={uiSchema.sort}>
                <Form.Label>
                    {uiSchema.label}{uiSchema.validate && uiSchema.validate.required && (<span style={{ color: 'red' }}>*</span>)}
                </Form.Label>
                <hr />
                {uiSchema && uiSchema.subParameters.length > 0 && uiSchema.subParameters.map((schema, index) => {
                    return (
                        <>
                            {
                                schema.uiType === 'Input' && (
                                    <InputField schema={schema} key={index}/>
                                )
                            }
                            {
                                schema.uiType === 'Select' && (
                                    <SelectField schema={schema} key={index} />
                                )
                            }
                            {
                                schema.uiType === 'Switch' && (
                                    <SwitchField schema={schema} key={index}/>
                                )
                            }
                            {
                                schema.uiType === 'Radio' && (
                                    <RadioField schema={schema} onTabChange={selectHandeler} key={index}/>
                                )
                            }
                            {
                                schema.uiType === 'Ignore' && schema.conditions.some((condition) => condition.value === selectedTab) &&
                                schema.subParameters.map((subSchema,index) => {
                                    return (
                                        <>

                                            {
                                                subSchema.uiType === 'Select' && (
                                                    <SelectField schema={subSchema} tabData="TabData" key={index}/>
                                                )
                                            }
                                            {
                                                subSchema.uiType === 'Input' && (
                                                    <InputField schema={subSchema} tabData="TabData" key={index}/>

                                                )
                                            }
                                            {
                                                subSchema.uiType === 'Switch' && (
                                                    <SwitchField schema={subSchema} tabData="TabData" key={index}/>
                                                )
                                            }
                                        </>
                                    )
                                })


                            }
                        </>
                    )
                })}
            </Form.Group>
        </div>
    )
}
