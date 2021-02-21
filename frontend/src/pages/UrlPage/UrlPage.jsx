import React, { useState, useEffect } from 'react';
import { UrlViews } from '../../components/UrlView/UrlView';
import axios from '../../axiosurl';
import './UrlPage.scss';

export const UrlPage = () => {
    const [urls, setUrls] = useState([]);
    const [selectedUrls, changeSelectedUrls] = useState([]);
    const geturls = () => {
        axios.get('/all')
            .then((res) => {
                console.log(res.data);
                setUrls(res.data);
            })
            .catch((err) => {
                alert(err)
                console.error(err.response);
            })
    }
    useEffect(
        () => {
            geturls();
        }, []
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