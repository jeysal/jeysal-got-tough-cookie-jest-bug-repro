const sut = require(".");
const assert = require("assert").strict;

(async () => {
  assert.equal(await sut(), "a=b");
})();
