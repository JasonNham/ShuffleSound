const redirect_uri = "https://shufflesound.com/dashboard/";
const client_id = "4a95d45ca4f1456b9b897ba0d09708ba";
const client_secret = "0ff182f13fbd435493798eb341dfff60";
const TOKEN = "https://accounts.spotify.com/api/token";

function onPageLoad() {
  if (window.location.search.length > 0) {
    handleRedirect();
  }
}

function handleRedirect() {
  let code = getCode();
  fetchAccessToken(code);
  window.history.pushState("", "", redirect_uri);
}

function getCode() {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const params = new URLSearchParams(queryString);
    code = params.get("code");
  }
  return code;
}

function fetchAccessToken(code) {
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret;
  callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", TOKEN, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "Authorization",
    "Basic " + btoa(client_id + ":" + client_secret)
  );
  xhr.send(body);
  xhr.onload = handleAuhtorizationResponse;
}

function handleAuhtorizationResponse() {
  if (this.status == 200) {
    let response = JSON.parse(this.responseText);
    console.log(response);
    if (response.access_token) {
      access_token = response.access_token;
      localStorage.setItem("access_token", access_token);
    }
    if (response.refresh_token) {
      refresh_token = response.refresh_token;
      localStorage.setItem("refresh_token", refresh_token);
    }
    onPageLoad();
  } else {
    console.log("Error: " + this.status);
    alert(this.responseText);
  }
}

function requestAuthorization() {
  let url = "https://accounts.spotify.com/authorize";

  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + redirect_uri;
  url +=
    "&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
  window.location.href = url;
}
