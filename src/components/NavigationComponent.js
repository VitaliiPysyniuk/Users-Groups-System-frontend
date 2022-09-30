import React from 'react'
import {Link} from "react-router-dom";


export const NavigationComponent = () => {
    const usersRef = React.createRef();
    const groupsRef = React.createRef();

    const changeClassToActive = (curRef, prevRef) => {
        curRef.current.className = curRef.current.className + " active";
        prevRef.current.className = prevRef.current.className.replace(" active", "")
    }

    return (
        <div>
            <ul className="nav nav-tabs ps-5">
                <li className="nav-item">
                    <Link ref={usersRef} to={'/users'} className="nav-link active">
                        <button type="button" className="btn btn-outline-secondary"
                                onClick={() => changeClassToActive(usersRef, groupsRef)}>Users
                        </button>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/groups'} ref={groupsRef} className="nav-link">
                        <button type="button" className="btn btn-outline-secondary"
                                onClick={() => changeClassToActive(groupsRef, usersRef)}>Groups
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}