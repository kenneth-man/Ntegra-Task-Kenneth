import { ReactComponent as NameIcon } from '../res/icons/drive_file_rename_outline.svg';
import { ReactComponent as DateIcon } from '../res/icons/calendar_today.svg';
import { ReactComponent as RocketIcon } from '../res/icons/rocket.svg';
import { ReactComponent as DetailsIcon } from '../res/icons/info.svg';

export const tableHeadingsData = [
    { 
        text:'Name',
        prop: 'name',
        icon: <NameIcon/>
    }, 
    { 
        text:'Launch date (UTC)',
        prop: 'date_utc',
        icon: <DateIcon/>
    }, 
    {
        text: 'Rocket ID',
        prop: 'rocket',
        icon: <RocketIcon/>
    }, 
    {
        text: 'Details',
        prop: 'details',
        icon: <DetailsIcon/>
    }
];