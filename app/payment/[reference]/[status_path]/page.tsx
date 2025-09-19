/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { apiActions } from "@/tools/api";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Donation {
  payment_status: string;
}

function DonationPaymentStatus() {
  const router = useRouter();
  const { reference } = useParams();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      if (typeof reference !== "string") {
        toast.error("Invalid donation reference.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiActions.get(
          `/api/v1/donations/${reference}/`
        );
        setDonation(response.data);
        setLoading(false);

        const paymentStatus = response.data.payment_status.toUpperCase();
        if (paymentStatus === "COMPLETED") {
          toast.success("Payment successful! Thank you for your donation.");
        } else {
          toast.error("Payment failed. Please try again or contact support.");
        }
      } catch (error) {
        toast.error("Error loading donation details. Please try again.");
        setLoading(false);
      }
    };

    if (reference) {
      fetchDonationDetails();
    }
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              Donation Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              The donation could not be found.
            </p>
            <Button
              onClick={() => router.push("/campaigns")}
              className="w-full bg-primary hover:bg-primary-hover"
            >
              Back to Campaigns
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSuccess = donation.payment_status.toUpperCase() === "COMPLETED";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isSuccess ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
            {isSuccess ? "Payment Successful" : "Payment Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {isSuccess
              ? "Thank you for your donation! Your support makes a difference."
              : "The payment was not successful. Please try again or contact support at support@example.com."}
          </p>
          <Button
            onClick={() => router.push("/campaigns")}
            className="w-full bg-primary hover:bg-primary-hover"
          >
            Back to Campaigns
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default DonationPaymentStatus;
