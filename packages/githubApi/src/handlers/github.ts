import { CloudContext } from "@multicloud/sls-core";
import { app } from "../app";
import { config } from "../config"
import axios from "axios";

const middlewares = config();

export const authorize = app.use(middlewares, async (context: CloudContext) => {
  const code = context.req.query.get("code");
  if (!code) {
    return context.send("Invalid request", 400);
  }

  const state = context.req.query.get("state") || "";
  const installationId = context.req.query.get("installation_id");

  // Get access token
  const response = await axios.post("https://github.com/login/oauth/access_token", {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: code,
    redirect_uri: process.env.GITHUB_REDIRECT_URI,
    state: state
  }, {
    headers: {
      "accept": "application/json"
    }
  });

  const token = response.data.access_token;

  // Get the user
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      "authorization": `token ${token}`,
      "accept": "application/json"
    }
  });

  // Get installations
  const installations = await axios.get("https://api.github.com/user/installations", {
    headers: {
      "authorization": `token ${token}`,
      "accept": "application/json"
    }
  });

  // Get installation
  const installation = await axios.get(`https://api.github.com/user/installations/${installationId}/repositories`, {
    headers: {
      "authorization": `token ${token}`,
      "accept": "application/json"
    }
  });

  context.send({
    access_token: response.data,
    user: userResponse.data,
    installations: installations.data,
    installation: installation.data
  }, 200);
});

export const hook = app.use(middlewares, (context: CloudContext) => {
  context.send("OK", 200);
});
