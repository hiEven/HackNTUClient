import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';


@connect(
  state => ({}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        account: '',
        password: ''
      }
    };
  }

  render() {
    require('./Login.scss');
    const {account, password} = this.state;
    return (
      <div className="login-form container">
        <form className="col s12 m12 l12" onSubmit={::this.handleSubmit} >
          <div className="row">
            <div className="input-field col s12 m12 l12">
              <input id="account" type="email" value={account} onChange={::this.handleChange} />
              <label htmlFor="account">Acount</label>
            </div>
            <div className="input-field col s12 m12 l12">
              <input id="password" type="password" value={password} onChange={::this.handleChange} />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn waves-effect waves-light lighten-1" type="submit" name="action">
              Login
            </button>
            <Link to="/register" className="btn waves-effect waves-light ">
              Register
            </Link>
          </div>
        </form>
      </div>
    );
  }

  handleChange(e) {
    const key   = e.target.id;
    const value = e.target.value;

    this.setState({
      [key]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    this.props.login(data);
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      //return store.dispatch(loadAuth());
    }
  }
}
