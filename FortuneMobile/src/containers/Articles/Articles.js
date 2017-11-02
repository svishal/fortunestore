import { connect } from 'react-redux';
import Articles from '../../components/Articles';
import { articlesListRequested, getCustomerBalanceRequested,
   paymentRequested } from '../../modules/Articles/actions';
import { getErrorSelector, getArticlesDataSelector,
   getCustomerBalanceSelector, getLoadingSelector, getPaymentDataSelector, getIsSuccessSelector } 
from '../../modules/Articles/selectors';

const mapStateToProps = state => ({
  articlesData: getArticlesDataSelector(state),
  balanceData: getCustomerBalanceSelector(state),
  error: getErrorSelector(state),
  loading: getLoadingSelector(state),
  paymentData: getPaymentDataSelector(state),
  isSuccess: getIsSuccessSelector(state)
});

const mapDispatchToProps = dispatch => ({
  articlesListRequested: () => dispatch(articlesListRequested()),
  getCustomerBalanceRequested: (customerMobileNumber) =>
  dispatch(getCustomerBalanceRequested(customerMobileNumber)),
  paymentRequested: (fosId, customerId, payAmount) =>
   dispatch(paymentRequested(fosId, customerId, payAmount)),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Articles);
