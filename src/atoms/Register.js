import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../config/API'
import { Alert, Button, Form, Modal } from 'react-bootstrap';

function Register({ show, setShow, setShowLogin }) {
    // const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const { name, email, password, phone, address } = form;

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const response = await API.post("/register", form);
            const alert = (
                <Alert variant="success">Berhasil mendaftarkan akun!</Alert>
            );
            setMessage(alert);
            console.log("ini response submit register", response)
        } catch (e) {
            console.log(e);
            const alert = (
                <Alert variant="danger">Oopss!! Gagal mendaftarkan akun!</Alert>
            );
            setMessage(alert);
        }
    })

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                name='name'
                                type='text'
                                placeholder='FullName'
                                autoFocus
                                value={name}
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                autoFocus
                                value={email}
                                name="email"
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                value={phone}
                                name="phone"
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                value={address}
                                name="address"
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <input className='input-button bg-primary' type={"submit"} value={"Register"} variant="dark" size="md" onClick={() => {
                                setShow(false);
                                setShowLogin(true);
                            }} />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <p>Don't have an account ? Klik <span className='fw-bold cursor-pointer log-reg'
                        onClick={() => {
                            setShow(false);
                            setShowLogin(true);
                        }}
                    >Here</span></p>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// render(<Example />);
export default Register;