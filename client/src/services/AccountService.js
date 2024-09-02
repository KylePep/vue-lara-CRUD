import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { api } from './AxiosService'
import { bucketService } from "./BucketService.js"

class AccountService {
  async getAccount(accountData) {
    const res = await api.post('api/login', accountData)
    AppState.account = new Account(res.data.user)
    AppState.auth_token = res.data.token
    bucketService.getBuckets()
  }

  async createAccount(accountData) {
    const res = await api.post('api/register', accountData)
    AppState.account = new Account(res.data.user)
    AppState.auth_token = res.data.token
  }

  async logOutAccount() {
    const res = await api.post('api/logout', {}, {
      headers: {
        Authorization: `Bearer ${AppState.auth_token}`,
      }
    })
    AppState.account = {}
    AppState.auth_token = {}
    return res.data
  }
}

export const accountService = new AccountService()
