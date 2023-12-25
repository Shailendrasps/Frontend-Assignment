import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useFormContext } from '../Context/FormContext';

export default function SelectField(props) {
    const schema = props.schema;
    const [value, setValue] = useState(schema.validate.defaultValue);
    const { formData, updateFormData } = useFormContext();

    const tabData = props.tabData ? props.tabData : "";

    useEffect(() => {
        dataInitiator();
    }, [])

    const dataInitiator = () => {
        if (tabData !== "") {
            formData[tabData] = {};
            formData[tabData][schema.jsonKey] = schema.validate.defaultValue;
        }
        else {
            updateFormData(schema.jsonKey, schema.validate.defaultValue);
        }
    }

    const changeHandeler = (event) => {
        setValue(event.target.value);
        if (tabData !== "") {
            if (formData[tabData] === undefined) {
                formData[tabData] = {};
            }
            formData[tabData][schema.jsonKey] = event.target.value;
        } else {
            updateFormData(schema.jsonKey, event.target.value);
        }
    }
    return (
        <>
            <Form.Group className="mb-3" key={schema.sort}>
                <Form.Label>
                    {schema.label}{schema.validate && schema.validate.required && (<span style={{ color: 'red' }}>*</span>)}
                </Form.Label>
                <hr />
                <Form.Select value={value} onChange={changeHandeler}>
                    {schema.validate && schema.validate.options && schema.validate.options.map((option) => {
                        return (
                            <option value={option.value} key={option.value}>{option.label}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <br />
        </>
    )
}
