import React, { Component } from 'react';

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
