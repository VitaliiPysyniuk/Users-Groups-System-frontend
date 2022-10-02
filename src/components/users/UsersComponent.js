import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {UserComponent} from "./UserComponent";
import {NotificationComponent} from "../NotificationComponent.js";
import {groupsServices, usersServices} from '../../services'
import '../CommonStyles.css'
import Select from "react-select";

export const UsersComponent = ({onUserEdit}) => {
    const [users, setUsers] = useState(null);
    const [options, setOptions] = useState(null);
    const [clearFilters, setClearFilter] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [adminStatus, setAdminStatus] = useState(null);
    const [groups, setGroups] = useState(null);

    const fetchUsers = async () => {
        const response = await usersServices.getAllUsers();
        setUsers(response.data);
    }

    const fetchGroups = async () => {
        const response = await groupsServices.getAllGroups();
        setGroups(response.data.map(group => {
            return {value: group.id, label: group.name}
        }));
    }


    const onUserDelete = async (userId) => {
        const response = await usersServices.deleteUser(userId);
        await fetchUsers()

        if (response.status === 204) {
            setOptions({messageText: "User successfully deleted.", type: "show custom-btn-success"});
        } else if (response.status === 400) {
            setOptions({messageText: "Something goes wrong.", type: "show custom-btn-danger"});
        } else if (response.status === 500) {
            setOptions({messageText: "Server error.", type: "show custom-btn-warning"});
        }
        setTimeout(() => setOptions(null), 2500);
    }

    const onFiltersApply = async (event) => {
        event.preventDefault();

        let params = {}

        if (event.target.elements.email_startswith.value !== '') {
            params.email__startswith = event.target.elements.email_startswith.value;
        }
        if (event.target.elements.email_endswith.value !== '') {
            params.email__endswith = event.target.elements.email_endswith.value;
        }
        if (event.target.elements.username_startswith.value !== '') {
            params.username__startswith = event.target.elements.username_startswith.value;
        }
        if (adminStatus !== null) {
            params.is_admin = adminStatus.value;
        }
        if (event.target.elements.created_at__date.value !== '') {
            params.created_at__date = event.target.elements.created_at__date.value;
        }
        if (event.target.elements.created_at__date__gt.value !== '') {
            params.created_at__date__gt = event.target.elements.created_at__date__gt.value;
        }
        if (event.target.elements.created_at__date__lt.value !== '') {
            params.created_at__date__lt = event.target.elements.created_at__date__lt.value;
        }
        if (selectedGroups.length !== 0) {
            params.groups__in = selectedGroups.map(group => group.value).join(',')
        }

        if (JSON.stringify(params) !== JSON.stringify({})) {
            const response = await usersServices.getAllUsers(params);
            setUsers(response.data);
            setClearFilter(true)
        } else {
            fetchUsers()
            setClearFilter(false)
        }
    }

    const onNotificationClose = () => {
        setOptions(null);
    }

    const onFiltersClear = () => {
        document.getElementById('filterform').reset();
        setClearFilter(false)
        fetchUsers()
    }

    useEffect(() => {
        fetchUsers()
        fetchGroups()
    }, [])

    return (
        <div className="w-85 mx-auto">
            <div className="d-flex justify-content-end align-items-center">
                {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                                   onNotificationClose={onNotificationClose}/>}
                <Link to={'/users/add'}>
                    <button type="button" className="btn btn-outline-primary my-2">Add User</button>
                </Link>
            </div>
            <hr className="my-0"/>
            <div className="d-flex justify-content-between">
                <div className="w-23 c-pt-8">
                    <button type="submit" className="btn btn-outline-primary p-1 w-100" form="filterform">
                        Apply filters
                    </button>
                    <form id="filterform" className="mt-2 mb-2" onSubmit={onFiltersApply}>
                        <div className="d-flex flex-column">
                            <label className="fw-bold">Email:</label>
                            <input type="text" className="form-control p-1" id="email_startswith"
                                   placeholder={"user@gmail.com"}/>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label className="fw-bold">Email domain:</label>
                            <input type="text" className="form-control p-1" id="email_endswith"
                                   placeholder={"gmail.com"}/>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label className="fw-bold">Username:</label>
                            <input type="text" className="form-control p-1" id="username_startswith"
                                   placeholder={"vitalii"}/>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                            <label className="fw-bold me-3">Admin:</label>
                            <Select closeMenuOnSelect={true} isClearable={true} id="is_admin"
                                    onChange={status => setAdminStatus(status)}
                                    options={[{value: 'True', label: 'True'}, {value: 'False', label: 'False'}]}/>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label className="fw-bold">Created at:</label>
                            <input type="text" className="form-control p-1" id="created_at__date"
                                   placeholder={"2022-09-21"}/>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label className="fw-bold">Creation period:</label>
                            <div className="d-flex align-items-center">
                                <label className="me-1">From: </label>
                                <input type="text" className="form-control p-1" id="created_at__date__gt"
                                       placeholder={"2022-09-15"}/>
                                <label className="ms-2 me-1">To: </label>
                                <input type="text" className="form-control p-1" id="created_at__date__lt"
                                       placeholder={"2022-09-30"}/>
                            </div>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <label className="fw-bold">Member of groups:</label>
                            {groups && <Select closeMenuOnSelect={true} isMulti={true} options={groups} id="groups__in"
                                               onChange={selected => setSelectedGroups(selected)}/>}
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
                            <th className="col-md-auto text-center">Id</th>
                            <th className="col-md-2 text-center">Username</th>
                            <th className="col-md-2 text-center">Email</th>
                            <th className="col-md-2 text-center">Groups</th>
                            <th className="col-md-auto text-center">Admin</th>
                            <th className="col-md-1 text-center">Created</th>
                            <th className="col-md-3 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users && users.map(user => <UserComponent user={user} key={user.id} onEdit={onUserEdit}
                                                                   onDelete={onUserDelete}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};