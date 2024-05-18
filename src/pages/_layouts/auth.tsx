import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <header>
        <h1>Auth Layout</h1>
      </header>
      <Outlet />
    </>
  )
}
