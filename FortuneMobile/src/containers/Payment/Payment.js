import { connect } from 'react-redux';
import Payment from '../../components/Payment';
import { paymentRequested } from '../../modules/Payment/actions';
import { getErrorSelector } from '../../modules/Payment/selectors';

const mapStateToProps = state => ({
  paymentData: paymentRequested(state),
  error: getErrorSelector(state),
});

const mapDispatchToProps = dispatch => ({
    paymentRequested: (fosId, customerId, selectedItemsArray, amountToBePaid) => 
    dispatch(paymentRequested(fosId, customerId, selectedItemsArray, amountToBePaid)),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Payment);
