'use client'

import StravaActivities from '@/components/StravaActivities'

export default function StravaArt() {
    const blurb = ' This is a test'

    return (
        <div className="flex flex-col p-8 pb-20">
            <div>
                <p>{blurb}</p>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center"></div>
            <StravaActivities />
        </div>
    )
}
