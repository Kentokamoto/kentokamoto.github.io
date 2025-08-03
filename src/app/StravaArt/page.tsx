'use client'

import StravaActivity from '@/components/StravaActivity'

export default function StravaArt() {
  const blurb = ''
  return (
    <div className="flex flex-col p-8 pb-20">
      <div>
        <p>{blurb}</p>
      </div>
      {
        <div className="flex flex-row flex-wrap items-center justify-center">
          <StravaActivity activityId={15321565084} />
          <StravaActivity activityId={15244547112} />
          <StravaActivity activityId={12925466896} />
          <StravaActivity activityId={12862826754} />
          <StravaActivity activityId={12760761570} />
          <StravaActivity activityId={12479331590} />
          <StravaActivity activityId={12243041155} />
          <StravaActivity activityId={12003541925} />
          <StravaActivity activityId={11615247255} />
          <StravaActivity activityId={11083832787} />
          <StravaActivity activityId={10764220229} />
          <StravaActivity activityId={10743237192} />
          <StravaActivity activityId={10553302412} />
          <StravaActivity activityId={10528377100} />
          <StravaActivity activityId={10474820310} />
          <StravaActivity activityId={10396237868} />
          <StravaActivity activityId={10265830140} />
          <StravaActivity activityId={10208737283} />
        </div>
      }{' '}
    </div>
  )
}
