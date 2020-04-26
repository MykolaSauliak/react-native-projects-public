export default function(array, key) {
  if (!array) {
    return [];
  }
  let DATA = [];
  /*
        [{title,data}]
    */
  array.forEach(e => {
    let title = e[key];
    title = title ? title.trim() : title;
    const SectionObj = DATA.filter(obj => obj.title == title)[0] || null;
    if (!SectionObj) {
      DATA = [...DATA, {title, data: [e]}];
    } else {
      SectionObj.data = [...SectionObj.data, e];
    }
  });
  return DATA;
}
