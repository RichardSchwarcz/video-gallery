function reducer(state, action) {
  let layout;
  switch (action.type) {
    case "switchTags":
      layout = {
        videos: (state.videos = false),
        playlists: (state.playlists = false),
        tags: (state.tags = true),
      };
      break;
    case "switchPlaylists":
      layout = {
        videos: (state.videos = false),
        playlists: (state.playlists = true),
        tags: (state.tags = false),
      };
      break;
    case "switchVideos":
      layout = {
        videos: (state.videos = true),
        playlists: (state.playlists = false),
        tags: (state.tags = false),
      };
      break;
    default:
      throw new Error();
  }
  return layout;
}

export default reducer;
