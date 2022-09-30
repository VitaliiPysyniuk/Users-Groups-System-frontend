import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {GroupComponent} from "./GroupComponent";
import {NotificationComponent} from "../NotificationComponent.js";
import {groupsServices} from '../../services'
import '../CommonStyles.css'


export const GroupsComponent = ({onGroupEdit}) => {
    const [groups, setGroups] = useState(null);
    const [options, setOptions] = useState(null);

    const fetchGroups = async () => {
        const response = await groupsServices.getAllGroups({'with_members_number': 'True'});
        setGroups(response.data);
    }
    const onGroupDelete = async (groupId) => {
        const response = await groupsServices.deleteGroup(groupId);
        await fetchGroups()

        if (response.status === 204) {
            setOptions({messageText: "Group successfully deleted.", type: "show custom-btn-success"});
        } else if (response.status === 400) {
            setOptions({messageText: "Something goes wrong.", type: "show custom-btn-danger"});
        } else if (response.status === 500) {
            setOptions({messageText: "Server error.", type: "show custom-btn-warning"});
        }
        setTimeout(() => setOptions(null), 2500);
    }

    const onNotificationClose = () => {
        setOptions(null);
    }


    useEffect( () => {
        fetchGroups()
    }, [])

    return (
        <div className="w-85 mx-auto">
            <div className="d-flex justify-content-end align-items-center">
                {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                               onNotificationClose={onNotificationClose}/>}
                <Link to={'/groups/add'}>
                    <button type="button" className="btn btn-outline-primary my-2">Add Group</button>
                </Link>
            </div>
            <hr className="my-0"/>
            <div className="d-flex justify-content-between">
                <div className="w-23 c-pt-8">
                    <button type="button" className="btn btn-outline-primary p-1 w-100">Apply filters</button>
                </div>
                <div className="border-end"/>
                <table className="w-75 table">
                    <thead>
                    <tr>
                        <th className="col-md-1 text-center">Id</th>
                        <th className="col-md-2 text-center">Name</th>
                        <th className="col-md-5 text-center">Description</th>
                        <th className="col-md-1 text-center">Members</th>
                        <th className="col-md-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {groups && groups.map(group => <GroupComponent group={group} key={group.id} onEdit={onGroupEdit}
                                                                   onDelete={onGroupDelete}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
};