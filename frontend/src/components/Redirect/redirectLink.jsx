import React, { useState, useEffect } from 'react';
import axios from '../../axiosurl';
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { useParams } from 'react-router-dom';
import './redirectLink.scss'
export const RedirectLink = () => {
    const { user, shortUrl } = useParams();
    const [longUrl, setLongUrl] = useState('');
    const [errorr, setError] = useState(null);
    let history = useHistory();
    const browserHistory = createBrowserHistory();
    const getUrl = () => {
        console.log(user, shortUrl);
        axios.get(`/${user}/${shortUrl}`)
            .then(
                (res) => {
                    // console.log(res.data.url);
                    setLongUrl(res.data.url);
                }
            )
            .catch((err) => {
                // console.error(err);
                setError('URL NOT FOUND');
            })
    }
    useEffect(() => {
        let mounted = true
        if (mounted) getUrl();
        return () => mounted = false;
    })
    const redirectHome = () => {
        // console.log('redirecting');
        setTimeout(() => history.push('/'), 4000);
    }
    return (

        <div>
            {longUrl ? browserHistory.push(longUrl) : null}
            {errorr ?
                <>
                    < div onLoad={redirectHome()} className='error message'>{`Oop's ... Error:  ${errorr} :( `}
                        <br /><span>Check again</span></div>
                </> :
                <div className='success message'>`Redirecting ${longUrl}`</div>
            }
        </div >
    )
};
