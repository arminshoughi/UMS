export function flatObject(obj: { id: string; value: any }[]) {
  let r = {};

  obj?.forEach(({ id, value }) => {
    if (typeof value === "object") {
      r = { ...r, ...value };
    } else {
      // @ts-ignore
      r[id] = value;
    }
  });

  return r;
}
export const isFunction = (obj: any): obj is Function =>
  typeof obj === "function";
