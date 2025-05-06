import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import enUS from 'antd/locale/en_US';
import { App, ConfigProvider } from 'antd'
import '@/styles/global.scss'
import { AppProvider } from './context/app.context';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AppProvider>
        <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AppProvider>
    </App>
  </StrictMode>,
)
