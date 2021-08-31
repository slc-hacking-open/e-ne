import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Posts from './posts'

describe('postsコンポーネントのテスト', () => {
  const pageNumber = 1
  test('ページネーション押下時にページ番号設定と表示カード設定のコールバック関数が実行されること', async () => {
    const setPageNumber = jest.fn()
    const setDisplayedCards = jest.fn()
    render(
      <Posts
        setPageNumber={setPageNumber}
        setDisplayedCards={setDisplayedCards}
        pageNumber={2}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: 'Go to page 1' }))
    expect(setPageNumber).toHaveBeenCalledWith(pageNumber)
    expect(setPageNumber).toHaveBeenCalledTimes(1)
    expect(setDisplayedCards).toHaveBeenCalledWith()
    expect(setDisplayedCards).toHaveBeenCalledTimes(1)
  })
})
