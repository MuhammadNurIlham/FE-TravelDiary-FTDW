import React from 'react'
import Phuket from '../assets/Phuket.png'
import JumbotronTitle from '../atoms/JumbotronTitle'
import NavigationBar from './Navbar'

function Jumbotron() {
    return (
        <div className='banner' style={{ backgroundImage: `url(${Phuket})` }}>
            <NavigationBar />
            <JumbotronTitle />
        </div>
    )
}

export default Jumbotron;