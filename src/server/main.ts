import express from "express";
import { buildApp } from "./app";
import { getEnv } from "./env";

getEnv().then((env) => {
  const port = process.env["PORT"] ? parseInt(process.env["PORT"], 10) : 3000;
  const app = buildApp(express(), env);
  app.listen(port, () => console.log(`Server listening on port ${port}`));
});
