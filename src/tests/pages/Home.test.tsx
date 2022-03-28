import { render, screen } from '@testing-library/react'

import Home from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe('Home page', () => {
  it('renders correctly', () => {
    render(
      <Home
        product={{
          priceId: 'fake-id',
          amount: 'US$ 9.99',
        }}
      />
    )

    expect(screen.getByText('for US$ 9.99 month')).toBeInTheDocument()
  })
})
