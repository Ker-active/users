import { CacheKeys } from "@/lib";
import { client } from "@/lib/api";
import {
  IBookingResponse,
  IClass,
  IClassResponse,
  IEventResponse,
  IPrice,
  TUser,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";

export const useGetGyms = (params = "") => {
  return useQuery({
    queryKey: [CacheKeys.Gyms, params],
    queryFn: async () => {
      return client
        .get(`/user/gyms?${params}`)
        .then((res) => res.data as Promise<{ data: TUser[] }>);
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: [CacheKeys.USER],
    queryFn: async () => {
      return client
        .get("/user")
        .then((res) => res.data as Promise<{ data: TUser }>);
    },
  });
};

export const useGetGym = (gymId: string) => {
  return useQuery({
    queryKey: [CacheKeys.Gyms, gymId],
    queryFn: async () => {
      return client
        .get(`/gyms/${gymId}`)
        .then((res) => res.data as Promise<{ data: TUser }>);
    },
  });
};

export const useGetParams = () => {
  const searchParams = useSearchParams();
  const params: { [anyProp: string]: string } = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return queryString.stringify(params);
};

export const useGetTrainers = () => {
  return useQuery({
    queryKey: [CacheKeys.Trainers],
    queryFn: async () => {
      return client
        .get("/user/trainers")
        .then((res) => res.data as Promise<{ data: TUser[] }>);
    },
  });
};

export const useGetTrainer = (trainerId: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.Trainers, trainerId],
    queryFn: async () => {
      return client
        .get(`/trainers/${trainerId}`)
        .then((res) => res.data as Promise<{ data: TUser }>);
    },
    enabled: !!trainerId,
  });
};

export const useGetClasss = () => {
  return useQuery({
    queryKey: [CacheKeys.CLASSES],
    queryFn: async () => {
      return client
        .get("/user/classes")
        .then((res) => res.data as Promise<IClassResponse>);
    },
  });
};

export const useGetSpecificClasss = (id: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.CLASSES, id],
    queryFn: async () => {
      return client
        .get(`/common/class?id=${id}`)
        .then((res) => res.data as Promise<IClassResponse>);
    },
  });
};

export const useGetSpecificEvents = (id: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.Events, id],
    queryFn: async () => {
      return client
        .get(`/common/event?id=${id}`)
        .then((res) => res.data as Promise<IEventResponse>);
    },
  });
};

export const useGetClassDetails = (classId: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.CLASSES, classId],
    queryFn: async () => {
      return client
        .get(`/class/view/${classId}`)
        .then((res) => res.data as Promise<{ data: IClass }>);
    },
    enabled: !!classId,
  });
};

export const useGetEvents = (arg: string) => {
  return useQuery({
    queryKey: [CacheKeys.Events],
    queryFn: async () => {
      return client
        .get(`/events/all`)
        .then((res) => res.data as Promise<IEventResponse>);
    },
    enabled: !arg, //disabled fetching if an arg is passed, essentially pass a gymId to prevent this hook from fetching, instead use the other
  });
};

export const useGetPlans = (planId: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.Plans],
    queryFn: async () => {
      return client
        .get(`/price/view/${planId}`)
        .then((res) => res.data as Promise<{ data: IPrice[] }>);
    },
    enabled: !!planId,
  });
};

export const useGetBookings = () => {
  return useQuery({
    queryKey: [CacheKeys.Bookings],
    queryFn: async () => {
      return client
        .get("/bookings")
        .then((res) => res.data as IBookingResponse);
    },
  });
};
