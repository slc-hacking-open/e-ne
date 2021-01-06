import React from 'react'
import { render } from '@testing-library/react'
import Posts from './posts'

describe('postsコンポーネントのテスト', () => {
  test('コンポーネント表示時にpost取得のコールバック関数が実行されること', async () => {
    const getPosts = jest.fn()
    render(<Posts getPosts={getPosts} />)
    expect(getPosts).toHaveBeenCalledTimes(1)
    expect(getPosts).toHaveBeenCalledWith(
      'SLC／生保ソリューション第２部',
      '111111'
    )
  })
})
