import { connect } from 'react-redux';
import Articles from '../../components/Articles';
import { articlesListRequested, getCustomerBalanceRequested } from '../../modules/Articles/actions';
import { getErrorSelector, getArticlesDataSelector, getCustomerBalanceSelector, getLoadingSelector } 
from '../../modules/Articles/selectors';

const mapStateToProps = state => ({
  articlesData: getArticlesDataSelector(state),
  balanceData: getCustomerBalanceSelector(state),
  error: getErrorSelector(state),
  loading: getLoadingSelector(state)
});

const mapDispatchToProps = dispatch => ({
  articlesListRequested: () => dispatch(articlesListRequested()),
  getCustomerBalanceRequested: (customerMobileNumber) =>
  dispatch(getCustomerBalanceRequested(customerMobileNumber))

});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Articles);
