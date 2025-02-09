'use client'

import React from 'react'
import Script from 'next/script'

const StravaActivities = () => {
    return (
        <>
            <Script src="https://strava-embeds.com/embed.js"></Script>
            <div className="flex flex-row flex-wrap items-center justify-center">
                <div className="mx-2 my-1 w-xs sm:w-sm">
                    <div
                        className="strava-embed-placeholder"
                        data-embed-type="activity"
                        data-embed-id="12925466896"
                        data-style="standard"
                        data-from-embed="false"
                    ></div>
                </div>
                <div className="mx-2 my-1 w-xs sm:w-sm">
                    <div
                        className="strava-embed-placeholder"
                        data-embed-type="activity"
                        data-embed-id="12862826754"
                        data-style="standard"
                        data-from-embed="false"
                    ></div>
                </div>
            </div>
        </>
    )
}

export default StravaActivities
