import { ipcMain } from 'electron'
import { AuthenticationService } from '../services/AuthenticationService'
import { LoggerService } from '../services/LoggerService'

export function registerAuthIPCHandlers() {
  const authService = AuthenticationService.getInstance()
  const logger = LoggerService.getInstance()

  ipcMain.handle('auth:register', async (_, name: string, email: string, passwordString: string) => {
    try {
      const user = await authService.register(name, email, passwordString)
      return { success: true, data: user }
    } catch (error: any) {
      logger.warn(`IPC Register handler caught error: ${error.message}`, 'AuthIPC')
      return { success: false, error: error.message || 'Registration failed.' }
    }
  })

  ipcMain.handle('auth:login', async (_, email: string, passwordString: string, rememberMe: boolean) => {
    try {
      const result = await authService.login(email, passwordString, rememberMe)
      return { success: true, data: result }
    } catch (error: any) {
      logger.warn(`IPC Login handler caught error: ${error.message}`, 'AuthIPC')
      return { success: false, error: error.message || 'Login failed.' }
    }
  })

  ipcMain.handle('auth:logout', async () => {
    try {
      await authService.logout()
      return { success: true }
    } catch (error: any) {
      logger.error('IPC Logout handler error', error, 'AuthIPC')
      return { success: false, error: error.message || 'Logout failed.' }
    }
  })

  ipcMain.handle('auth:checkSession', async () => {
    try {
      const user = await authService.checkSession()
      return { success: true, data: user }
    } catch (error: any) {
      logger.debug(`IPC CheckSession handler error: ${error.message}`, 'AuthIPC')
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('auth:resetPassword', async (_, email: string) => {
    try {
      const token = await authService.requestPasswordReset(email)
      return { success: true, data: { token } }
    } catch (error: any) {
      logger.warn(`IPC ResetPassword handler error: ${error.message}`, 'AuthIPC')
      return { success: false, error: error.message || 'Failed to request password reset.' }
    }
  })
}
