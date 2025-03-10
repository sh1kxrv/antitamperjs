# Anti-Tamper | JS

[RxstyTerra](https://github.com/sh1kxrv/rxstyterrv)

> [!WARNING]
> 🚧 The application is in an active stage of development
> //

## How it should work?

### Examples

<table><tbody><tr><td width="500px"> Raw </td><td width="500px"> Transformed </td></tr><tr>
<td valign="top">

```js
function randInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(
    Math.random() * 
    (maxFloored - minCeiled + 1) 
    + minCeiled
  );
}
```

</td><td valign="top">

```js
function randInt(min, max) {
  return $$rterra.a(min, max);
}
```

</td></tr></tbody></table>