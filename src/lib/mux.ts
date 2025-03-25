import Mux from '@mux/mux-node'
import { config } from './config';

export const mux = new Mux({
  tokenId: config.mux.tokenId,
  tokenSecret: config.mux.tokenSecret,
});