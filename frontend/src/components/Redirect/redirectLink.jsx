import React, { useState, useEffect } from 'react';
import axios from '../../axiosurl';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const RedirectLink = () => {
    const { user, shortUrl } = useParams();
    const [longUrl, setLongUrl] = useState('');
    const [errorr, setError] = useState(null);
    let history = useHistory();

    const getUrl = () => {
        console.log(user, shortUrl);
        axios.get(`/${user}/${shortUrl}`)
            .then(
                (res) => {
                    console.log(res.data.url); setLongUrl(res.data.url);
                }
            )
            .catch((err) => {
                console.error(err);
                setError('URL NOT FOUND');
            })
    }
    useEffect(() => {
        let mounted = true
        if (mounted) getUrl();
        return () => mounted = false;
    })
    return (

        <div>
            {longUrl ? history.push(longUrl) : null}
            {errorr ? <h4>{`Error:  ${errorr} :(`}</h4> : `Redirecting ${longUrl}`}
        </div>
    )
};