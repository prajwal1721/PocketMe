import React from 'react';
import './alert.scss';
import $ from 'jquery';
export const alertSuccess = (successMessage) => {
    $(document).ready(function () {
        $("#alertTab")[0].classList.replace('alert-danger', 'alert-success');
        $("#alertTab").fadeIn();
        $("#alertText").html(successMessage);
    })
    window.setTimeout(() => {
        $("#alertTab").fadeOut();
    }, 4000);
}

export const alertWarning = (errMessage) => {
    $(document).ready(function () {
        $("#alertTab")[0].classList.replace('alert-success', 'alert-danger');
        $("#alertTab").fadeIn();
        $("#alertText").html(errMessage);
    })
    window.setTimeout(() => {
        $("#alertTab").fadeOut();
    }, 4000);
}

export const Alert = ({ datamessage, alertclass }) => {

    const handleClose = () => {
        $("#alertTab").fadeOut();
    }

    return (
        <div id="alertTab" className={alertclass}>
            <div className="d-flex justify-content-around">
                <span id="alertText" className="p-3"><strong>{datamessage}</strong></span>
                <span id="alertClose" className="close p-3" onClick={handleClose}>&times;</span>
            </div>
        </div>
    )

};



export default Alert; 