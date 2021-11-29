function bodySlice(body) {
  if (body.indexOf("Click your Nubo reset password link ") != -1) {
    body = body.substring(36, body.length);
  }
  return body;
}

body = "Click your Nubo resssset password link http://dadddddddskjbdajkshdkjas";
console.log(bodySlice(body));
