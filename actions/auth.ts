"use server";

import { TLogin, TRegister } from "@/schemas/auth";
import { createAxiosClient } from "@/lib/api";
import { setCookie } from "./shared";

export async function register(values: TRegister) {
  try {
    delete (values as any).confirmPassword;
    const serverClient = createAxiosClient();
    const { data } = await serverClient.post("/user/signup", values);
    return {
      success: "User Created\nPlease check your email to verify your account",
      token: data.data.token,
      userId: data.data._id,
    };
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

export async function resetPassword(value: {
  token: string;
  newPassword: string;
}) {
  try {
    const serverClient = createAxiosClient();
    const { data } = await serverClient.post("/user/update/password", value);
    return {
      success: data.message,
    };
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

export async function forgotPassword(value: { email: string }) {
  try {
    const serverClient = createAxiosClient();
    const { data } = await serverClient.post("/user/reset-password", value);
    return {
      success: data.message,
    };
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

export async function login(values: TLogin) {
  try {
    const serverClient = createAxiosClient();
    const { data } = await serverClient.post("/user/login", values);
    if (!data.data.isVerified) {
      return { error: "Please check your email to verify your account" };
    }
    setCookie(data.data.token);
    return {
      success: "Success",
    };
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

export async function updateActivities(
  values: string[],
  token: string | null,
  userId: any
) {
  try {
    const formData = new FormData();
    values.forEach((item) => formData.append("activities", item));
    const axiosClient = createAxiosClient({
      Authorization: `Bearer ${token}`,
    });
    await axiosClient.put(`/user/update/${userId}`, formData);
    return {
      success:
        "Activities Updated!\nPlease check your email to verify your account",
    };
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}
