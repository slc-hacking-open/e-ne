import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Sender from './sender'

describe('senderコンポーネントのテスト', () => {
  test('コンポーネント表示時にユーザーリスト取得のコールバック関数が実行されること', async () => {
    expect(true).toBe(true)
    const getUserList = jest.fn()
    render(<Sender getUserList={getUserList} senderEneCoin={0} />)
    expect(getUserList).toHaveBeenCalledTimes(1)
    expect(getUserList).toHaveBeenCalledWith()
  })
  test('内容変更時に内容変更のコールバック関数が実行されること', async () => {
    const onChangeContents = jest.fn()
    render(<Sender changeContents={onChangeContents} senderEneCoin={0} />)
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
        enecoin: 0,
        glicocoin: 0,
      },
      {
        userid: 'user02',
        department: 'ソリューション２部',
        name: '生保太郎',
        profile: '趣味はプラモデル',
        imageurl: 'url2',
        enecoin: 0,
        glicocoin: 0,
      },
    ]
    const getUserList = jest.fn()
    const onChangeTo = jest.fn()
    render(
      <Sender
        users={users}
        changeTo={onChangeTo}
        getUserList={getUserList}
        senderEneCoin={0}
      />
    )
    await userEvent.type(screen.getByLabelText('宛先'), '生保')
    expect(onChangeTo).toHaveBeenNthCalledWith(1, '生')
    expect(onChangeTo).toHaveBeenNthCalledWith(2, '生保')
    expect(onChangeTo).toHaveBeenCalledTimes(2)
  })
  test('コイン変更時にコイン変更のコールバック関数が実行されること', async () => {
    const onChangeCoin = jest.fn()
    render(<Sender changeCoin={onChangeCoin} senderEneCoin={0} />)
    await userEvent.type(screen.getByPlaceholderText('コイン'), '105')
    expect(onChangeCoin).toHaveBeenNthCalledWith(1, '1')
    expect(onChangeCoin).toHaveBeenNthCalledWith(2, '0')
    expect(onChangeCoin).toHaveBeenNthCalledWith(3, '5')
    expect(onChangeCoin).toHaveBeenCalledTimes(3)
  })

  test('内容がブランクの場合、エラーメッセージが表示され、いいねボタンを押下しても処理が実行されないこと', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents=""
        to="user01"
        coin="5"
        sendEne={sendEne}
        clear={clear}
        senderEneCoin={100}
      />
    )
    await userEvent.click(screen.getByPlaceholderText('内容'))
    await userEvent.tab()
    expect(screen.getByText('内容を入力してください')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledTimes(0)
    expect(clear).toHaveBeenCalledTimes(0)
  })
  test('宛先がブランクの場合、エラーメッセージが表示され、いいねボタンを押下しても処理が実行されないこと', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents="ありがとう"
        to=""
        coin="5"
        sendEne={sendEne}
        clear={clear}
        senderEneCoin={100}
      />
    )
    await userEvent.click(screen.getByLabelText('宛先'))
    await userEvent.tab()
    expect(screen.getByText('宛先を入力してください')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledTimes(0)
    expect(clear).toHaveBeenCalledTimes(0)
  })

  test('コインがブランクの場合、エラーメッセージが表示され、いいねボタンを押下しても処理が実行されないこと', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents="ありがとう"
        to="user01"
        coin=""
        sendEne={sendEne}
        clear={clear}
        senderEneCoin={100}
      />
    )
    await userEvent.click(screen.getByPlaceholderText('コイン'))
    await userEvent.tab()
    expect(
      screen.getByText('送信コインは１～１０の範囲を指定してください')
    ).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledTimes(0)
    expect(clear).toHaveBeenCalledTimes(0)
  })

  test('内容、宛先、コインがいずれもブランク以外の場合、いいねボタンが押下すると処理が実行されること', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents="ありがとう"
        to="user01"
        coin="5"
        sendEne={sendEne}
        clear={clear}
        senderEneCoin={100}
      />
    )
    expect(screen.getByTestId('sender-button')).toBeEnabled()
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledWith('0', 'user01', 'ありがとう', '5')
    expect(sendEne).toHaveBeenCalledTimes(1)
    expect(clear).toHaveBeenCalledTimes(1)
  })

  test('内容が140字以上の場合、エラーメッセージが表示され、いいねボタンを押下しても処理が実行されないこと', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよら"
        to="user01"
        coin="5"
        sendEne={sendEne}
        clear={clear}
        senderEneCoin={100}
      />
    )
    await userEvent.click(screen.getByPlaceholderText('内容'))
    await userEvent.tab()
    expect(
      screen.getByText('内容は140字以内で入力してください')
    ).toBeInTheDocument()
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
        coin="5"
        sendEne={sendEne}
        clear={clear}
        senderEneCoin={100}
      />
    )
    await userEvent.click(screen.getByPlaceholderText('内容'))
    await userEvent.tab()
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledWith(
      '0',
      'user01',
      'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわをんんんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよ',
      '5'
    )
    expect(sendEne).toHaveBeenCalledTimes(1)
    expect(clear).toHaveBeenCalledTimes(1)
  })

  test('送信コインが所持コインが上回っている場合、エラーメッセージが表示され、いいねボタンを押下しても処理が実行されないこと', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents="ありがとう"
        to="user01"
        coin="5"
        sendEne={sendEne}
        clear={clear}
        senderEneCoin={1}
      />
    )
    await userEvent.click(screen.getByPlaceholderText('コイン'))
    await userEvent.tab()
    expect(
      screen.getByText('送信コインは所持コイン以下の枚数を指定してください')
    ).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledTimes(0)
    expect(clear).toHaveBeenCalledTimes(0)
  })

  test('送信コインが所持コインと同数の場合、いいねのコールバック関数とクリアのコールバック関数が実行されること', async () => {
    const sendEne = jest.fn()
    const clear = jest.fn()
    render(
      <Sender
        contents="ありがとう"
        to="user01"
        coin="5"
        sendEne={sendEne}
        clear={clear}
        senderEneCoin={5}
      />
    )
    await userEvent.click(screen.getByPlaceholderText('コイン'))
    await userEvent.tab()
    await userEvent.click(screen.getByTestId('sender-button'))
    expect(sendEne).toHaveBeenCalledWith('0', 'user01', 'ありがとう', '5')
    expect(sendEne).toHaveBeenCalledTimes(1)
    expect(clear).toHaveBeenCalledTimes(1)
  })
})
