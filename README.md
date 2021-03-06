# pincode-input

A very useful pure javascript library to creating pin code inputs.

Inspired by [vue-pincode-input](https://github.com/Seokky/vue-pincode-input)

[Demo](https://dgknca.github.io/pincode-input/) | [Codepen](https://codepen.io/dgknca/pen/poNOdXp)

## Install

```bash
npm i pincode-input
```

```js
import PincodeInput from 'pincode-input'
import 'pincode-input/dist/pincode-input.min.css'
```

## Include

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pincode-input@0.1.0/dist/pincode-input.min.css" />

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/pincode-input@0.1.0/dist/pincode-input.min.js"></script>
```

## Usage

```html
<div id="demo"></div>
```

```js
new PincodeInput('#demo', {
  count: 4,
  secure: false,
  previewDuration: 200,
  onInput: (value) => {
    console.log(value)
  }
})
```

## Parameters

| Name            | Type    | Default | Description                                                            |
| :-------------- | :------ | :------ | :--------------------------------------------------------------------- |
| count           | number  | 4       | Count of the cells.                                                    |
| secure          | boolean | false   | Set to `true` to use the inputs with `type="password"`                 |
| previewDuration | number  | 200     | Duration of the character preview. Valid when used with `secure: true` |

## Events

| Name    | Description            |
| :------ | :--------------------- |
| onInput | Returns current value. |
