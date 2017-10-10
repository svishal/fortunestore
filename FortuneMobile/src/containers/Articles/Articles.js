import { connect } from 'react-redux';
import Articles from '../../components/Articles';
import { articlesListRequested } from '../../modules/Articles/actions';
import { getErrorSelector, getArticlesDataSelector } from '../../modules/Articles/selectors';

const mapStateToProps = state => ({
  articlesData: getArticlesDataSelector(state),
  error: getErrorSelector(state),
});

const mapDispatchToProps = dispatch => ({
    articlesListRequested: () => dispatch(articlesListRequested()),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Articles);
