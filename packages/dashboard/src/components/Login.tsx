import React from "react";
import { UserManager } from "oidc-client";

export class Login extends React.Component {
  public render = () => {
    return (
      <div>
        <div onClick={this.login}>{this.props.children}</div>
      </div>
    );
  }

  private login = async () => {
    const userManager = new UserManager({
      loadUserInfo: false,
      client_id: "ffce8ced-3cb0-411e-ba2b-2a6c4cf36470",
      prompt: "login",
      authority: "https://paddleboard.b2clogin.com/paddleboard.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_signup_signin",
      redirect_uri: `${window.location.origin}/auth/openid`,
      response_type: "id_token token",
      scope: "openid https://paddleboard.onmicrosoft.com/api/user.read.all"
    });

    try {
      await userManager.signinRedirect();
    }
    catch (e) {
      console.log(e);
    }
  }
}
