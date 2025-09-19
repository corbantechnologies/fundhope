import { apiActions } from "@/tools/api";

export const getCampaigns = async () => {
  const response = await apiActions?.get("/api/v1/campaigns/");

  return response?.data?.results;
};

export const getCampaign = async (identity: string) => {
  const response = await apiActions?.get(
    `/api/v1/campaigns/${identity}`
  );

  return response?.data;
};
