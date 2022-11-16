import React from 'react';
import Empty from '../assets/empty.png'

function Blank() {
    return (
        <div className='container'>
            <div className="row align-items-center">
                <div className="col pt-5">
                    {/* <img className='img-fluid align-items-center' src={Empty} alt='' /> */}
                    <p className='text-center fw-bold fs-2'>No Data to Display</p>
                    <img
                        src={Empty}
                        className="mx-auto d-block"
                        alt="..." />
                </div>
            </div>
        </div>
    )
}

export default Blank