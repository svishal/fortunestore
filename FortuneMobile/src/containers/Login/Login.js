import { connect } from 'react-redux';
import Login from '../../components/Login';
import { loginRequested } from '../../modules/Login/actions';
import { getErrorSelector } from '../../modules/Login/selectors';

const mapStateToProps = state => ({
  error: getErrorSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (login, passwordInput) => dispatch(loginRequested(login, passwordInput))
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
