import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'

import { stripe } from '../../services/stripe'

import Home, { getStaticProps } from '../../pages'

jest.mock('next/router')
jest.mock('../../services/stripe.ts')
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

  it('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 999
    } as any)

    const response = await getStaticProps({})

    console.log(response)
  })
})
