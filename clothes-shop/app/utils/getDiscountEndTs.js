export default function(date) {
  let datum = Date.parse(date);
  return datum / 1000;
}
