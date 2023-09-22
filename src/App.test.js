import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  //render(どのコンポーネントをテストするか)
  render(<App />)
  //<App/>の中にlearn reactと書かれているかiは大文字小文字を無視する
  const linkElement = screen.getByText(/react/i)
  expect(linkElement).toBeInTheDocument()
})
