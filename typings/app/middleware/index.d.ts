// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/middleware/account';
import ExportPassport from '../../../app/middleware/passport';

declare module 'egg' {
  interface IMiddleware {
    account: typeof ExportAccount;
    passport: typeof ExportPassport;
  }
}
