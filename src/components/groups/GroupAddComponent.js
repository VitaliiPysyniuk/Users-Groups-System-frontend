import React, {useState} from "react";
import {groupsServices} from "../../services";
import {NotificationComponent} from "../NotificationComponent";


export const GroupAddComponent = () => {
    const [options, setOptions] = useState(null);
    const [formChanged, setFormChanged] = useState(false);

    const saveChanges = async (event) => {
        event.preventDefault();

        let data = {
            name: event.target.elements.name.value,
            description: event.target.elements.description.value
        }

        if (formChanged) {
            const response = await groupsServices.addGroup(data);

            if (response.status === 201) {
                setOptions({messageText: "Group successfully added.", type: "show custom-btn-success"});
            } else if (response.status === 400) {
                let message = ''
                for (let item in response.data) {
                    message += `${item.charAt(0).toUpperCase()}${item.slice(1)}: ${response.data[item]}`
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

    return (
        <div className="w-85 mx-auto">
            <div className="d-flex justify-content-end align-items-center">
                {options && <NotificationComponent messageText={options.messageText} type={options.type}
                                                   onNotificationClose={onNotificationClose}/>}
                <button type="submit" className="btn btn-success my-2" form="addform">Save Group</button>
            </div>
            <hr className="my-0"/>
            <form id="addform" className="mt-3" onSubmit={saveChanges} onChange={() => setFormChanged(true)}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="description"/>
                    </div>
                </div>
            </form>
        </div>
    )
};