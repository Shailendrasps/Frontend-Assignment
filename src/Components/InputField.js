import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useFormContext } from '../Context/FormContext';

export default function InputField(props) {
    const { formData, updateFormData } = useFormContext();
    const [value,setValue] = useState("");
    const schema = props.schema;
    const tabData = props.tabData ? props.tabData : "";
    const changeHandeler = (event) => {
        setValue(event.target.value);
        if(tabData){
          formData[tabData][schema.jsonKey] = event.target.value;
        }else{
            updateFormData(schema.jsonKey,event.target.value);
        }
    }
    return (
        <>
            <Form.Group className="mb-3" key={schema.sort}>
                <Form.Label>
                    {schema.label}{schema.validate && schema.validate.required && (<span style={{ color: 'red' }}>*</span>)}
                </Form.Label>
                <hr/>
                <Form.Control type="text" placeholder={"Enter " + schema.label} disabled={schema.disable}  value={value} onChange={changeHandeler}/>
            </Form.Group>
            <br/>
        </>
    )
}
