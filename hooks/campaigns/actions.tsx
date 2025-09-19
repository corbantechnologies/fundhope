"use client";

import { getCampaign, getCampaigns } from "@/services/campaigns";
import { useQuery } from "@tanstack/react-query";

export function useFetchCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
  });
}

export function useFetchCampaign(identity: string) {
  return useQuery({
    queryKey: ["campaign", identity],
    queryFn: () => getCampaign(identity),
  });
}
