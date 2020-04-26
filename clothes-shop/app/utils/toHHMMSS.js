export default function(string) {
  var sec_num = parseInt(string, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (hours < 1) {
    return minutes + ':' + seconds;
  } else {
    if (hours < 10) {
      hours = '0' + hours;
    }
    return hours + ':' + minutes + ':' + seconds;
  }
}
