const sut = require(".");

test("set-cookie into cookie jar", async () => {
  expect(await sut()).toBe("a=b");
});
