import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import Post from '../components/post'
import { PostAction, empathy } from '../store/actions/post'

import { AppState } from '../store/store'

interface DispatchProps {
  empathy: (userId: string, postId: string) => void
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, undefined, PostAction>
): DispatchProps => ({
  empathy: (userId, postId) => dispatch(empathy(userId, postId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
