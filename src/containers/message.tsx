import { connect } from 'react-redux'

import Message from '../components/message'
import { AppState } from '../reducer'

interface StateProps {
  error: boolean
  message: string
}

const mapStateToProps = (state: AppState): StateProps => ({
  error: state.message.error,
  message: state.message.message,
})

export default connect(mapStateToProps)(Message)
