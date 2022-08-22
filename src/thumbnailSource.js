function thumbnailSource(url) {
  function urlIsValid(url) {
    if (url.length <= 11) {
      return url + "v=lalalalallalalalalala";
    } else {
      return url;
    }
  }

  function getYTID(url) {
    // https://www.youtube.com/watch?v=Y7cw-ziofkY&ab_channel=CodingShiksha
    // youtube video ID starts after `?v=` and ends before `&` => `Y7cw-ziofkY`
    // youtube video ID is 11 characters long
    return url.split("v=")[1].substring(0, 11);
  }

  function getImageSource(id) {
    // youtube thumbnail API
    return `https://img.youtube.com/vi/${id}/0.jpg`;
  }

  return getImageSource(getYTID(urlIsValid(url)));
}

export default thumbnailSource;
