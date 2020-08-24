import React from 'react'
import { render } from '@testing-library/react'
import { __name__ } from './__name__'

test('TODO', () => {
  const { getByText } = render(<__name__ />)
  expect(getByText(/hello, world/)).toBeInTheDocument()
})
