import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
    const { activityStore } = useStore();
    const { groupActivities } = activityStore;

    return (
        <>
            {groupActivities.map(([dateGroup, activitiesOfDate]) => (
                <Fragment key={dateGroup}>
                    <Header sub color="teal">
                        {dateGroup}
                    </Header>
                    {activitiesOfDate.map((activity) => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
    );
};

export default observer(ActivityList);
