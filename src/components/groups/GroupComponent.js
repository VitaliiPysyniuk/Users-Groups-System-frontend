import React from 'react'
import {Link} from "react-router-dom";

export const GroupComponent = ({group, onEdit, onDelete}) => {
    return (
        <tr key={`row/${group.id}`}>
            <th className="col-md-1 text-center align-middle">{group.id}</th>
            <td className="col-md-2 text-center align-middle p-1">{group.name}</td>
            <td className="col-md-5 text-center align-middle p-1">{group.description}</td>
            <td className="col-md-1 text-center align-middle p-1">{group.members_number}</td>
            <td className="col-md-3 pe-0 p-1">
                <div className="d-flex justify-content-end align-items-center">
                    <Link to={`/groups/${group.id}`}>
                        <button type="button" className="btn btn-outline-warning mx-2" onClick={() => onEdit(group)}>
                            Edit Group
                        </button>
                    </Link>
                    <button type="button" className="btn btn-outline-danger mx-2 me-0" onClick={() => onDelete(group.id)}>
                        Delete Group
                    </button>
                </div>
            </td>
        </tr>
    )
}