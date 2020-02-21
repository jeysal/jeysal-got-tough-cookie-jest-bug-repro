const express = require("express");
const got = require("got");
const { CookieJar } = require("tough-cookie");
const { promisify } = require("util");

module.exports = async () => {
  const server = await new Promise(resolve => {
    const server = express()
      .get("/", (req, res) => res.cookie("a", "b").send("ok"))
      .listen(() => resolve(server));
  });
  const { port } = server.address();

  const cookieJar = new CookieJar();
  try {
    await got(`http://localhost:${port}/`, {
      cookieJar
    });
    return promisify(cookieJar.getCookieString.bind(cookieJar))(
      `http://localhost:${port}`
    );
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
};
