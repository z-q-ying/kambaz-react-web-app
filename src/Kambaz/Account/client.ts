import axios from "axios";

import type { Credentials } from "../../types/Credentials";

const axiosWithCredentials = axios.create({ withCredentials: true }); // add cookies to requests

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: Credentials) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${USERS_API}`);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`, // Use session to fetch current user
    course
  );
  return data;
};

export const enrollUserInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/enroll/current/${courseId}`
  );
  return data;
};

// unenroll
export const unenrollUserFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/enroll/current/${courseId}`
  );
  return data;
};
