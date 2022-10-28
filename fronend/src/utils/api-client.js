import i18n from "../i18n";
import { getURLParams } from "./get-url-params";

const ignoreUrls = ["/general/domain/info/", "/general/auth/identifier/"];
const loginURL = `http://${
  typeof window !== "undefined" ? window.location.host : ""
}/dashboard/login`;

async function refreshToken(refresh) {
  return await baseClient.post(`/general/auth/refresh/`, { refresh });
}

const customFetch = async (
  endpoint,
  { token, headers, data, baseUrl, method, ...customConfig }
) => {
  const controller = new AbortController();
  const access = localStorage.getItem("access");

  let config = {};
  if (data && "formData" in data) {
    config = {
      body: data["formData"],
      headers: {
        // @ts-ignore
        Authorization: !ignoreUrls.includes(endpoint)
          ? token ?? `Bearer ${access}`
          : undefined,
        ...headers,
      },
      method,
      ...customConfig,
    };
  } else {
    config = {
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        // @ts-ignore
        Authorization: !ignoreUrls.includes(endpoint)
          ? token ?? `Bearer ${access}`
          : undefined,
        "Content-Type": "application/json",
        ...headers,
      },
      method,
      ...customConfig,
    };
  }

  const url = baseUrl ? `${baseUrl}${endpoint}` : endpoint;
  const promise = fetch(url, {
    signal: controller.signal,
    ...config,
  });

  // @ts-expect-error
  promise.cancel = () => controller.abort();

  return promise
    .then(async (resp) => {
      if (resp.status === 401 && !ignoreUrls.includes(endpoint)) {
        try {
          const refresh = localStorage.getItem("refresh");
          if (!refresh) {
            throw new Error("");
          }
          const newTokens = await refreshToken(refresh);
          setNewTokens(newTokens);
          return customFetch(endpoint, config);
        } catch {
          logout();
          window?.location.assign(loginURL);
          return Promise.reject({ message: "re-authenticate" });
        }
      }
      if (resp.ok) {
        if (resp.status === 204) {
          return true;
        }
        return await resp.json();
      } else {
        const errorMessage = await resp.json();
        return Promise.reject(errorMessage);
      }
    })
    .catch((err) => {
      if (err) {
        return Promise.reject(err);
      }
      return Promise.reject({
        message: i18n.t("check_your_internet_connection"),
      });
    });
};

function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export function setNewTokens({ access, refresh }) {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
}

const createClient = ({ baseUrl, withCompanyId, fetcher = customFetch }) => {
  const client = {
    baseUrl: () => `${baseUrl}/${readCompanyId()}`,
    get: (endpoint, config) =>
      fetcher(endpoint, {
        ...config,
        method: "GET",
        baseUrl,
      }),
    post: (endpoint, data, config) =>
      fetcher(withCompanyId ? `/${readCompanyId()}${endpoint}` : endpoint, {
        ...config,
        method: "POST",
        data,
        baseUrl,
      }),
    put: (endpoint, data, config) =>
      fetcher(withCompanyId ? `/${readCompanyId()}${endpoint}` : endpoint, {
        ...config,
        method: "PUT",
        data,
        baseUrl,
      }),
    patch: (endpoint, data, config) =>
      fetcher(withCompanyId ? `/${readCompanyId()}${endpoint}` : endpoint, {
        ...config,
        method: "PATCH",
        data,
        baseUrl,
      }),
    delete: (endpoint, config) =>
      fetcher(withCompanyId ? `/${readCompanyId()}${endpoint}` : endpoint, {
        ...config,
        method: "DELETE",
        baseUrl,
      }),
  };

  return {
    ...client,
    smartGet: (endpoint, { pageParam, params }, config) => {
      if (pageParam) {
        return clients.empty.get(pageParam);
      }

      if (params && "export" in params) {
        delete params["export"];
      }

      const searchParams = getURLParams(params ?? {});

      return client.get(`${endpoint}?${searchParams}`, config);
    },
  };
};

function readCompanyId() {
  return window.location.pathname.split("/")[2];
}

const baseAddr = process.env.NEXT_PUBLIC_BASE_URL;

export const clients = {
  empty: createClient({ withCompanyId: false }),
  base: createClient({ baseUrl: baseAddr, withCompanyId: false }),
  general: createClient({
    baseUrl: `${baseAddr}/general`,
    withCompanyId: false,
  }),
  shared: createClient({ baseUrl: `${baseAddr}/shared`, withCompanyId: true }),
  accounting: createClient({
    baseUrl: `${baseAddr}/accounting`,
    withCompanyId: true,
  }),
  pm: createClient({ baseUrl: `${baseAddr}/pm`, withCompanyId: true }),
  store: createClient({ baseUrl: `${baseAddr}/store`, withCompanyId: true }),
};

export const baseClient = createClient({
  baseUrl: baseAddr,
  withCompanyId: false,
});
export const generalClient = createClient({
  baseUrl: `${baseAddr}/general`,
  withCompanyId: false,
});
export const sharedClient = createClient({
  baseUrl: `${baseAddr}/shared`,
});
export const client = createClient({ baseUrl: `${baseAddr}/accounting` });
export const pm = createClient({ baseUrl: `${baseAddr}/pm` });
