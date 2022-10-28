import React from "react";

export function createNamedContext(name, defaultValue) {
  const Ctx = React.createContext(defaultValue);
  if (process.env.NODE_ENV !== "production") {
    Ctx.displayName = name;
  }
  return Ctx;
}

export class ContextError extends Error {
  constructor(hookName, contextName) {
    super(`${hookName} must be used within a ${contextName}`);
    this.name = "Context Error";
  }
}
