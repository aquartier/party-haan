import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('web server', () => {
  it('up and running without crashing', async () => {
    const { unmount } = render(<App />)
    await new Promise((resolve) => {
      process.nextTick(() => {
        unmount()
        resolve()
      })
    })
  })
})
