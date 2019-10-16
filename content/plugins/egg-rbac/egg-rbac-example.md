github 搜索：

https://github.com/search?q=egg-rbac

## egg-rbac 与 Mongodb

- https://github.com/1134506391/egg-rbac
- https://github.com/lidianhao123/egg-rbac-example
- https://github.com/reboy/egg-rbac-instance

所以从 [egg-rbac-example](https://github.com/lidianhao123/egg-rbac-example) 入手。

启动后，会，要求连接 mongodb . 然后， npm run dev 时，会主动，新建立 `roles`, `permissions` 这2个 collection. 但是，没有其它的 collection. 

工程的， `app/model/user.js` 下知道，要有一个 `user` 的 collection. 但是，登录的时候，还是会报错，

从 [这里](https://segmentfault.com/a/1190000017209913?utm_source=tag-newest) 知道，要加上 collection 名。

```
return mongoose.model('User', UserSchema, 'user');
```

而且从 `role: { type: ObjectId, ref: 'Role' }` 中知道，要与 `role` 相关联，且，在 `controller/home.js`下的`loginAPI`中，知道，返回的时候，`user.role.name` 要有值。

所以，我们要让，`user` 与 `roles` 这2个collection 关联起来。

`controller/service/user.js`下的 `findOne` 中的 `this.ctx.model.User.findOne({ name }).populate('role')` , 应该是起到关联查询的作用。

### egg-rbac-instance

后来，发现了，[egg-rbac-instance](https://github.com/reboy/egg-rbac-instance) 是在 [egg-rbac-example](https://github.com/lidianhao123/egg-rbac-example) 基础上，做了研究工作的。


https://github.com/reboy/egg-rbac-instance

## egg-rbac 与 mysql

- https://github.com/1134506391/egg-rbac
- https://github.com/Gearace/egg-rbac-mysql

