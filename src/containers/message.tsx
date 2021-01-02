import { connect } from 'react-redux'
import Message from '../components/message'
import { RootState } from '../rootReducer'

interface StateProps {
  error: boolean
  message: string
}

const mapStateToProps = (state: RootState): StateProps => ({
  error: state.posts.error,
  message: state.posts.message,
})

export default connect(mapStateToProps)(Message)
