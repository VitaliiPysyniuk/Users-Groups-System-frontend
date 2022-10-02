import React, {useState, useEffect} from "react";
import {groupsServices, usersServices} from "../../services";
import {NotificationComponent} from "../NotificationComponent";
import Select from 'react-select';

export const UserAddComponent = () => {
    const [options, setOptions] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [formChanged, setFormChanged] = useState(false);

    const fetchGroups = async () => {
        const response = await groupsServices.getAllGroups();
        setGroups(response.data.map(group => {
            return {value: group.id, label: group.name}
        }));
    }

    const saveChanges = async (event) => {
        event.preventDefault();

        let data = {
            username: event.target.elements.username.value,
            email: event.target.elements.email.value,
            is_admin: event.target.elements.admin.checked,
            groups: selectedGroups.map(group => group.value)
        }

        const response = await usersServices.addUser(data)
        if (formChanged) {
            if (response.status === 201) {
                setOptions({messageText: "User successfully added.", type: "show custom-btn-success"});
            } else if (response.status === 400) {
                let message = ''
                for (let item in response.data) {
                    message += `${item.charAt(0).toUpperCase()}${item.slice(1)}: ${response.data[item]} `
                }
                setOptions({messageText: message, type: "show custom-btn-danger"});
            } else if (response.status === 500) {
                setOptions({messageText: "Server error.", type: "show custom-btn-warning"});
            }
            setTimeout(() => setOptions(null), 2500);

            setFormChanged(false)
        }
    }

    const onNotificationClose = () => {
        setOptions(null);
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    return (
        <div className="w-85 mx-auto">
            <div className="d-flex justify-content-end align-items-center">
                {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                                   onNotificationClose={onNotificationClose}/>}
                <button type="submit" className="btn btn-success my-2" form="addform">Save User</button>
            </div>
            <hr className="my-0"/>
            <form id="addform" className="mt-3" onSubmit={saveChanges} onChange={() => setFormChanged(true)}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="email"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="username"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Admin</label>
                    <div className="col-sm-10">
                        <input className="form-check-input" type="checkbox" id="admin" value=""/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Groups</label>
                    <div className="col-sm-10">
                        <Select closeMenuOnSelect={true} isMulti={true} options={groups} id="groups"
                                onChange={selected => {
                                    setSelectedGroups(selected)
                                    setFormChanged(true)
                                }}/>
                    </div>
                </div>
            </form>
        </div>
    )
};