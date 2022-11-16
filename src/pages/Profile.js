import React from 'react'
import CardJourney from '../components/CardJourney'
import NavbarAfterLogin from '../components/NavbarAfterLogin'
import ProfileComponent from '../components/ProfileComponent'

function Profile() {
    return (
        <div>
            <NavbarAfterLogin />
            <ProfileComponent />
            <CardJourney />
        </div>
    )
}

export default Profile