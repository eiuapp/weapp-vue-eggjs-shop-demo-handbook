---
date: 2019-01-08T21:07:13+01:00
title: "ctx.validate验证参数"
weight: 31
keywords:
- controller
description : "用 ctx.validate 对 ctx.request.body 中的参数进行验证"
---

用 ctx.validate 对 ctx.request.body 中的参数进行验证

```
      const rule = {
        parent_id: 'int',
        name: 'string',
        level: 'int',
        product_count: 'int',
        product_unit: 'string',
        nav_status: 'int',
        show_status: 'int',
        // sort: 'int',
        // icon: 'string',
        // keywords: 'string',
        // description: 'string',
      };
      ctx.validate(rule);
```

出现在 rule 中的参数：

- 是必传参数
- 会被进行验证
- 如果是string, 则不能为 ""


