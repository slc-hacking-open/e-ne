import { connect } from 'react-redux'
import Loading from '../components/loading'
import { RootState } from '../rootReducer'

interface StateProps {
  isLoading: boolean
}

const mapStateToProps = (state: RootState): StateProps => ({
  isLoading: state.posts.loadingCount > 0,
})

export default connect(mapStateToProps)(Loading)
