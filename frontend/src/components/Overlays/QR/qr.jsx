import React, { useState, useEffect } from 'react';
import axios from '../../../axiosurl';
import './QR.scss';
export const QR = ({ longUrl, shortUrl, user, title, toggle }) => {
    const url = `http://${window.location.hostname}:${window.location.port}/${user}/${shortUrl}`;

    return (
        <div className='overlay'>
            {console.log('clicked')}
            <div onClick={(e) => { e.preventDefault(); toggle(false); }}>X</div>
            <div>{`Title: ${title}`}</div>
            <div>{`Long Url: ${longUrl}`}</div>
            <div>{`Shortened Route: ${shortUrl}`}</div>
            <a href={url} target='_blank' rel="noreferrer">{`Shortened link: ${url}`}</a>
            <div>{`QR Code`}</div>
            <div>QR code here</div>
            <img title="qrimage" alt="qrimage " src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=http://${window.location.hostname}/${user}/${shortUrl}`}></img>
        </div >
    )
}