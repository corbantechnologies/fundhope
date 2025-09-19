/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useFetchCampaign } from "@/hooks/campaigns/actions";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import CreateDonation from "@/forms/CreateDonation";
import Link from "next/link";

function CampaignDetail() {
  const { identity } = useParams();
  const {
    isLoading: isLoadingCampaign,
    data: campaign,
    isError: isErrorCampaign,
    refetch: refetchCampaign,
  } = useFetchCampaign(identity as string);

  if (isLoadingCampaign) return <LoadingSpinner />;

  if (isErrorCampaign || !campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Campaign not found.</p>
          <Link
            href="/campaigns"
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
          >
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  const formattedTarget = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(parseFloat(campaign.target_amount));
  const raised = 0; // Replace with actual sum of donations if available
  const progressPercentage = Math.min(
    (raised / parseFloat(campaign.target_amount)) * 100,
    100
  );
  const endDate = new Date(campaign.end_date);
  const today = new Date("2025-09-18"); // Use new Date() in production
  const daysLeft = Math.max(
    Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/campaigns"
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Campaigns
        </Link>

        {/* Campaign Summary Card */}
        <Card className="bg-white rounded-lg shadow-sm mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {campaign.title}
              </CardTitle>
              <Badge
                className={`px-2 py-1 text-sm font-medium ${
                  campaign.is_closed
                    ? "bg-red-100 text-red-800 border-red-200"
                    : daysLeft <= 7
                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }`}
              >
                {campaign.is_closed
                  ? "Closed"
                  : daysLeft <= 7
                  ? `${daysLeft} days left`
                  : "Active"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src={
                    campaign.image ||
                    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9uYXRlfGVufDB8fDB8fHww"
                  }
                  alt={campaign.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">
                        {campaign.organization_name}
                      </p>
                      <p className="text-sm text-gray-600">Organization</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">
                        {new Date(campaign.end_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-600">End Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{campaign.donors}</p>
                      <p className="text-sm text-gray-600">Donors</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Target Amount</p>
                    <p className="text-sm text-gray-600">{formattedTarget}</p>
                  </div>
                  <div>
                    <p className="font-medium">Raised</p>
                    <p className="text-sm text-gray-600">
                      {new Intl.NumberFormat("en-KE", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 0,
                      }).format(raised)}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Progress</p>
                    <Progress value={progressPercentage} className="h-2 mt-1" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="font-medium">
                  {campaign.description || "No description provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donation Form */}
        {!campaign.is_closed && (
          <CreateDonation campaignIdentity={campaign.identity} />
        )}
      </div>
    </div>
  );
}

export default CampaignDetail;
