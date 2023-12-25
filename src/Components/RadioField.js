import React, { useState, useEffect } from 'react'
import { useFormContext } from '../Context/FormContext';
import { Tabs, Tab } from 'react-bootstrap'

export default function RadioField(props) {
    const schema = props.schema;
    const { formData, updateFormData } = useFormContext();
    const [selectedTab, setSelectedTab] = useState(schema.validate.defaultValue)
    useEffect(() => {
        dataInitiator();
    }, []);
    const dataInitiator = () => {
        updateFormData(schema.jsonKey, schema.validate.defaultValue);
    }
    const selectHandeler = (key) => {
        if (props.onTabChange) {
            if (formData["TabData"] !== undefined) {
                delete formData[selectedTab];
            }
            props.onTabChange(key);
        }
        setSelectedTab(key);
        updateFormData(schema.jsonKey, key);
    }

    return (
        <>
            <Tabs activeKey={selectedTab} onSelect={selectHandeler} id="uncontrolled-tab-example" className="mb-3" key={schema.sort}>
                {schema.validate && schema.validate.options.map((option) => {
                    return (
                        <Tab eventKey={option.value} title={option.label} key={option.value}></Tab>
                    )
                }
                )}
            </Tabs>
            <br />
        </>
    )
}
