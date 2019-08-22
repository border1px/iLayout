import * as types from './mutation-types'

// 用了，但意义不大
export function getUserInfo ({ commit }, memberid) {
  return new Promise((resolve, reject) => {
    axios.get('/Member/GetMember', {
      memberId: memberid
    }).then(res => {
      if (!res.data.isError) {
        const user = res.data.data
        // var udata = {real_name:user.real_name,email:user.email.email}

        commit(types.INIT_USER_INFO, { user })
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
  })
}
