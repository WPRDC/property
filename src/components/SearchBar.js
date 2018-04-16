import React, {Component} from 'react';
import Input from 'material-ui/Input'
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui-icons/Search'

import injectSheet from 'react-jss';

const style = {
  metacontainer: {
    margin: '6px',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '454px'
  },
  container: {
    padding: '3px',
    display: 'flex',
  },
  icon: {
    padding: '6px 6px 0',
    flexGrow: '0'
  },
  input: {
    flexGrow: '1'
  }

};


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.query);
  };

  updateQuery = event => {
    this.setState({query: event.target.value});
  };

  render() {
    return (
      <div style={style.metacontainer}>
        <Paper style={style.container}>
          <SearchIcon style={style.icon}/>
          <form onSubmit={this.handleSubmit} style={{width: '100%'}}>
            <Input fullWidth={true} style={style.input}
                   placeholder={this.props.placeholder}
                   onChange={this.updateQuery}

            />
          </form>
        </Paper>
      </div>
    );
  }
}


export default SearchBar;