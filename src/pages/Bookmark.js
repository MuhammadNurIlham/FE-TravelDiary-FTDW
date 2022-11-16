import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CardJourney from '../components/CardJourney'
import NavbarAfterLogin from '../components/NavbarAfterLogin';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import { API } from "../config/API";
import moment from "moment"
import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"

function Bookmark() {
    const [state] = useContext(UserContext);
    console.log("ini state profile bookmark yak ges yak", state.user)
    const isLogin = state.isLogin;

    let navigate = useNavigate();
    let { data: bookmarks, refetch: yukRefetch } = useQuery(
        "bookmarksCache", async () => {
            const response = await API.get("/bookmarks");
            console.log("ini response get bookmark ygy", response)
            const resultResponse = response.data.data
            console.log("ini resultResponse uhuyy", bookmarks)

            const resultFilter = resultResponse.filter(
                (data) => data.user.id === state.user.id
            );
            console.log("resulFilter weyy", resultFilter);
            return resultFilter
        }
    );
    console.log("ini isi bookmark : ", bookmarks)

    const handleDelete = async (e, bookmarkId, journeyID) => {
        e.preventDefault();
        try {
            console.log("mau delete yg ini ygy", state.user.id);

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            };
            console.log("mau cek data", bookmarkId, state.user.id);

            const response = await API.delete(`/bookmark/${bookmarkId}`, config);
            const response2 = await API.patch('/journey/' + journeyID, {
                "books": "false"
            })
            console.log("ini response delete ygy", response2);
            yukRefetch();
            navigate('/Bookmark')
        } catch (error) {
            console.log("waduh deletenya error", error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            Swal.fire({
                icon: "error",
                title: "Heyyoo!",
                text: "You have to login first~",
            });
            navigate("/")
        }
    }, []);



    return (
        <div>
            <NavbarAfterLogin />
            <div className='container'>
                <h2 className='text-start py-4 heading-journey'>Bookmark</h2>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {bookmarks?.map((bookmark, index) => {
                        return (
                            <div className="col pt-4" key={index}>
                                <div className="card h-100">
                                    <img src={"http://localhost:5000/uploads/" + bookmark?.journey.image}
                                        className="card-img-top"
                                        alt="..."
                                        style={{
                                            maxHeight: "50%",
                                            minHeight: "50%",
                                            objectFit: "cover",
                                        }} />
                                    <div className="card-body">
                                        {isLogin ? (
                                            <div className='d-flex pb-3 ms-auto'>
                                                {/* <span className='pe-1'><FaRegHeart /></span> */}
                                                <p className="card-text fw-bold">{bookmark.journey.user.name}</p>
                                                <span className='pe-1 ms-auto cursor-pointer' onClick={(e) => {
                                                    Swal.fire({
                                                        title: 'Do you want to delete this journey from bookmark?',
                                                        showDenyButton: true,
                                                        confirmButtonText: 'Delete',
                                                        denyButtonText: `Cancel`,
                                                    }).then((result) => {
                                                        /* Read more about isConfirmed, isDenied below */
                                                        if (result.isConfirmed) {
                                                            Swal.fire({
                                                                icon: "success",
                                                                title: "Delete Success!",
                                                                showConfirmButton: true,
                                                                onClick: handleDelete(e, bookmark.id, bookmark.journey_id),
                                                            });
                                                        } else if (result.isDenied) {
                                                            Swal.fire('Journey are not delete', '', 'info')
                                                        }
                                                    })
                                                }}><FaBookmark /></span>
                                                {/* <Link to="/Bookmark">
                                        </Link> */}
                                                {/* <span className='pe-1'><FaHeart /></span>
                                        <span><FaBookmark /></span> */}
                                            </div>
                                        ) : (
                                            <div className='d-flex pb-3'>
                                                {/* <span className='pe-1'><FaRegHeart /></span> */}
                                                <span className='pe-1' onClick={(e) => {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Anda Belum Login, Silahkan Login!',
                                                    })
                                                }}><FaBookmark /></span>
                                                {/* <Link to="/Bookmark">
                                        </Link> */}
                                                {/* <span className='pe-1'><FaHeart /></span>
                                        <span><FaBookmark /></span> */}
                                            </div>
                                        )}
                                        <h6 className="card-title cursor-pointer" onClick={() => { navigate(`/DetailJourney/${bookmark.journey.id}`) }} key={index}>{bookmark.journey.title.slice(0, 20)} ..</h6>
                                        <p
                                            className="text-muted"
                                            style={{ fontSize: "12px" }}
                                        >
                                            {moment(bookmark.journey.created_at).format(
                                                "dddd, DD MMMM YYYY"
                                            )}
                                        </p>
                                        {/* <div className='d-flex'>
                                    </div> */}
                                        <p className="card-text text-justify cursor-pointer" onClick={() => { navigate(`/DetailJourney/${bookmark.journey.id}`) }} key={index}>{bookmark.journey.description.slice(0, 120)} ...</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default Bookmark;