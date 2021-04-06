// import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
// import { logout } from '@/api/users'
// import { getSSO, decodeSSO, decoceERP } from '@/utils/cookies'
// // import router, { resetRouter } from '@/router'
// // import { PermissionModule } from './permission'
// // import { TagsViewModule } from './tags-view'
// import store from '@/store'
// import { isEmpty } from 'lodash-es'

import { decodeSSO, getSSO } from '@/utils/cookies';
import { isEmpty } from 'lodash-es';
import { reactive, readonly } from 'vue';
import { logout } from '@/api/account';

// export interface IUserErp {
//   email: string;
//   expire: number;
//   fullname: string;
//   hrmDeptId: string;
//   mobile: string;
//   orgId: string;
//   orgName: string;
//   personId: string;
//   tenantCode: string;
//   userId: number;
//   username: string;
// }

export interface IUserState {
  token: string | null;
  name: string;
  avatar: string;
  introduction: string;
  // exp: number;
  // erp?: IUserErp;
  roles: string[];
  email: string;
}

const initState: IUserState = {
  token: null, // getSSO() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: ''
  // exp: Number.MIN_VALUE
};

// @Module({ dynamic: true, store, name: 'user' })
// class User extends VuexModule implements IUserState {

//   // @Mutation
//   // private SET_TOKEN(token: string) {
//   //   this.token = token
//   // }

//   @Mutation
//   private SET_NAME(name: string) {
//     this.name = name
//   }

//   @Mutation
//   private SET_AVATAR(avatar: string) {
//     this.avatar = avatar
//   }

//   @Mutation
//   private SET_INTRODUCTION(introduction: string) {
//     this.introduction = introduction
//   }

//   @Mutation
//   private SET_ROLES(roles: string[]) {
//     this.roles = roles
//   }

//   @Mutation
//   private SET_EXP(exp: number) {
//     this.exp = exp
//   }

//   @Mutation
//   private SET_EMAIL(email: string) {
//     this.email = email
//   }

//   @Mutation
//   private SET_ERP(erp: IUserErp) {
//     this.erp = erp
//   }

//   // @Action
//   // public async Login(userInfo: any) {
//   //   // let { username, password } = userInfo
//   //   // username = username.trim()
//   //   // const { data } = await login({ username, password })
//   //   // setToken(data.accessToken)
//   //   // this.SET_TOKEN(data.accessToken)
//   // }

//   // @Action
//   // public ResetToken() {
//   //   removeToken()
//   //   this.SET_TOKEN('')
//   //   this.SET_ROLES([])
//   // }

//   // @Action
//   // public async ChangeRoles(role: string) {
//   //   // // Dynamically modify permissions
//   //   // const token = role + '-token'
//   //   // this.SET_TOKEN(token)
//   //   // setToken(token)
//   //   // await this.GetUserInfo()
//   //   // resetRouter()
//   //   // // Generate dynamic accessible routes based on roles
//   //   // PermissionModule.GenerateRoutes(this.roles)
//   //   // // Add generated routes
//   //   // router.addRoutes(PermissionModule.dynamicRoutes)
//   //   // // Reset visited views and cached views
//   //   // TagsViewModule.delAllViews()
//   // }

//   @Action
//   public async LogOut() {
//     await logout()
//   }
// }

// export const UserModule = getModule(User)

const getUserInfo = (state: IUserState) => async () => {
  if (isEmpty(state.token)) {
    state.token = getSSO() || null;
  }

  if (isEmpty(state.token)) {
    throw Error('GetUserInfo: token is undefined!');
  }

  const sso = decodeSSO();

  const { data } = await Promise.resolve({
    data: {
      // roles: sso.roleCodes
      //   .split(',')
      //   .filter(item => !isEmpty(item))
      //   .map(s => s.trim()),
      roles: sso.roles || [],
      name: sso.name,
      avatar: '',
      introduction: '',
      // exp: sso.exp,
      // erp: decoceERP(),
      email: sso.email
    }
  });

  const {
    roles = [],
    name,
    avatar,
    introduction,
    email
    // exp
  } = data;

  state.roles = roles;
  state.name = name;
  state.avatar = avatar;
  state.introduction = introduction;
  state.email = email;
  // state.exp = exp;
};

const createState = () => {
  return reactive(initState) as IUserState;
};

const createActions = (state: IUserState) => {
  return {
    getUserInfo: getUserInfo(state),
    logout
  };
};

const state = createState();
const actions = createActions(state);

export const useStore = () => {
  return {
    state: readonly(state),
    actions: readonly(actions)
  };
};
