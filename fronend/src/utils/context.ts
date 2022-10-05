import React from "react";

export function createNamedContext<ContextValueType>(
  name: string,
  defaultValue: ContextValueType
): React.Context<ContextValueType> {
  const Ctx = React.createContext<ContextValueType>(defaultValue);
  if (process.env.NODE_ENV !== "production") {
    Ctx.displayName = name;
  }
  return Ctx;
}

export class ContextError extends Error {
  constructor(hookName: string, contextName: string) {
    super(`${hookName} must be used within a ${contextName}`);
    this.name = "Context Error";
  }
}
