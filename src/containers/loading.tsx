import { connect } from 'react-redux'

import Loading from '../components/loading'
import { AppState } from '../reducer'

interface StateProps {
  isLoading: boolean
}

const mapStateToProps = (state: AppState): StateProps => ({
  isLoading: state.loading.loadingCount > 0,
})

export default connect(mapStateToProps)(Loading)
