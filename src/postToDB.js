function postToDB(data) {
  return fetch("http://localhost:8000/videos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export default postToDB;
