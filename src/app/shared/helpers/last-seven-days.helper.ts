import * as moment from 'moment';

const DAYS_NAMES: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getLastSevenDays = () => {
  let today = new Date();
  let daysSorted = [];

  for (let i = DAYS_NAMES.length - 1; i >= 0; i--) {
    let dayNumber = moment().startOf('day').subtract(i, 'day').day().toString();
    daysSorted.push(DAYS_NAMES[dayNumber]);
  }

  return daysSorted;
};
