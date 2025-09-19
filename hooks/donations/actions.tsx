"use client";

import { getDonation, getDonations } from "@/services/donations";
import { useQuery } from "@tanstack/react-query";

export function useFetchDonations() {
  return useQuery({
    queryKey: ["donations"],
    queryFn: () => getDonations(),
  });
}

export function useFetchDonation(reference: string) {
  return useQuery({
    queryKey: ["donation", reference],
    queryFn: () => getDonation(reference),
  });
}
