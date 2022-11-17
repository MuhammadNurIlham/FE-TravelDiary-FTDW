import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { UserContext } from '../context/UserContext';
import { API } from '../config/API';
import Swal from 'sweetalert2';
import moment from "moment"
import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaTrashAlt } from "react-icons/fa"
import { FaRegEdit } from "react-icons/fa"


import julian from '../assets/julian.jpg';
import { useNavigate } from 'react-router-dom';

function ProfileComponent() {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    let { data: journeyProfile, refetch } = useQuery("journeyProfileCache", async () => {
        const response = await API.get("/journeys");
        const responseProfile = response.data.data.filter((resP) => resP.user.id == state.user.id);
        return responseProfile;
    });
    console.log(journeyProfile);

    useEffect(() => {
        refetch();
    }, [state])

    // ========= handle journey post bookmark ========== //
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
            refetch();
        } catch (error) {
            console.log("ini error di post bookmark", error)
        }
    }
    //  ============ handle journey delete bookmark ============ //
    const handleDelete = async (e, journeyID) => {
        e.preventDefault();
        try {
            const response = await API.delete(`/bookmarks/${journeyID}`);
            console.log("ini response delete ygy", response);

            const response2 = await API.patch('/journey/' + journeyID, {
                "books": "false"
            })
            refetch();
            console.log(response2)
            // navigate('/Bookmark')
        } catch (error) {
            console.log("waduh deletenya error", error);
        }
    };

    // ===== handle edit journey ====== \\
    const handleEdit = async (e, journeyID) => {
        e.preventDefault();
        try {
            const responseEdit = await API.patch('/journey/' + journeyID)
            console.log("ini response edit ygy", responseEdit)
            refetch();
        } catch (error) {
            console.log(error)
        }
    }

    // ===== handle delete journey ===== \\
    const handleDeleteJourney = async (e, journeyID) => {
        e.preventDefault();
        try {
            const responseDeleteJourney = await API.delete('/journey/' + journeyID)
            console.log("ini response delete journey ygy", responseDeleteJourney)

            // const response = await API.delete(`/bookmarks/${journeyID}`);
            // console.log("ini response delete ygy", response);
            refetch();

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <div>
                <h2 className='text-start py-4 heading-journey'>Profile</h2>
                <img
                    src={julian}
                    className="rounded-circle mx-auto d-block"
                    alt="..."
                    style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "cover",
                        marginBottom: "10px",
                    }} />
                <p className="profile-title text-center">{""}{state?.user?.name}{""}</p>
                <p className="profile-subtitle text-center">{state?.user?.email}</p>
                <hr></hr>
            </div>
            <hr></hr>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {journeyProfile?.map((journey, index) => (
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
                                <div className='d-flex pb-3'>
                                    <p className="card-text me-auto fw-bold">{journey.user.name}</p>
                                    {/* <span className='pe-1'><FaRegHeart /></span> */}
                                    {journey.books == "true" ? (
                                        <div>
                                            <span className='pe-1 ms-auto cursor-pointer'><FaRegEdit /></span>
                                            <span className='pe-1 cursor-pointer' onClick={(e) => {
                                                Swal.fire({
                                                    title: 'Are you sure you want to delete this journey?',
                                                    showDenyButton: true,
                                                    confirmButtonText: 'Delete',
                                                    denyButtonText: `Cancel`,
                                                }).then((result) => {
                                                    /* Read more about isConfirmed, isDenied below */
                                                    if (result.isConfirmed) {
                                                        Swal.fire({
                                                            icon: "success",
                                                            title: "Success!",
                                                            showConfirmButton: true,
                                                            onClick: handleDeleteJourney(e, journey.id),
                                                        });
                                                    } else if (result.isDenied) {
                                                        Swal.fire('Journey doesnt get deleted', '', 'info')
                                                    }
                                                })
                                            }}><FaTrashAlt /></span>
                                            <span className='pe-1 cursor-pointer' onClick={(e) => {
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
                                        </div>
                                    ) : (
                                        <div>
                                            <span className='pe-1 ms-auto cursor-pointer'><FaRegEdit /></span>
                                            <span className='pe-1 cursor-pointer' onClick={(e) => {
                                                Swal.fire({
                                                    title: 'Are you sure you want to delete this journey?',
                                                    showDenyButton: true,
                                                    confirmButtonText: 'Delete',
                                                    denyButtonText: `Cancel`,
                                                }).then((result) => {
                                                    /* Read more about isConfirmed, isDenied below */
                                                    if (result.isConfirmed) {
                                                        Swal.fire({
                                                            icon: "success",
                                                            title: "Success!",
                                                            showConfirmButton: true,
                                                            onClick: handleDeleteJourney(e, journey.id),
                                                        });
                                                    } else if (result.isDenied) {
                                                        Swal.fire('Journey doesnt get deleted', '', 'info')
                                                    }
                                                })
                                            }}><FaTrashAlt /></span>
                                            <span className='pe-1 cursor-pointer' onClick={(e) => {
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
                                        </div>
                                    )}
                                </div>
                                {/*  */}
                                <h6 className="card-title cursor-pointer"
                                    style={{ fontSize: "14px" }}
                                    onClick={() => { navigate(`/DetailJourney/${journey?.id}`) }}
                                    key={index}>{journey?.title.slice(0, 30)} ...</h6>
                                <p
                                    className="text-muted"
                                    style={{ fontSize: "11px" }}
                                >
                                    {moment(journey.created_at).format(
                                        "dddd, DD MMMM YYYY"
                                    )}
                                </p>
                                <p className="card-text cursor-pointer pb-4"
                                    style={{ fontSize: "12px" }}
                                    onClick={() => { navigate(`/DetailJourney/${journey?.id}`) }}
                                    key={index}>{journey?.description.slice(0, 40)}... <span className='fw-bold text-primary'>Read more</span></p>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        </div >
    )
}

export default ProfileComponent