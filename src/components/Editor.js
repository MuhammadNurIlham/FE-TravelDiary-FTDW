import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarAfterLogin from './NavbarAfterLogin';
import { API } from '../config/API';

function Editor() {
    let navigate = useNavigate();
    const [journeys, setJourneys] = useState([]);
    const [preview, setPreview] = useState(null); // set for image preview
    const [form, setForm] = useState({
        image: "",
        title: "",
        description: "",
    });

    const getJourneys = async () => {
        try {
            const response = await API.get('/journeys');
            setJourneys(response.data.data);
        } catch (error) {
            console.log('ini error get journey', error)
        }
    };

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        //create image preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    // const {id} = useParams();
    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("title", form.title);
            formData.set("description", form.description);

            const response = await API.post('/journey', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                },
            });
            navigate('/Home')
            // navigate(`journey/${id}`)
            console.log("ini response add journey", response);
        } catch (error) {
            console.log("ini response error add journey", error);
        }
    });

    useEffect(() => {
        getJourneys();
    }, []);


    return (
        <div>
            <NavbarAfterLogin />
            <div className='container py-5'>
                <div>
                    <h3 className='title py-3 text-dark'>Add Journey</h3>
                </div>
                <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                    {preview && (
                        <div>
                            <img
                                src={preview}
                                style={{
                                    maxWidth: "150px",
                                    maxHeight: "150px",
                                    objectFit: "cover",
                                    marginBottom: "10px",
                                }}
                                alt={preview}
                            />
                        </div>
                    )}
                    <div className='row'>
                        <div className='col mb-3'>
                            <input type="text" className="form-control px-2 py-3" id="exampleFormControlInput1" placeholder="Title" name='title' onChange={handleOnChange}></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="input-group mb-3">
                                <input type="file" name='image' className="form-control" id="inputGroupFile02" onChange={handleOnChange} />
                                <label className="input-group-text" for="inputGroupFile02">Upload</label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col mb-3'>
                            <textarea
                                type="textarea"
                                className="form-control px-2 py-3"
                                id="exampleFormControlInput1"
                                placeholder="Description"
                                name='description'
                                onChange={handleOnChange}
                                style={{
                                    height: "200px"
                                }}></textarea>
                        </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end py-3">
                        <button className="btn btn-primary btn-edit py-3 fs-5" type="submit">
                            Add Journey
                        </button>
                        {/* <Link to="/UserMenus" className="link">
                    </Link> */}
                    </div>
                </Form>
            </div >
        </div>
    )
}

export default Editor