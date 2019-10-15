import React from "react";
import { UserManager } from "oidc-client";

export class Auth extends React.Component {
  public  componentDidMount(){
    const userManager = new UserManager({
      client_id: "ffce8ced-3cb0-411e-ba2b-2a6c4cf36470",
      prompt: "login",
      authority: "https://paddleboard.b2clogin.com/paddleboard.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_sign_up_sign_in",
      redirect_uri: "http://localhost:3000/auth/openid",
      response_type: "id_token",
      scope: "openid"
    });

    userManager.signinPopupCallback();
  }

  public render() {
    return null;
  }
}
