import React from 'react'

function Loading() {
    return (
        <div className='container'>
            <div className="row align-items-center py-5">
                <p className='fw-bold fs-4 text-center'><strong>Silahkan Tunggu.. Load Data from Database</strong></p>
                <div className='col'>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Loading