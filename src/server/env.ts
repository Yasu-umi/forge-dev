if (!process.env["CLIENT_ID"]) throw new Error("NotFoundClientID");
if (!process.env["CLIENT_SECRET"]) throw new Error("NotFoundClientSecret");
if (!process.env["HOST"]) throw new Error("NotFoundHost");

export const CLIENT_ID = process.env["CLIENT_ID"];
export const CLIENT_SECRET = process.env["CLIENT_SECRET"];
export const HOST = process.env["HOST"];
export const PORT = process.env["PORT"] ? parseInt(process.env["PORT"], 10) : 3000;
