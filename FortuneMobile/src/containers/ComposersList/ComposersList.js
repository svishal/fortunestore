import { connect } from 'react-redux';
import ComposersList from '../../components/ComposersList';
import { composersFetchRequested, setFiltersId } from '../../modules/ComposersList/actions';
import { getComposersSelector, getFiltersIdSelector } from '../../modules/ComposersList/selectors';

const mapStateToProps = (state) => {
  const composers = getComposersSelector(state);
  const filtersId = getFiltersIdSelector(state);
  const filteredComposers = composers[filtersId] || [];
  return {
    composers: filteredComposers,
  };
};

const mapDispatchToProps = dispatch => ({
  getComposers: () => dispatch(composersFetchRequested()),
  setFiltersId: filtersId => dispatch(setFiltersId(filtersId)),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(ComposersList);
