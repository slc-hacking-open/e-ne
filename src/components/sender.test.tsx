import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sender from './sender'

describe('senderコンポーネントのテスト', () => {
  test('コンポーネント表示時にユーザーリスト取得のコールバック関数が実行されること', async () => {
    const getUserList = jest.fn()
    render(<Sender getUserList={getUserList} />)
    expect(getUserList).toHaveBeenCalledTimes(1)
    expect(getUserList).toHaveBeenCalledWith()
  })
  test('内容変更時に内容変更のコールバック関数が実行されること', async () => {
    const onChangeContents = jest.fn()
    render(<Sender changeContents={onChangeContents} />)
    await userEvent.type(screen.getByPlaceholderText('内容'), 'test')
    expect(onChangeContents).toHaveBeenNthCalledWith(1, 't')
    expect(onChangeContents).toHaveBeenNthCalledWith(2, 'e')
    expect(onChangeContents).toHaveBeenNthCalledWith(3, 's')
    expect(onChangeContents).toHaveBeenNthCalledWith(4, 't')
    expect(onChangeContents).toHaveBeenCalledTimes(4)
  })
  test('宛先変更時に宛先変更のコールバック関数が実行されること', async () => {
    const users = [
      {
        userid: 'user01',
        department: 'ソリューション部',
        name: '生保花子',
        profile: '趣味は園芸',
        imageurl: 'url',
      },
      {
        userid: 'user02',
        department: 'ソリューション２部',
        name: '生保太郎',
        profile: '趣味はプラモデル',
        imageurl: 'url2',
      },
    ]
    const getUserList = jest.fn()
    const onChangeTo = jest.fn()
    render(
      <Sender users={users} changeTo={onChangeTo} getUserList={getUserList} />
    )
    await userEvent.type(screen.getByLabelText('宛先'), '生保')
    expect(onChangeTo).toHaveBeenNthCalledWith(1, '生')
    expect(onChangeTo).toHaveBeenNthCalledWith(2, '生保')
    expect(onChangeTo).toHaveBeenCalledTimes(2)
  })
  test('コイン変更時にコイン変更のコールバック関数が実行されること', async () => {
    const onChangeCoin = jest.fn()
    render(<Sender changeCoin={onChangeCoin} />)
    await userEvent.type(screen.getByPlaceholderText('コイン'), '105')
    expect(onChangeCoin).toHaveBeenNthCalledWith(1, '1')
    expect(onChangeCoin).toHaveBeenNthCalledWith(2, '0')
    expect(onChangeCoin).toHaveBeenNthCalledWith(3, '5')
    expect(onChangeCoin).toHaveBeenCalledTimes(3)
  })

  test('内容がブランクでいいねボタンを押下したとき、いいねのコールバック関数とクリアのコールバック関数が実行されないこと', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(<Sender to="user01" coin="100" sendEne={sendEne} clear={clear} />)
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledTimes(0)
    expect(clear).toHaveBeenCalledTimes(0)
  })
  test('宛先がブランクでいいねボタンを押下したとき、いいねのコールバック関数とクリアのコールバック関数が実行されないこと', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender contents="contents" coin="100" sendEne={sendEne} clear={clear} />
    )
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledTimes(0)
    expect(clear).toHaveBeenCalledTimes(0)
  })

  test('内容と宛先がブランク以外でいいねボタンを押下したとき、いいねのコールバック関数とクリアのコールバック関数が実行されること', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender contents="contents" to="user01" sendEne={sendEne} clear={clear} />
    )
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledWith('0', 'user01', 'contents')
    expect(sendEne).toHaveBeenCalledTimes(1)
    expect(clear).toHaveBeenCalledTimes(1)
  })

  test('内容が140字以上でいいねボタンを押下したとき、いいねのコールバック関数とクリアのコールバック関数が実行されないこと', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよら"
        to="user01"
        sendEne={sendEne}
        clear={clear}
      />
    )
    await userEvent.click(screen.getByTestId('sender-contents'))
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledTimes(0)
    expect(clear).toHaveBeenCalledTimes(0)
  })

  test('内容が140字でいいねボタンを押下したとき、いいねのコールバック関数とクリアのコールバック関数が実行されること', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよ"
        to="user01"
        sendEne={sendEne}
        clear={clear}
      />
    )
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledWith(
      '0',
      'user01',
      'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよ'
    )
    expect(sendEne).toHaveBeenCalledTimes(1)
    expect(clear).toHaveBeenCalledTimes(1)
  })
})
