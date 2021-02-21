import React, { useState } from 'react';
import { Description } from '../Overlays/Description/description';
import { QR } from '../Overlays/QR/qr';

export const UrlViews = ({ url: { shortUrl, title, longUrl, description }, selectedUrls, change, user = "tans" }) => {
    const [viewDecription, toggleDescription] = useState(false);
    const [viewQR, toggleQR] = useState(false);
    const [checkBox, toggleCheck] = useState(selectedUrls.find((short) => short === selectedUrls));
    // useEffect(() => {
    //     if (selectedUrls.find((short) => short == selectedUrls)) toggleCheck(true);
    // }, [])
    const changeItems = (e) => {
        // e.preventDefault();
        action().then(() => {
            change(selectedUrls);
            toggleCheck(!checkBox);
            console.log(selectedUrls);
        });
    }
    const action = async () => {
        if (!checkBox) {
            selectedUrls.push(shortUrl)

        }
        else {
            selectedUrls = selectedUrls.filter((url) => url !== shortUrl);
        }
    }
    const checkornot = () => {
        return (selectedUrls.find((short) =>
            short === shortUrl) ? true : false);
    }
    return (
        <div>
            {
                viewDecription ?
                    <Description
                        shortUrl={shortUrl} longUrl={longUrl} title={title} user={user} description={description} toggle={toggleDescription}
                    /> :
                    viewQR ?
                        <QR
                            shortUrl={shortUrl} longUrl={longUrl} title={title} user={user} toggle={toggleQR}
                        /> :
                        < tr className='url' >
                            <td><input
                                type="checkbox"
                                id={title} name=''
                                value={checkBox}
                                checked={checkornot()}
                                onChange={changeItems} />
                            </td>
                            <td className='item'>{title}</td>
                            <td className='item'>{shortUrl}</td>
                            <td className='item' ><a href={longUrl} rel="noreferrer" target="_blank">{longUrl}</a></td>
                            <td className='item' onClick={(e) => {
                                e.preventDefault();
                                // didn't work
                                // console.log('click');
                                // <Redirect
                                //     to={{
                                //         path: '/description',
                                //         state: { title: title, longUrl: longUrl, description: description, user: user }
                                //     }} />
                                toggleDescription(true);
                                toggleQR(false);
                            }}
                            >Description</td>
                            <td className="item" onClick={(e) => {
                                e.preventDefault();
                                toggleDescription(false);
                                toggleQR(true);
                            }
                            }>View</td>
                        </tr >}
        </div>
    )
}