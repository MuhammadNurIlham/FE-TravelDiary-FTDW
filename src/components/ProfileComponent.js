import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { UserContext } from '../context/UserContext';
import { API } from '../config/API';


import julian from '../assets/julian.jpg';

function ProfileComponent() {
    const [state, dispatch] = useContext(UserContext);
    let { data: journeys, refetch } = useQuery("journeysCache", async () => {
        const response = await API.get("/journeys");
        const responseProfile = response.data.data.filter((resP) => resP.user.id == state.user.id);
        return responseProfile;
    });
    console.log(journeys);

    useEffect(() => {
        refetch();
    }, [state])


    return (
        <div className='container'>
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
        </div >
    )
}

export default ProfileComponent