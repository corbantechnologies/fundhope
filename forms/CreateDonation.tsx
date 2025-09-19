/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, User, DollarSign, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { createDonation } from "@/services/donations";

interface CreateDonationProps {
  campaignIdentity: string;
}

function CreateDonation({ campaignIdentity }: CreateDonationProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    phone_number: "",
    name: "",
  });

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^254\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    if (!validatePhoneNumber(formData.phone_number)) {
      toast.error("Please enter a valid phone number (e.g., 2547XXXXXXXX)");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        campaign: campaignIdentity,
        amount: parseFloat(formData.amount),
        phone_number: formData.phone_number,
        name: formData.name || "",
      };
      const response = await createDonation(payload);
      toast.success("Donation created successfully!");
      router.push(`/payment/${response.reference}`);
    } catch (error) {
      toast.error("Error creating donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Make a Donation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700"
            >
              Donation Amount (KES)
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="phone_number"
              className="text-sm font-medium text-gray-700"
            >
              M-Pesa Phone Number
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="h-5 w-5 text-gray-500" />
              <Input
                id="phone_number"
                name="phone_number"
                type="text"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="2547XXXXXXXX"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Enter the phone number registered with M-Pesa (e.g., 2547XXXXXXXX)
            </p>
          </div>
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name (Optional)
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <User className="h-5 w-5 text-gray-500" />
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-white"
          >
            {isSubmitting ? "Submitting..." : "Proceed to Payment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateDonation;
