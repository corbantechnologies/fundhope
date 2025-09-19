/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Clock,
  CreditCard,
  Phone,
  DollarSign,
  AlertCircle,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import { useFetchDonation } from "@/hooks/donations/actions";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { makePayment } from "@/services/payments";

function DonationPayment() {
  const router = useRouter();
  const { reference } = useParams();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const {
    isLoading: isLoadingDonation,
    data: donation,
    error: donationError,
    refetch: refetchDonation,
  } = useFetchDonation(typeof reference === "string" ? reference : "");

  useEffect(() => {
    if (!isLoadingDonation) {
      setLoading(false);
      if (donation?.phone_number && donation?.payment_status === "PENDING") {
        setPhoneNumber(donation.phone_number);
      }
    }
  }, [isLoadingDonation, donation]);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^254\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handlePayment = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number (e.g., 2547XXXXXXXX)");
      return;
    }

    if (typeof reference !== "string") {
      toast.error("Invalid donation reference. Please try again.");
      return;
    }

    setIsProcessingPayment(true);
    setPaymentMessage(null);
    try {
      const payload = {
        donation_reference: reference,
        phone_number: phoneNumber,
      };
      await makePayment(payload);
      setPaymentMessage(
        "Please check your phone and enter your M-Pesa PIN to complete the payment. Click 'Check Payment Status' once you receive the M-Pesa confirmation message."
      );
    } catch (error) {
      setIsProcessingPayment(false);
      setPaymentMessage(null);
      toast.error("Error initiating payment: Please try again");
    }
  };

  const handleCheckStatus = async () => {
    setIsCheckingStatus(true);
    try {
      await refetchDonation();
      if (donation?.payment_status === "COMPLETED") {
        router.push(`/donation/${reference}/success`);
      } else if (donation?.payment_status === "FAILED") {
        router.push(`/donation/${reference}/failure`);
      } else {
        toast.success("Payment is still pending. Please try again.");
      }
    } catch (error) {
      toast.error("Error checking payment status. Please try again.");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoadingDonation || loading) {
    return <LoadingSpinner />;
  }

  if (donationError || !donation || typeof reference !== "string") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Donation not found.</p>
          <Button
            onClick={() => router.push("/campaigns")}
            className="mt-4 bg-primary hover:bg-primary-hover"
          >
            Back to Campaigns
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Donation Payment
          </h1>
          <p className="text-gray-600">
            Complete your payment to confirm your donation
          </p>
        </div>

        <Card className="bg-white rounded-lg shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Donation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Reference: {donation.reference}</p>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                    donation.status
                  )}`}
                >
                  {donation.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">
                    {new Intl.NumberFormat("en-KE", {
                      style: "currency",
                      currency: "KES",
                      minimumFractionDigits: 0,
                    }).format(parseFloat(donation.amount))}
                  </p>
                  <p className="text-sm text-gray-600">Amount</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{donation.phone_number}</p>
                  <p className="text-sm text-gray-600">Phone</p>
                </div>
              </div>
              {donation.name && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{donation.name}</p>
                    <p className="text-sm text-gray-600">Donor Name</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">
                    {new Date(donation.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">Created On</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Campaign</p>
                <p className="font-medium">
                  {donation.campaign?.title || "Unknown Campaign"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Complete your payment to confirm your donation
            </p>
            <div className="flex items-center justify-between text-lg mb-6">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold text-2xl">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 0,
                }).format(parseFloat(donation.amount))}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                    donation.payment_status
                  )}`}
                >
                  {donation.payment_status}
                </span>
              </div>
            </div>
            {donation.payment_status === "PENDING" && (
              <div className="mb-6">
                <Label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  M-Pesa Phone Number
                </Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <Input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="2547XXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Enter the phone number registered with M-Pesa (e.g.,
                  2547XXXXXXXX)
                </p>
              </div>
            )}
            {paymentMessage && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                <p className="text-blue-600">{paymentMessage}</p>
              </div>
            )}
            {donation.payment_status === "PENDING" && (
              <div className="space-y-4">
                <Button
                  onClick={handlePayment}
                  disabled={isProcessingPayment || !phoneNumber}
                  className="w-full bg-primary hover:bg-primary-hover"
                >
                  {isProcessingPayment ? (
                    "Processing Payment..."
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay with M-Pesa{" "}
                      {new Intl.NumberFormat("en-KE", {
                        style: "currency",
                        currency: "KES",
                        minimumFractionDigits: 0,
                      }).format(parseFloat(donation.amount))}
                    </>
                  )}
                </Button>
                {paymentMessage && (
                  <Button
                    onClick={handleCheckStatus}
                    disabled={isCheckingStatus}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    {isCheckingStatus ? (
                      "Checking Status..."
                    ) : (
                      <>
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h5m6 0h5v-5m-5 10v5h-5"
                          />
                        </svg>
                        Check Payment Status
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
            {donation.payment_status === "COMPLETED" && (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-600 font-semibold mb-2">
                  Payment Completed!
                </div>
                <p className="text-sm text-green-600">
                  Your donation has been confirmed.
                </p>
                {donation.mpesa_receipt_number && (
                  <p className="text-xs text-green-600 mt-2">
                    M-Pesa Receipt: {donation.mpesa_receipt_number}
                  </p>
                )}
                <Button
                  onClick={() => router.push(`/donation/${reference}/success`)}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  View Donation
                </Button>
              </div>
            )}
            {donation.payment_status === "FAILED" && (
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-red-600 font-semibold mb-2">
                  Payment Failed
                </div>
                <p className="text-sm text-red-600">
                  Please try again or contact support.
                </p>
                <Button
                  onClick={() => router.push(`/donation/${reference}/pay`)}
                  className="mt-4 bg-primary hover:bg-primary-hover"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DonationPayment;
