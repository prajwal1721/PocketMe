import React from 'react';
import './PrintPage.scss';
import { InnerComponent } from './innerComponent';
export const PrintPage = ({ urls }) => {
    return (
        <div>
            <div>{`User`}</div>
            {
                urls.map(({ shorturl, description, title }) => {
                    <InnerComponent
                        shortUrl={shorturl}
                        description={description}
                        title={title}
                    />
                })
            }
        </div>
    )

}
