'use client'

import StravaActivity from '@/components/StravaActivity'

export default function StravaArt() {
    const blurb = ' This is a test'
    const activityIds = [12925466896, 12862826754]
    return (
        <div className="flex flex-col p-8 pb-20">
            <div>
                <p>{blurb}</p>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center">
                {activityIds.map((activityId) => (
                    <StravaActivity activityId={activityId} key={activityId} />
                ))}
            </div>
        </div>
    )
}
