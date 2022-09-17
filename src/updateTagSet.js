// Functions to handle renaming and deleting tags
// These functions synchronize tags and videoCard.

export function getTaggedVideos(videoData, elementTag) {
  return videoData?.data
    .map((video) => {
      if (video.tags.includes(elementTag)) {
        return video;
      } else {
        return null;
      }
    })
    .filter((tag) => tag != null);
}

export function renameTagSet(taggedVideos, outDatedTag, renamedTag) {
  // taggedVideos: array of objects
  taggedVideos.forEach((video) => {
    const index = video.tags.indexOf(outDatedTag);
    video.tags[index] = renamedTag;
  });
  return taggedVideos;
  // returns array of objects (videos)
}

export function reduceTagSet(taggedVideos, outDatedTag) {
  // taggedVideos: array of objects
  taggedVideos.forEach((video) => {
    const index = video.tags.indexOf(outDatedTag);
    video.tags.splice(index, 1);
  });
  return taggedVideos;
  // returns array of objects (videos)
}

export function emptyInput(renamedTag) {
  if (renamedTag === "") {
    return true;
  } else {
    return false;
  }
}

export function tagIsAssigned(taggedVideos) {
  if (taggedVideos.length === 0) {
    return false;
  } else {
    return true;
  }
}
