import React, { useState, useContext } from 'react';
import { Button, Form, Alert, Modal } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../config/API';

function Login({ show, setShow, setShowRegister }) {
    // const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    //state from userContext
    const [state, dispatch] = useContext(UserContext)

    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // take data input base on event change realtime
    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    console.log(form);

    const navigate = useNavigate();

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const data = await API.post('/login', form);
            const alert = <Alert variant='success'>Login Berhasil!</Alert>
            setMessage(alert);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: data.data.data
            });
            console.log("ini response statenya", state)

            // let payload = data.data.data;
            // if (payload.email === "email") {
            //     navigate('/Home')
            // } else {
            //     navigate('/');
            // }
            handleClose()
            navigate('/Home')
            // console.log("ini response payloadnya", payload);
            // console.log("ini response datanya", data);
        } catch (e) {
            console.log(e)
            const alert = <div className="alert alert-danger" role="alert">
                Login Gagal!
            </div>
            setMessage(alert)
        }
    });



    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name='email'
                                type='email'
                                placeholder='Email'
                                autoFocus
                                value={form.email}
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <div className='d-grid gap-2'>
                            <Button variant="primary" type="submit" value={"Login"}>
                                Login
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <p>Don't have an account ? Klik <span className='fw-bold cursor-pointer log-reg'
                        onClick={() => {
                            setShow(false);
                            setShowRegister(true);
                        }}
                    >Here</span></p>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// render(<Example />);
export default Login;