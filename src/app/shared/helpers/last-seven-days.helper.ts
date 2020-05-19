const DAYS_NAMES: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const getLastSevenDays = () => {
  let today = new Date();
  let daysSorted = [];

  for (let i = 0; i < DAYS_NAMES.length; i++) {
    let newDate = new Date(today.setDate(today.getDate() - 1));
    daysSorted.push(DAYS_NAMES[newDate.getDay()]);
  }

  return daysSorted;
};
