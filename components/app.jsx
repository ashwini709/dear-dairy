import React from "react";

import '../styles/app.less';

class App extends React.Component {
  render() {
    return (
      <div className="dairy-entry-app">
        { this.props.children }
      </div>
    );
  }
}

export default App;
