FAQ

## The expression evaluated to a falsy value

```
      AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:

  func.apply(thisObj, args)

      + expected - actual

      -false
      +true
      
      at Context.<anonymous> (app/extend/helper/unittest.js:75:5)
      at process._tickCallback (internal/process/next_tick.js:68:7)
      [use `--full-trace` to display the full stack trace]  
```

可能下面因素相关：

- 与 `ctx.validate(rule);` 
