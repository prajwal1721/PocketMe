import React, { useState, useEffect } from 'react';
import * as fs from 'fs';
import './innerComponent.scss';

export const InnerComponent = ({ title, description, shortUrl }) => {
    const [qrImg, setQR] = useState(null);
    useEffect(() => {
        /* 
        axios(
            method:'get'
            url:'/qr'
            {shortUrl:shortUrl}
            responseType: 'stream'
        }).then((res)=>{
            response.data.pipe(fs.createWriteStream(`${shortUrl}.png`))
        })
        .catch((err)=>{
            console.error(err);
        })
         */
    })
    return (
        <div>
            <image className="big" src={`${shortUrl}.png`}></image>
            <image classname="small" src={`${shortUrl}.png`}></image>
            <span>
                <span>{title.toUpperCase()}</span>
                <span>{`Route: ${shortUrl}`}</span>
            </span>
            <span>{description}</span>
        </div>
    )
}
