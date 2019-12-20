
有一次, 不知道怎么的, 就报出这个错误来了.

```
DESKTOP-APB1HCJ% npm run dev

> fangyuan-server@1.0.0 dev /mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server
> egg-bin dev --sticky --port=7012

sh: 1: egg-bin: not found
npm ERR! file sh
npm ERR! code ELIFECYCLE
npm ERR! errno ENOENT
npm ERR! syscall spawn
npm ERR! fangyuan-server@1.0.0 dev: `egg-bin dev --sticky --port=7012`
npm ERR! spawn ENOENT
npm ERR!
npm ERR! Failed at the fangyuan-server@1.0.0 dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /mnt/c/Users/a/.npm/_logs/2019-12-02T09_33_02_494Z-debug.log
DESKTOP-APB1HCJ%
```

如果说,之前都是好好的,突然间,不行了,则,删除`node_modules1`,然后`npm i`重新安装,再启动`npm run dev`就可以了.
