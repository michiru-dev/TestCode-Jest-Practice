import userEvent from '@testing-library/user-event'
import Login, { validateEmail } from '../Login'
import { render, screen } from '@testing-library/react'

//package.jsonのtestのscriptのとこに--verboseを足すとテストファイルごとの結果ではなくテストファイル内の各テストケースごとの結果を表示
// こんな感じ"test": "react-scripts test --verbose"

describe('Test Login Component', () => {
  test('render form with 1 button', async () => {
    render(<Login />)
    const buttonList = await screen.findAllByRole('button')
    expect(buttonList).toHaveLength(1) //ボタンが1つあるかテスト
  })

  test('shold be faild on email validation', () => {
    const testEmail = 'michiru.com'
    //間違っているのが正しい（これはテストなので、わざと間違えさせる）
    expect(validateEmail(testEmail)).not.toBe(true)
  })

  //メールの入力欄はメールを受け付ける
  test('shold be successed on email validation', () => {
    const testEmail = 'michiru@gmail.com'
    expect(validateEmail(testEmail)).toBe(true)
  })

  //パスワード欄がパスワードタイプで入力できるかを確認
  test('password input should have type password', () => {
    render(<Login />)
    const password = screen.getByPlaceholderText('パスワード入力')
    expect(password).toHaveAttribute('type', 'password')
  })

  test('should be able to submit the form', async () => {
    render(<Login />)
    const submitButton = screen.getByTestId('submit')
    const email = screen.getByPlaceholderText('メールアドレス入力')
    const password = screen.getByPlaceholderText('パスワード入力')

    userEvent.type(email, 'michiru@gmail.com') //実際のemailのinputに入力するのと同じ
    userEvent.type(password, 'abcdef')

    await userEvent.click(submitButton)
    const userInfo = screen.getByText('michiru@gmail.com')
    expect(userInfo).toBeInTheDocument()
  })
})
