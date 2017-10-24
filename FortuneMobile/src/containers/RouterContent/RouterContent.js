import { connect } from 'react-redux';
import RouterContent from '../../components/RouterContent';
import { sceneUpdated } from '../../modules/RouterContent/actions';

const mapDispatchToProps = dispatch => ({
  updateScene: sceneName => dispatch(sceneUpdated(sceneName)),
});

module.exports = connect(null, mapDispatchToProps)(RouterContent);
