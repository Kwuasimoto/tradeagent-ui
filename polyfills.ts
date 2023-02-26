// Import polyfills for node packages
import * as path from 'path-browserify';
import * as util from 'util';
import * as tty from 'tty-browserify';
import * as stream from 'stream-browserify';

(window as any).global = window;
(window as any).process = { env: { DEBUG: undefined }, cwd: () => '/' };
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = { node: '12.0.0' };
(window as any).util = util;
(window as any).TTY = tty;
(window as any).Buffer = global.Buffer || require('buffer').Buffer;
(window as any).process.nextTick = setImmediate;
(window as any).Stream = stream;

declare const global: any;
(global as any).Buffer = global.Buffer || require('buffer').Buffer;
