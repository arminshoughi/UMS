import { unit, unitCreate, unitFilters } from "../interfaces/unit";
import { useQuery, useWrapperFormMutation } from "../utils/use-react-query";

export const queryKeys = {
  units: () => [
    {
      client: "share",
      endpoint: `/courses/`,
    },
  ],
};

export function useUnits() {
  return useQuery(
    queryKeys.units(),

    {
      cacheTime: Infinity,
      staleTime: Infinity,
      // enabled: !!provinceId,
    }
  );
}

export function useUnit() {
  return useQuery(queryKeys.unit(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}

export function useUnitMutation({ ...options }) {
  return useWrapperFormMutation({
    queryKey: queryKeys.units(),
    toast: "name",
    ...options,
  });
}

export function useAddUnit() {
  return useUnitMutation({ method: "post", action: "add" });
}

export function useUpdateUnit() {
  return useUnitMutation({
    method: "patch",
    action: "update",
  });
}

export function useRemoveUnit() {
  return useUnitMutation({
    method: "delete",
    action: "remove",
  });
}
