import { createBrowserRouter } from 'react-router-dom'

import { DashboardPage } from './pages/app/dashboard'
import { SignInPage } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  { path: '/', element: <DashboardPage /> },
  { path: '/sign-in', element: <SignInPage /> },
])
