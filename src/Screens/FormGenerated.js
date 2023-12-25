import React, { useState } from 'react'
import { Button, Modal, Toast } from 'react-bootstrap';
import GroupType from '../Components/GroupType';
import InputField from '../Components/InputField';
import SelectField from '../Components/SelectField';
import SwitchField from '../Components/SwitchField';
import { useFormContext } from '../Context/FormContext';
import RadioField from '../Components/RadioField';

export default function FormGenerated(props) {
  const jsonArray = props.schema;
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { formData } = useFormContext();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleShowToast = () => setShowToast(!showToast);
  const submitHandeler = (e) => {
    e.preventDefault();
    console.log(formData);
    const isValid = jsonArray.every((field) => {
      if (field.validate && field.validate.required && field.uiType !== 'Group') {
        return formData[field.jsonKey] !== undefined && formData[field.jsonKey] !== "";
      }
      return true;
    })
    if (isValid) {
      handleShow();
    }
    else {
      toggleShowToast();
    }
  }
  const toast = () => {
    return (
      <>
        <Toast show={showToast} onClose={toggleShowToast} bg='dark' style={{ position: "fixed", top: 20, right: 20, zIndex: 100 }} delay={2000} autohide>
          <Toast.Body className='text-white'>Please Enter all required fields</Toast.Body>
        </Toast>
      </>
    )
  }
  const displayFormData = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>{
            Object.entries(formData).map(([key, value]) => {
              return (
                <p key={key}>
                  <strong>{key}: </strong>
                  {JSON.stringify(value, null, 2)}
                </p>
              )
            })
          }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }



  return (
    <>
      {jsonArray.map((data, index) => {
        return (
          <>
            {
              data.uiType === 'Input' && (
                <InputField schema={data} key={index} />
              )
            }
            {
              data.uiType === 'Select' && (
                <SelectField schema={data} key={index} />
              )
            }
            {
              data.uiType === 'Switch' && (
                <SwitchField schema={data} key={index} />
              )
            }
            {
              data.uiType === 'Radio' && (
                <RadioField schema={data} key={index} />
              )
            }
            {
              data.uiType === 'Group' && (
                <GroupType uiSchema={data} key={index} />
              )
            }
          </>
        )
      }
      )}
      <div className="d-flex justify-content-center">
        <Button type="submit" onClick={submitHandeler}>Submit Form</Button>
      </div>
      {
        displayFormData(formData)
      }
      {
        toast()
      }
    </>
  )
}
