"use client";

import React from "react";
import { useFetchCampaigns } from "@/hooks/campaigns/actions";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { CampaignCard } from "@/components/campaign/CampaignCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { error } from "console";

interface Campaign {
  identity: string;
  title: string;
  description: string | null;
  image: string | null;
  target_amount: string;
  donors: number;
  amount_raised: number;
  end_date: string;
  organization_name: string;
}

export default function Campaigns() {
  const {
    isLoading: isLoadingCampaigns,
    data: campaigns,
    isError: isErrorCampaigns,
    refetch: refetchCampaigns,
  } = useFetchCampaigns();

  if (isLoadingCampaigns) return <LoadingSpinner />;

  console.log(isErrorCampaigns)

  // if (isErrorCampaigns || !campaigns) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <Card className="max-w-md mx-auto">
  //         <CardHeader>
  //           <CardTitle className="flex items-center gap-2">
  //             <AlertCircle className="w-6 h-6 text-red-500" />
  //             Error
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <p className="text-gray-600">
  //             Failed to load campaigns. Please try again.
  //           </p>
  //           <button
  //             onClick={() => refetchCampaigns()}
  //             className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
  //           >
  //             Retry
  //           </button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          All Campaigns
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.length > 0 ? (
            campaigns.map((campaign: Campaign) => (
              <CampaignCard
                key={campaign.identity}
                identity={campaign.identity}
                title={campaign.title}
                description={campaign.description}
                image={campaign.image}
                target_amount={parseFloat(campaign.target_amount)}
                raised={campaign.amount_raised}
                donors={campaign.donors}
                end_date={campaign.end_date}
                organization_name={campaign.organization_name}
              />
            ))
          ) : (
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>No Campaigns Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    There are no active campaigns at the moment. Check back
                    later!
                  </p>
                </CardContent>
              </Card>
          )}
        </div>
      </div>
    </div>
  );
}
