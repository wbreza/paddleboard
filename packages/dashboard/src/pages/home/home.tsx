import React from "react";
import { Login } from "../../components/Login";

export class Home extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <Login>
            <img src="/logo512.png" className="App-logo" alt="logo" />
          </Login>
          <p>
            Welcome to Paddleboard.
        </p>
        </header>
      </div>
    );
  }
}
