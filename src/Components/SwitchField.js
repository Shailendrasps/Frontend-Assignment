import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useFormContext } from '../Context/FormContext';

export default function SwitchField(props) {
    const schema = props.schema;
    const tabData = props.tabData ? props.tabData : "";
    const { formData, updateFormData } = useFormContext();
    const [value, setValue] = useState(false);
    useEffect(() => {
        dataInitiator();
    }, [])

    const dataInitiator = () => {
        if (tabData !== "") {
            formData[tabData] = {};
            formData[tabData][schema.jsonKey] = false;
        }
        else {
            updateFormData(schema.jsonKey, false);
        }
    }

    const changeHandeler = () => {
        setValue(!value);
        if (tabData) {
            formData[tabData][schema.jsonKey] = !value;
        } else {
            updateFormData(schema.jsonKey, !value);
        }
    }
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    id="custom-switch"
                    label={schema.label}
                    value={value}
                    onChange={changeHandeler}
                />
            </Form.Group>
            <br />
        </>
    )
}
