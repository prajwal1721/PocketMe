import React, { useState, useEffect } from 'react';

import './QR.scss';
import Logo1 from '../../../assets/Logo1.png';
export const QR = ({ longUrl, shortUrl, user, title, toggle }) => {
    const url = `${window.location.hostname}/${user}/${shortUrl}`;
    const [qrImg, setImg] = useState(Logo1);
    //
    const fetchImg = () => {
        /*axios.get('/qr', {})
            .then((res) => {
                setImg(res.body);
            })
            .catch((err) => {
                console.error(err);
            })
            */
    }
    // useEffect(() => {
    //     fetchImg();
    //     return () => {
    //         cleanup
    //     }
    // }, [qrImg])
    return (
        <div>
            <div onClick={(e) => { e.preventDefault(); toggle(false); }}>X</div>
            <div>{`Title: ${title}`}</div>
            <div>{`Long Url: ${longUrl}`}</div>
            <div>{`Shortened Route: ${shortUrl}`}</div>
            <a href={url} target='_blank' rel="noreferrer">{`Shortened link: ${url}`}</a>
            <div>{`QR Code`}</div>
            {
                qrImg ? <div style={{ backgroundImage: `url(${qrImg})`, width: '302px', height: '302px' }}>ghfdl</div> : < div > QR Image not found</div>
            }
            { console.log(qrImg)}
        </div >
    )
}