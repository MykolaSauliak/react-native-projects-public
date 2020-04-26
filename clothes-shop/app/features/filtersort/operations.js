import {filtersort} from './constants';

export const sort = (items, sortBy) => {
  // console.log('sortBy',sortBy)
  // let filteredSounds = getFilteredSounds(getState());
  let newFilteredSounds = [];
  switch (sortBy) {
    case filtersort.ratingAsc:
      newFilteredSounds = items.sort((a, b) => a.avgRating - b.avgRating);
      break;
    case filtersort.dateDesc:
      newFilteredSounds = items.sort((a, b) => {
        let dateA = new Date(a.date); // some mock date
        let dateB = new Date(b.date); // some mock date
        let millisecondsA = dateA.getTime();
        let millisecondsB = dateB.getTime();
        return millisecondsA - millisecondsB;
      });
      break;
    case filtersort.ratingDesc:
      newFilteredSounds = items.sort((a, b) => b.avgRating - a.avgRating);
      break;
    case filtersort.sizeAsc:
      newFilteredSounds = items.sort((a, b) => a.size - b.size);
      break;
    case filtersort.sizeDesc:
      newFilteredSounds = items.sort((a, b) => b.size - a.size);
      break;
    case filtersort.downloaded:
      newFilteredSounds = items.sort((a, b) => {
        let a1 = a.downloaded == true ? 0 : 1;
        let b1 = b.downloaded == true ? 0 : 1;
        return a1 - b1;
      });
      break;
    case filtersort.timeDesc:
      newFilteredSounds = items.sort((a, b) => {
        return Number(b.durationMin) - Number(a.durationMin);
      });
      break;
    case filtersort.timeAsc:
      newFilteredSounds = items.sort((a, b) => {
        return Number(a.durationMin) - Number(b.durationMin);
      });
      break;
    case filtersort.favorite:
      newFilteredSounds = items.sort((a, b) => {
        let a1 = a.favorite == true ? 0 : 1;
        let b1 = b.favorite == true ? 0 : 1;
        return a1 - b1;
      });
      break;
  }
  return newFilteredSounds;
};
