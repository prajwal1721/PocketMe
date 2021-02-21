import React, { useState, useEffect } from 'react';
import axios from '../../../axiosurl';
import './QR.scss';
export const QR = ({ longUrl, shortUrl, user, title, toggle }) => {
    const url = `${window.location.hostname}/${user}/${shortUrl}`;
    const [qrImg, setImg] = useState(null);
    //
    const fetchImg = () => {
        axios.get('/qr', {
            shortUrl: 'prajwal'
        })
            .then((res) => {
                // setImg(Buffer.from(res.data, 'binary').toString('base64'));
                setImg(res.data);
                // console.log('This is', res.data);
            })
            .catch((err) => {
                console.error(err);
            })

    }
    useEffect(() => {
        fetchImg();
        return () => {
            return false;
        }
    }, [qrImg])
    return (
        <div>
            <div onClick={(e) => { e.preventDefault(); toggle(false); }}>X</div>
            <div>{`Title: ${title}`}</div>
            <div>{`Long Url: ${longUrl}`}</div>
            <div>{`Shortened Route: ${shortUrl}`}</div>
            <a href={url} target='_blank' rel="noreferrer">{`Shortened link: ${url}`}</a>
            <div>{`QR Code`}</div>
            Image here
            <img alt="qrimage" src={qrImg}></img>
            {
                qrImg ? <div style={{ backgroundImage: `url(${qrImg})`, width: '302px', height: '302px' }}>ghfdl</div> : < div > QR Image not found</div>
            }
            { console.log(qrImg)}
        </div >
    )
}