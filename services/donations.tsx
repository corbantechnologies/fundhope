import { apiActions } from "@/tools/api";

interface Donation {
  amount: number;
  campaign: string;
  name: string;
  phone_number: string;
}

export const createDonation = async (data: Donation) => {
  const response = await apiActions?.post("/api/v1/donate/create/", data);

  return response?.data;
};

export const getDonations = async () => {
  const response = await apiActions?.get("/api/v1/donate/");

  return response?.data;
};

export const getDonation = async (reference: string) => {
  const response = await apiActions?.get(`/api/v1/donate/${reference}/`);

  return response?.data;
};
