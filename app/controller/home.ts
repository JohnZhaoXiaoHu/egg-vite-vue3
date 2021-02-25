import { Controller } from 'egg';
import { Route, HttpGet } from 'egg-decorator-router';
import { server } from '../middleware/vite';

@Route()
export default class HomeController extends Controller {
  @HttpGet('/')
  public async index() {
    const { ctx, config } = this;
    const renderData: any = {};

    if (config.env === 'local') {
      const addressInfo: any = server?.httpServer?.address();

      renderData.server = `${ctx.protocol}://${
        addressInfo?.address === '::' ? 'localhost' : addressInfo?.address
      }:${addressInfo?.port}`;

      renderData.input = `${renderData.server}${config.vite.build.rollupOptions.input}`;
    }

    await ctx.render('index.html', renderData);
  }

  @HttpGet('/api')
  public api() {
    const { ctx } = this;

    ctx.body = 'api';
  }
}
