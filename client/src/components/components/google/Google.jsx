import React from "react";
import { GoogleLogin } from "react-google-login";
// import { useHistory } from "react-router-dom";


export default function Google() {
  // const history = useHistory()
  const responseGoogle = (response) => {
    // history.push('/home')
  }
  return (
    <div>
      <GoogleLogin
    clientId="433172526717-rdi8h6tc3cco0k1d45pc5e5o70kphts0.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
    </div>
  );
}
