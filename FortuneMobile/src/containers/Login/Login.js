import { connect } from 'react-redux';
import Login from '../../components/Login';
import { loginRequested } from '../../modules/Login/actions';
import { getErrorSelector, getLoadingSelector } from '../../modules/Login/selectors';

const mapStateToProps = state => ({
  error: getErrorSelector(state),
 loading: getLoadingSelector(state)
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (login, passwordInput) => dispatch(loginRequested(login, passwordInput))
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
