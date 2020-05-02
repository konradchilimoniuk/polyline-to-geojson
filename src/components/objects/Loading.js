import React from 'react'
import loadingAnimation from '../../images/loading-animation.svg'

function Loading(props) {
    return (
        <div className="loading">
            <img src={loadingAnimation} alt="Loading animation" />
            Please wait...
        </div>
    )
}

export default Loading

