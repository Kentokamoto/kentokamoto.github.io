import Script from 'next/script'
import React from 'react'

interface StravaActivityParams {
    activityId: number
}
const StravaActivity = ({ activityId }: StravaActivityParams) => {
    return (
        <>
            <Script src="https://strava-embeds.com/embed.js"></Script>
            <div className="mx-2 my-1 w-xs sm:w-sm">
                <div
                    className="strava-embed-placeholder"
                    data-embed-type="activity"
                    data-embed-id={activityId}
                    data-style="standard"
                    data-from-embed="false"
                ></div>
            </div>
        </>
    )
}

export default StravaActivity
