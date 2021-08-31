import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Post from './post'

describe('postコンポーネントのテスト', () => {
  const id = 'ene01'
  test('共感削除時に共感数更新のコールバック関数が実行されること', async () => {
    const empathyRemove = jest.fn()
    render(<Post id={id} empathyRemove={empathyRemove} hasEmpathized={true} />)
    await userEvent.click(screen.getByTestId('post-empathyButton'))
    expect(empathyRemove).toHaveBeenCalledWith(id, '0')
    expect(empathyRemove).toHaveBeenCalledTimes(1)
  })
  test('共感追加時に共感数更新のコールバック関数が実行されること', async () => {
    const empathyAdd = jest.fn()
    render(<Post id={id} empathyAdd={empathyAdd} hasEmpathized={false} />)
    await userEvent.click(screen.getByTestId('post-empathyButton'))
    expect(empathyAdd).toHaveBeenCalledWith(id, '0')
    expect(empathyAdd).toHaveBeenCalledTimes(1)
  })
})
