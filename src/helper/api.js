async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: '__cfduid = df9b865983bd04a5de2cf5017994bbbc71618565720',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function getData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: data.auth,
      Cookie: '__cfduid = df9b865983bd04a5de2cf5017994bbbc71618565720',
    },
  });
  return response.json();
}

export default {postData, getData};
