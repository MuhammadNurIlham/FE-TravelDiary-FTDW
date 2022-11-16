import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../config/API';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import moment from "moment"
import { FaRegBookmark } from "react-icons/fa"
import Blank from '../atoms/Blank';
import Loading from '../atoms/Loading';
import { FaBookmark } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"

import image1 from '../assets/image1.png'

function CardJourney() {
    let navigate = useNavigate();
    const [search, setSearch] = useState("")

    const [state] = useContext(UserContext);
    const isLogin = state.isLogin;


    let { data: journeys, refetch: yukRefetch } = useQuery("journeysCache", async () => {
        const response = await API.get("/journeys");
        return response.data.data
    })

    const handleOnBookmark = async (e, journeyID) => {
        e.preventDefault();
        try {
            const response = await API.post("/bookmark", {
                journey_id: parseInt(journeyID),
                user_id: parseInt(state.user.id),
            });

            const response2 = await API.patch('/journey/' + journeyID, {
                "books": "true"
            })
            yukRefetch();
        } catch (error) {
            console.log("ini error di post bookmark", error)
        }
    }

    const handleDelete = async (e, journeyID) => {
        e.preventDefault();
        try {
            const response = await API.delete(`/bookmarks/${journeyID}`);
            console.log("ini response delete ygy", response);

            const response2 = await API.patch('/journey/' + journeyID, {
                "books": "false"
            })
            yukRefetch();
            console.log(response2)
            // navigate('/Bookmark')
        } catch (error) {
            console.log("waduh deletenya error", error);
        }
    };

    return (
        <div className='container'>
            <form className="d-flex pb-3" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Find Journey"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)} />
                <button className="btn btn-primary" type="submit">Search</button>
            </form>
            {journeys?.length !== 0 ? (
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {journeys?.filter((item) => {
                        return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search)
                    }).map((journey, index) => (
                        <div className="col pt-4" key={index}>
                            <div className="card h-100">
                                <img
                                    src={journey?.image}
                                    className="card-img-top"
                                    alt="..."
                                    style={{
                                        maxHeight: "50%",
                                        minHeight: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="card-body">
                                    {/* ==== isLogin for bookmark ==== */}
                                    {isLogin ? (
                                        <div className='d-flex pb-3'>
                                            <p className="card-text fw-bold">{journey.user.name}</p>
                                            {/* <span className='pe-1'><FaRegHeart /></span> */}
                                            {journey.books == "true" ? (
                                                <span className='pe-1 ms-auto cursor-pointer' onClick={(e) => {
                                                    Swal.fire({
                                                        title: 'Do you want to unbookmark this journey?',
                                                        showDenyButton: true,
                                                        confirmButtonText: 'Save',
                                                        denyButtonText: `Don't save`,
                                                    }).then((result) => {
                                                        /* Read more about isConfirmed, isDenied below */
                                                        if (result.isConfirmed) {
                                                            Swal.fire({
                                                                icon: "success",
                                                                title: "Success!",
                                                                showConfirmButton: true,
                                                                onClick: handleDelete(e, journey.id),
                                                            });
                                                        } else if (result.isDenied) {
                                                            Swal.fire('Journey are not saved', '', 'info')
                                                        }
                                                    })
                                                }}><FaBookmark /></span>
                                            ) : (
                                                <span className='pe-1 ms-auto cursor-pointer' onClick={(e) => {
                                                    Swal.fire({
                                                        title: 'Do you want to save this journey?',
                                                        showDenyButton: true,
                                                        confirmButtonText: 'Save',
                                                        denyButtonText: `Don't save`,
                                                    }).then((result) => {
                                                        /* Read more about isConfirmed, isDenied below */
                                                        if (result.isConfirmed) {
                                                            Swal.fire({
                                                                icon: "success",
                                                                title: "Success!",
                                                                showConfirmButton: true,
                                                                onClick: handleOnBookmark(e, journey.id),
                                                            });
                                                        } else if (result.isDenied) {
                                                            Swal.fire('Journey are not saved', '', 'info')
                                                        }
                                                    })
                                                }}><FaRegBookmark /></span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='d-flex pb-3'>
                                            {/* <span className='pe-1'><FaRegHeart /></span> */}
                                            <p className="card-text fw-bold">{journey.user.name}</p>
                                            <span className='pe-1 ms-auto cursor-pointer' onClick={(e) => {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Oops...',
                                                    text: 'Anda Belum Login, Silahkan Login!',
                                                })
                                            }}><FaRegBookmark /></span>
                                        </div>
                                    )}
                                    <h6 className="card-title cursor-pointer" onClick={() => { navigate(`/DetailJourney/${journey?.id}`) }} key={index}>{journey?.title.slice(0, 20)} ...</h6>
                                    <p
                                        className="text-muted"
                                        style={{ fontSize: "12px" }}
                                    >
                                        {moment(journey.created_at).format(
                                            "dddd, DD MMMM YYYY"
                                        )}
                                    </p>
                                    <p className="card-text cursor-pointer" onClick={() => { navigate(`/DetailJourney/${journey?.id}`) }} key={index}>{journey?.description.slice(0, 70)}... <span className='fw-bold text-primary'>Read more</span></p>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            ) : (<Blank />)
            }
        </div >
    )
}

export default CardJourney;