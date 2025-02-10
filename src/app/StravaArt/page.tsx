'use client'

import StravaActivity from '@/components/StravaActivity'

export default function StravaArt() {
    const blurb = ''
    const activityIds = [
        12925466896, 12862826754, 12760761570, 12479331590, 12243041155,
        12003541925, 11615247255, 11083832787, 10764220229, 10743237192,
        10553302412, 10528377100, 10474820310, 10396237868, 10265830140,
        10208737283,
    ]
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
