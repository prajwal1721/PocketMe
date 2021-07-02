import React from 'react';
import './description.scss';
export const Description = ({ title, longUrl, shortUrl, description, user, toggle }) => {
    const url = `http://${window.location.hostname}:${window.location.port}/${user}/${shortUrl}`;
    return (
        <div className='overlay'>
            {console.log(title, longUrl, shortUrl, description, user)}
            <div onClick={(e) => { e.preventDefault(); toggle(false); }}>x</div>
            <div>{`Title: ${title}`}</div>
            <div>{`Long Url: ${longUrl}`}</div>
            <div>{`Shortened Route: ${shortUrl}`}</div>
            <div>
                Shortened Url:
                <a href={url} target='_blank' rel="noreferrer">{`${url}`}</a>
            </div>
            <div>{`Description`}</div>
            <div>{description}</div>
        </div>
    )
}