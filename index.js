#!/usr/bin/env node

const express = require("express");
const got = require("got");
const { CookieJar } = require("tough-cookie");
const { promisify } = require("util");

(async () => {
  const server = await new Promise(resolve => {
    const server = express()
      .get("/", (req, res) =>
        res.cookie("a", "b", { maxAge: 1000 * 60 }).send("ok")
      )
      .listen(() => resolve(server));
  });
  const { port } = server.address();

  const cookieJar = new CookieJar();
  await got(`http://localhost:${port}/`, {
    cookieJar
  });

  console.log(
    await promisify(cookieJar.getCookieString.bind(cookieJar))(
      `http://localhost:${port}`
    )
  );

  await new Promise(resolve => server.close(resolve));
})();
