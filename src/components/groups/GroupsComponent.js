import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {GroupComponent} from "./GroupComponent";
import {NotificationComponent} from "../NotificationComponent.js";
import {groupsServices} from '../../services'
import '../CommonStyles.css'


export const GroupsComponent = ({onGroupEdit}) => {
    const [groups, setGroups] = useState(null);
    const [options, setOptions] = useState(null);
    const [clearFilters, setClearFilter] = useState(false);

    const fetchGroups = async () => {
        const response = await groupsServices.getAllGroups({with_members_number: 'True'});
        setGroups(response.data);
    }

    const onGroupDelete = async (groupId) => {
        const response = await groupsServices.deleteGroup(groupId);
        await fetchGroups()

        if (response.status === 204) {
            setOptions({messageText: "Group successfully deleted.", type: "show custom-btn-success"});
        } else if (response.status === 400) {
            setOptions({messageText: response.data.detail, type: "show custom-btn-danger"});
        } else if (response.status === 500) {
            setOptions({messageText: "Server error.", type: "show custom-btn-warning"});
        }
        setTimeout(() => setOptions(null), 2500);
    }

    const onFiltersApply = async (event) => {
        event.preventDefault();

        let params = {
            with_members_number: 'True'
        }

        if (event.target.elements.name.value !== '') {
            params.name__startswith = event.target.elements.name.value;
        }
        if (event.target.elements.members_number__gte.value !== '') {
            params.members_number__gte = event.target.elements.members_number__gte.value;
        }
        if (event.target.elements.members_number__lte.value !== '') {
            params.members_number__lte = event.target.elements.members_number__lte.value;
        }

        if (JSON.stringify(params) !== JSON.stringify({with_members_number: 'True'})) {
            const response = await groupsServices.getAllGroups(params);
            setGroups(response.data);
            setClearFilter(true)
        }
    }

    const onNotificationClose = () => {
        setOptions(null);
    }

    const onFiltersClear = () => {
        document.getElementById('filterform').reset();
        setClearFilter(false)
        fetchGroups()
    }


    useEffect(() => {
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
                    <button type="submit" className="btn btn-outline-primary p-1 w-100" form="filterform">
                        Apply filters
                    </button>
                    <form id="filterform" className="mt-2 mb-2" onSubmit={onFiltersApply}>
                        <div className="d-flex flex-column mb-1">
                            <label className="fw-bold">Name:</label>
                            <input type="text" className="form-control p-1" id="name" placeholder={'Group 1'}/>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label className="fw-bold">Members number: </label>
                            <div className="d-flex align-items-center">
                                <label className="me-1">From: </label>
                                <input type="text" className="form-control p-1" id="members_number__gte"
                                       placeholder={'1'}/>
                                <label className="ms-2 me-1">To: </label>
                                <input type="text" className="form-control p-1" id="members_number__lte"
                                       placeholder={'10'}/>
                            </div>
                        </div>
                    </form>
                    {clearFilters && <button type="button" className="btn btn-outline-danger p-1 w-100"
                                             onClick={onFiltersClear}>
                        Clear filters
                    </button>}
                </div>
                <div className="border-end"/>
                <div className="w-75 scroll-table">
                    <table className="table">
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
        </div>
    )
};