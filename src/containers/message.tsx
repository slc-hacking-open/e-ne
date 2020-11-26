import { connect } from 'react-redux'

import { AppState } from '../store/store'
import Message from '../components/message'

interface StateProps {
  error: boolean
  message: string
}

const mapStateToProps = (state: AppState): StateProps => ({
  error: state.message.error,
  message: state.message.message,
})

export default connect(mapStateToProps)(Message)
