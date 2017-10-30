import { connect } from 'react-redux';
import Payment from '../../components/Payment';
import { paymentRequested, clearAddMessage } from '../../modules/Payment/actions';
import { getErrorSelector, getAddMessageSelector, getLoadingSelector } from '../../modules/Payment/selectors';

const mapStateToProps = state => ({
  paymentData: paymentRequested(state),
  error: getErrorSelector(state),
  addMessage: getAddMessageSelector(state),
  loading: getLoadingSelector(state)
});

const mapDispatchToProps = dispatch => ({
    paymentRequested: (fosId, customerId, selectedItemsArray, amountToBePaid) => 
    dispatch(paymentRequested(fosId, customerId, selectedItemsArray, amountToBePaid)),
    clearAddMessage: () => dispatch(clearAddMessage()),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Payment);
