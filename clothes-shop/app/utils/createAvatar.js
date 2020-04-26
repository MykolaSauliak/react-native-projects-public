const createAvatar = ({firstName, last_name, abbreviatedName, colorsArray}) => {
  // all credits goes to https://codepen.io/leecrossley/pen/CBHca?editors=1010
  if (!abbreviatedName) {
    // eslint-disable-next-line no-param-reassign
    abbreviatedName =
      firstName.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase();
  }

  const charIndex = abbreviatedName.charCodeAt(0) - 65;
  const colorIndex = charIndex % colorsArray.length;

  return {
    abbreviatedName,
    color: colorsArray[colorIndex],
  };
};

export default createAvatar;
