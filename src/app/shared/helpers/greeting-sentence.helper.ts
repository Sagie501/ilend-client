export function getGreetingSentence() {
  let hours = new Date().getHours();
  if (hours < 5) {
    return 'Good night';
  } else if (hours >= 5 && hours < 12) {
    return 'Good morning';
  } else if (hours >= 12 && hours < 19) {
    return 'Good afternoon';
  } else if (hours >= 19 && hours <= 23) {
    return 'Good evening';
  }
}
