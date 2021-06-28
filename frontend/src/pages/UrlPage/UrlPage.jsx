import React, { useState, useEffect } from 'react';
import { UrlViews } from '../../components/UrlView/UrlView';
import { Description } from '../../components/Overlays/Description/description';
import { QR } from '../../components/Overlays/QR/qr';
import axios from '../../axiosurl';
import './UrlPage.scss';

export const UrlPage = ({ user }) => {
    const [urls, setUrls] = useState([]);
    const [selectedUrls, changeSelectedUrls] = useState([]);
    const [viewDecription, toggleDescription] = useState(false);
    const [viewQR, toggleQR] = useState(false);
    const [dataForDescription, setDataForDescription] = useState({});
    const [dataForQRCode, setDataForQRCode] = useState({});
    const geturls = () => {
        axios.get('/all')
            .then((res) => {
                // console.log(res.data);
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
        }, [viewDecription]
    )
    return (
        <div>
            <div className='url-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='th select'>Select</th>
                            <th className='th title'>Title</th>
                            <th className='th short-url'>ShortUrl</th>
                            <th className='th long-url'>LongUrl</th>
                            <th className='th description'>Decription</th>
                            <th className='th view'>QR Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            urls.map(
                                (url) => {
                                    // console.log(url);
                                    return <UrlViews key={url.shortUrl} url={url} change={changeSelectedUrls} user={user} selectedUrls={selectedUrls} setDataForDescription={setDataForDescription} toggleDescription={toggleDescription} setDataForQRCode={setDataForQRCode} toggleQR={toggleQR} />
                                }
                            )
                        }

                    </tbody>
                </table>
                {/* {console.log(viewDecription, viewQR)} */}
                {
                    viewDecription ?
                        <Description
                            {...dataForDescription}
                            toggle={toggleDescription}
                        /> : <></>
                }
                {
                    viewQR ?
                        <QR
                            {...dataForQRCode}
                            toggle={toggleQR}
                        /> : <></>
                }
            </div>
        </div>
    )
}