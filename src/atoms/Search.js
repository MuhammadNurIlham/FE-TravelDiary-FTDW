import React from 'react'

function Search() {
    return (
        <div className='container'>
            <h2 className='text-start py-4 heading-journey'>Journey</h2>
            <form className="d-flex pb-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Find Journey" aria-label="Search" />
                <button className="btn btn-primary" type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search