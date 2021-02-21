import React, { useState } from 'react';
import validator from 'validator'
import './createLink.scss';
import axios from '../../axiosurl';
import { Button } from '../Button/button';
import { FormInput } from '../FormInput/FormInput';
export const CreateLink = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [view, toggleView] = useState(0);
    const [linkTitle, setLinkTitle] = useState('');
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validator.isURL(longUrl)) {
            return setErrorMessage('Enter a Valid URL')
        }
        const data = {
            title: linkTitle,
            shortUrl: shortUrl,
            longUrl: longUrl,
            description: description
        }
        console.log(data);
        //axios call handling
        axios.post('/add', data)
            .then((res) => {
                console.log(res.data);
                alert(`Link Created ${res.data.shortUrl}`);
                toggleView(false);
            })
            .catch((err) => {
                console.log(err.response.data.toUpperCase());
                alert(err.response.data.toUpperCase());
            })
    }
    const change = () => {
        toggleView(!view);
    }
    return (
        <div className="create">
            {
                view ?
                    <div className="create-link close">
                        <div className="toggle-createlink" onClick={change}>X</div>
                        <FormInput
                            set={setLinkTitle}
                            label={`Title`}
                            required
                            type='text'
                            value={linkTitle}
                        />
                        <FormInput
                            set={setShortUrl}
                            label={`Short Route`}
                            required
                            type='text'
                            value={shortUrl}
                        />
                        <span>{`Link will be ${window.location.hostname}/${`username`}/${shortUrl}`}</span>
                        <FormInput
                            set={setLongUrl}
                            label={`Url`}
                            required
                            type='url'
                            value={longUrl}
                        />
                        {errorMessage ? <span>{errorMessage}</span> : <></>}
                        <FormInput
                            set={setDescription}
                            label={`Description`}
                            required
                            type='text'
                            value={description}
                        />
                        <div onClick={handleSubmit}>Create Link</div>
                    </div> :
                    <Button
                        className="toggle-createlink"
                        title={`CREATE`} r={225} g={0} b={21}
                        clickAction={change} />
            }
        </div>
    )
}
