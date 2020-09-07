import React, { Component } from 'react';
import './css/App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value,
      };
    });
  }

  render() {
    const { value } = this.state;

    return (
      <form>
        <h3>
          Some text in h3 <span>span within h3</span>
        </h3>
        <span>span outside h3</span>
        <input
          data-testid="test-id"
          type="text"
          value={value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default App;
