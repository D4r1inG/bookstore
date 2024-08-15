Dự án sử dụng cypress để viết unit test và đo lường code coverage

Xem [cypress](../cypress/)

## Overview

Đối với test e2e trước khi thực hiện chạy test phải đăng nhập để tạo session cho các test case:

```js
describe('Getting started', () => {
  beforeEach(() => {
    const AppUrl = Cypress.env('appUrl');
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    cy.login(username, password);
    cy.visit(AppUrl);
  });

  it('Test case', () => {
    // ...
  });
});
```

Thêm env tương ứng tại [config](../cypress.config.ts)

## Coverage

- Dự án sử dụng [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) là 1 config trong trình biên dịch code [babel](https://babeljs.io/) để tạo ra các đoạn code mô tả ứng dụng, giúp chúng ta thu thập thông tin coverage

- Tuy nhiên đối với phiên bản nextjs >= 13 đã thay thế babel bằng [SWC](https://swc.rs/) để biên dịch nhanh hơn, nên các config babel cũ sẽ không hoạt động được cho đến khi support

=> Mỗi khi chạy test hãy sử dụng babel thay vì SWC bằng cách chạy: `npm run dev:test`

### Author

quannt86
