import { useState } from 'react';
import FormGenerated from './FormGenerated'
import { Container, Row, Col, Form, Toast, Button } from 'react-bootstrap'
import { useFormContext } from '../Context/FormContext';

export default function Home() {
    let [jsonSchema, setJsonSchema] = useState([]);
    let [inputData, setInputData] = useState("");
    const [showToast, setShowToast] = useState(false);
    const { resetFormData } = useFormContext();
    const toggleShowToast = () => setShowToast(!showToast);
    const inputHandeler = (event) => {
        setInputData(event.target.value);
        try {
            const data = JSON.parse(event.target.value);
            if (Array.isArray(data)) {
                setJsonSchema(data);
                console.log(data);
            } else {
                toggleShowToast()
            }
        } catch (error) {
            toggleShowToast()
        }
    }

    const resetHandeler = () => {
        setInputData("");
        setJsonSchema([]);
        resetFormData();
    }
    const textareaStyle = {
        height: "calc(100vh - 100px)",
        resize: "none",
    };

    const formStyle = {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "15px",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
    };

    return (
        <div >
            <Container fluid style={{ marginTop: "1%", marginBottom: "1%" }}>
                <h1>
                    Form Maker
                </h1>
            </Container>
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" style={textareaStyle} value={inputData} onChange={inputHandeler} placeholder='Enter UI Schema to generate form' />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={6}>{jsonSchema.length > 0 && (
                        <Form style={formStyle}>
                            <FormGenerated schema={jsonSchema} />
                            <div className="d-flex justify-content-center mt-3 mb-3"> 
                                <Button type="primary" onClick={resetHandeler}>Reset Form</Button>
                            </div>
                        </Form>
                    )}
                    </Col>
                </Row>
            </Container>
            <Toast show={showToast} bg='danger' onClose={toggleShowToast} style={{ position: "fixed", top: 20, right: 20, zIndex: 100 }} delay={2000} autohide>
                <Toast.Body className='text-white'>Invalid Data!</Toast.Body>
            </Toast>
        </div>
    )
}
