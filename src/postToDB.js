function postToDB(data, endpoint) {
  return fetch(`http://localhost:8000/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export default postToDB;
