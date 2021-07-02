import React, { useState } from 'react';

import './UrlView.scss';
export const UrlViews = ({ url: { shortUrl, title, longUrl, description }, selectedUrls, change, user, setDataForDescription, toggleDescription, setDataForQRCode, toggleQR }) => {
    // const [viewQR, toggleQR] = useState(false);
    const [checkBox, toggleCheck] = useState(selectedUrls.find((short) => short === selectedUrls));
    // useEffect(() => {
    //     if (selectedUrls.find((short) => short == selectedUrls)) toggleCheck(true);
    // }, [])

    // const onClickDescription = (e) => {
    //     // e.preventDefault();
    //     // didn't work
    //     // console.log('click');
    //     // <Redirect
    //     //     to={{
    //     //         path: '/description',
    //     //         state: { title: title, longUrl: longUrl, description: description, user: user }
    //     //     }} />
    //     toggleDescription(true);
    //     toggleQR(false);
    // }
    const changeItems = (e) => {
        // e.preventDefault();
        action().then(() => {
            change(selectedUrls);
            toggleCheck(!checkBox);
            console.log(selectedUrls);
        });
    }
    const checkornot = () => {
        return (selectedUrls.find((short) =>
            short === shortUrl) ? true : false);
    }
    const action = async () => {
        if (!checkBox) {
            selectedUrls.push(shortUrl)

        }
        else {
            selectedUrls = selectedUrls.filter((url) => url !== shortUrl);
        }
    }
    const onClickDescription = (e) => {
        e.preventDefault();
        const data = {
            'shortUrl': shortUrl, 'longUrl': longUrl, 'title': title, 'user': user, 'description': description
        }
        setDataForDescription(data);
        toggleDescription(true);
        toggleQR(false);
    }
    const onClickQR = (e) => {
        e.preventDefault();
        const data = {
            'shortUrl': shortUrl, 'longUrl': longUrl, 'title': title, 'user': user, 'toggle': toggleQR, 'description': description
        }
        setDataForQRCode(data);
        toggleDescription(false);
        toggleQR(true);
    }
    return (
        < tr className='table' >
            <td><input
                className='tr select'
                type="checkbox"
                id={title} name=''
                value={checkBox}
                checked={checkornot()}
                onChange={changeItems} />
            </td>
            <td className='tr title'>{title}</td>
            <td className='tr short-url'>{shortUrl}</td>
            <td className='tr long-url' ><a href={longUrl} rel="noreferrer" target="_blank">{longUrl}</a></td>
            <td className='tr description' onClick={onClickDescription}>{description}</td>
            <td className="tr view" onClick={onClickQR}>View QR</td>

        </tr >


    )


}

