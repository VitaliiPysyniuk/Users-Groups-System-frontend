import React from "react";
import './NotificationComponent.css'

export const NotificationComponent = ({messageText, type, onNotificationClose}) => {
    const onButtonClick = () => {
        const toastMessage = document.getElementById("toast-message");
        toastMessage.className = toastMessage.className.replace('show', '');
        onNotificationClose()
    }

    return (
        <div className={"h-38 me-2 w-25 c-border-radius d-flex align-items-center justify-content-between " + " " + type}
             role="alert" id="toast-message">
            <p className="p-0 m-0 ms-3"> {messageText}</p>
            <button type="button" className="btn-close me-2" aria-label="Close" onClick={onButtonClick}/>
        </div>
    )
}