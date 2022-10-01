import React from 'react'
import {Link} from "react-router-dom";

export const UserComponent = ({user, onEdit, onDelete}) => {
    const formCreatedAtString = (created_at) => {
        const date = new Date(created_at)
        const dateString = date.toDateString().split(' ')
        const timeString = date.toTimeString().split(' ')
        return <p className="m-0">{`${timeString[0]}`}<br/>{`${dateString[2]}/${dateString[1]}/${dateString[3]}`}</p>
    }


    return (
        <tr>
            <th scope="row" className="col-md-auto text-center align-middle p-1">{user.id}</th>
            <td className="col-md-2 text-center align-middle p-1">{user.username}</td>
            <td className="col-md-2 text-center align-middle p-1">{user.email}</td>
            <td className="col-md-2 text-center align-middle p-1">
                {user.groups.map(group => (<p className="m-0">{group.name}</p>))}
            </td>
            <td className="col-md-auto text-center align-middle p-1">
                <input className="form-check-input" type="checkbox" value="" readOnly={true} checked={user.is_admin}/>
            </td>
            <td className="col-md-1 text-center align-middle p-1">{formCreatedAtString(user.created_at)}</td>
            <td className="col-md-2 text-center align-middle p-1 pe-0">
                <div className="d-flex justify-content-end align-items-center">
                    <Link to={`/users/${user.id}`}>
                        <button type="button" className="btn btn-outline-warning mx-2"
                                onClick={() => onEdit(user)}>
                            Edit User
                        </button>
                    </Link>
                    <button type="button" className="btn btn-outline-danger mx-2 me-0"
                            onClick={() => onDelete(user.id)}>
                        Delete User
                    </button>
                </div>
            </td>
        </tr>
    )
}