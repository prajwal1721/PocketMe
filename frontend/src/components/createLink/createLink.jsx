import React, { useState } from 'react';
import validator from 'validator'
import './createLink.scss';
import axios from '../../axiosurl';
import { Button } from '../Button/button';
import { FormInput } from '../FormInput/FormInput';
import { useHistory } from 'react-router-dom';
export const CreateLink = ({ userName }) => {
    const history = useHistory();
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
                history.push('/');
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
            {console.log(view)}
            {
                view ?
                    <div className={`create-link close ${view}`}>
                        <div className='tmp'></div>
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
                        <span>{`Link will be ${window.location.hostname}/${userName}/${shortUrl}`}</span>
                        <div className='create-button' onClick={handleSubmit}>Create Link</div>
                    </div> :
                    <Button
                        className="create-link open"
                        title={`CREATE`} r={225} g={0} b={21}
                        clickAction={change} />
            }
        </div >
    )
}
