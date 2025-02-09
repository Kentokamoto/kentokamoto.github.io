'use client'

import React from 'react'
import StravaActivity from './StravaActivity'

const StravaActivities = () => {
    return (
        <>
            <div className="flex flex-row flex-wrap items-center justify-center">
                <StravaActivity activityId={12925466896} />
                <StravaActivity activityId={12862826754} />
            </div>
        </>
    )
}

export default StravaActivities
