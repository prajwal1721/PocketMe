import React from 'react';
import './description.scss';
export const Description = ({ title, longUrl, shortUrl, decription, user, toggle }) => {
    const url = `${window.location.hostname}/${user}/${shortUrl}`;
    return (
        <div>
            <div onClick={(e) => { e.preventDefault(); toggle(false); }}>X</div>
            <div>{`Title: ${title}`}</div>
            <div>{`Long Url: ${longUrl}`}</div>
            <div>{`Shortened Route: ${shortUrl}`}</div>
            <a href={url} target='_blank' rel="noreferrer">{`Shortened link: ${url}`}</a>
            <div>{`Description`}</div>
            <div>{decription}</div>
        </div>
    )
}