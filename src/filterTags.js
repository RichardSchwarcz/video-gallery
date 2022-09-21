function filterTags(query, tagsData) {
  const queryLowerCase = query.toLowerCase();

  const filteredTags = tagsData?.data
    .map((tag) => {
      const tagLowerCase = tag.tag.toLowerCase();

      if (tagLowerCase.includes(queryLowerCase)) {
        return tag;
      } else {
        return null;
      }
    })
    .filter((tag) => tag != null);
  return filteredTags;
}

export default filterTags;
