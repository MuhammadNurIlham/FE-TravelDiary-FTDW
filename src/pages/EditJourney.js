import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/API';
import { Form } from 'react-bootstrap';
import NavbarAfterLogin from '../components/NavbarAfterLogin';


function EditJourney() {
    const { id } = useParams();
    let navigate = useNavigate();

    const [journeyId, setJourneyId] = useState([]);
    const [preview, setPreview] = useState([]);
    const [form, setForm] = useState({
        image: "",
        title: "",
        description: "",
    });

    let { data: journey, refetch: refetchYuk } = useQuery(["editJourneyCache"], async () => {
        const response = await API.get('/journey' + id);
        return response.data.data
    });

    useEffect(() => {
        if (journey) {
            setPreview(journey.image);
            setForm({
                ...form,
                title: journey.title,
                description: journey.description,
            });
        }
        refetchYuk();
    }, [journey])

    const handleOnChange = async (e) => {
        setForm({
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new formData();
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
            }
            formData.set("title", form.title);
            formData.set("description", form.description)

            const response = await API.patch('/journey/' + journey.id, formData);
            console.log("this response update journey", response);

            refetchYuk();
            navigate('/Profile')
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div>
            <NavbarAfterLogin />
            <div className='container py-5'>
                <div>
                    <h3 className='title py-3 text-dark'>Edit Journey</h3>
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
                            <input
                                className="form-control px-2 py-3"
                                id="exampleFormControlInput1"
                                type="text"
                                placeholder="Title"
                                name='title'
                                value={form?.title}
                                onChange={handleOnChange}>
                            </input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="input-group mb-3">
                                <input
                                    className="form-control"
                                    id="inputGroupFile02"
                                    type="file"
                                    name='image'
                                    onChange={handleOnChange} />
                                {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col mb-3'>
                            <textarea
                                className="form-control px-2 py-3"
                                id="exampleFormControlInput1"
                                placeholder="Description"
                                type="textarea"
                                name='description'
                                value={form?.description}
                                onChange={handleOnChange}
                                style={{
                                    height: "200px"
                                }}></textarea>
                        </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end py-3">
                        <button className="btn btn-primary btn-edit py-1 fs-5" type="submit">
                            Update Journey
                        </button>
                    </div>
                </Form>
            </div >
        </div >
    )
}

export default EditJourney;