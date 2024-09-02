import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount(accountData) {
    try {
      const res = await api.post('api/login', accountData)
      AppState.account = new Account(res.data.user)
      AppState.auth_token = res.data.token
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async createAccount(accountData) {
    try {
      const res = await api.post('api/register', accountData)
      AppState.account = new Account(res.data.user)
      AppState.auth_token = res.data.token
    } catch (error) {
      logger.error(error.message, '[Failed to create account]')
    }
  }

  async logOutAccount() {
    try {
      const res = await api.post('api/logout', {}, {
        headers: {
          Authorization: `Bearer ${AppState.auth_token}`,
        }
      })
      AppState.account = {}
      AppState.auth_token = {}
      return res.data
    } catch (error) {
      logger.error(error.message, '[Failed to log account out]')
    }
  }
  // async editAccount(accountData) {
  //   const res = await api.put(`/account`, accountData)
  //   const account = new Account(res.data)
  //   AppState.account = account
  // }

  // async getAccountVaults() {
  //   const res = await api.get(`/account/vaults`)
  //   const vaults = res.data.map(v => new Vault(v))
  //   AppState.vaults = vaults
  // }
}

export const accountService = new AccountService()
