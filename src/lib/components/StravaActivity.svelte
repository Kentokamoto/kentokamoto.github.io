<script lang="ts">
    interface Props {
        activityId: number
    }

    let { activityId }: Props = $props()
</script>

<div class="mx-2 my-1 w-xs sm:w-sm">
    <div
        class="strava-embed-placeholder"
        data-embed-type="activity"
        data-embed-id={activityId}
        data-style="standard"
        data-from-embed="false"
    ></div>
</div>
