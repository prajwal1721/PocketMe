import React, { useState, useEffect } from 'react';
import { UrlViews } from '../../components/UrlView/UrlView';
import axios from '../../axiosurl';
import './UrlPage.scss';

export const UrlPage = () => {
    const [urls, setUrls] = useState([{ shortUrl: 'Hdfsdf', title: 'fdf', longUrl: 'fdjfd', description: 'df' }]);
    const [selectedUrls, changeSelectedUrls] = useState([]);
    const geturls = () => {
        axios.get('/all', {
            headers: { 'Access-Control-Allow-Origin': '*' }
        })
            .then((res) => {
                console.log(res);
                setUrls(res.body);
            })
            .catch((err) => {
                console.error(err);
            })
    }
    useEffect(
        () => {
            geturls();
        }, [urls]
    )
    return (
        <div>
            <div className='url-container'>
                <table className='table'>
                    <thead><tr>
                        <th>Select</th>
                        <th>Title</th>
                        <th>ShortUrl</th>
                        <th>LongUrl</th>
                        <th>Decription</th>
                        <th>QR Code</th>
                    </tr>
                    </thead>
                </table>
                <table className='table'>
                    <tbody>
                        {
                            urls.map(
                                (url) =>
                                    <UrlViews key={url.shortUrl} url={url} change={changeSelectedUrls} selectedUrls={selectedUrls} />
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}