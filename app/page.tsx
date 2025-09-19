/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetchCampaigns } from "@/hooks/campaigns/actions";
import { CampaignCard } from "@/components/campaign/CampaignCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Users,
  Target,
  Shield,
  ArrowRight,
  Building,
  Church,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface Campaign {
  identity: string;
  title: string;
  description: string | null;
  image: string | null;
  target_amount: string;
  donors: number;
  end_date: string;
  organization_name: string;
}

function LandingPage() {
  const {
    isLoading: isLoadingCampaigns,
    data: campaigns,
    refetch: refetchCampaigns,
  } = useFetchCampaigns();


  // Mock stats (replace with real data if available)
  const stats = [
    { icon: Heart, value: "KES 2.5M+", label: "Total Raised" },
    { icon: Users, value: "15K+", label: "Donors" },
    { icon: Target, value: "850+", label: "Campaigns" },
    { icon: Shield, value: "99.9%", label: "Success Rate" },
  ];

  const organizationTypes = [
    {
      icon: Heart,
      title: "Non-Profit Organizations",
      description:
        "Charities and humanitarian organizations making a difference worldwide",
    },
    {
      icon: Church,
      title: "Religious Groups",
      description:
        "Churches, temples, and faith-based communities supporting their missions",
    },
    {
      icon: Building,
      title: "Community Organizations",
      description:
        "Local groups and associations working to improve their communities",
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description:
        "Schools, universities, and educational programs seeking support",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Trusted",
      description:
        "Advanced security measures protect every donation and campaign",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Real-time progress tracking and transparent funding goals",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Connect with supporters and build lasting community relationships",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url(https://via.placeholder.com/1200x600?text=Hero+Image)`,
          }}
        />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Empower Change Through
              <span className="bg-gradient-primary bg-clip-text">
                {" "}
                Giving
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Connect organizations with supporters to fund meaningful projects
              and create lasting impact in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover"
                asChild
              >
                <Link href="/campaigns">
                  Browse Campaigns
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/start-campaign">Start Your Campaign</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Campaigns
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover impactful campaigns from organizations making a
              difference in their communities
            </p>
          </div>

          {isLoadingCampaigns ? (
            <div className="text-center text-muted-foreground">
              Loading campaigns...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {campaigns
                ?.filter(
                  (campaign: { identity: any; }): campaign is Campaign => !!campaign.identity
                )
                .slice(0, 3)
                .map((campaign: Campaign) => (
                  <CampaignCard
                    key={campaign.identity}
                    identity={campaign.identity}
                    title={campaign.title}
                    description={campaign.description}
                    image={campaign.image}
                    target_amount={parseFloat(campaign.target_amount)}
                    raised={0} // Replace with actual sum of donations if available
                    donors={campaign.donors}
                    end_date={campaign.end_date}
                    organization_name={campaign.organization_name}
                  />
                ))}
            </div>
          )}

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/campaigns">
                View All Campaigns
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Organization Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Who We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Supporting diverse organizations in their mission to create
              positive change
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {organizationTypes.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="text-center hover:shadow-medium transition-smooth"
              >
                <CardHeader className="pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-lg mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with trust, transparency, and community at the core
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="hover:shadow-medium transition-smooth"
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-success rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-success-foreground" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you&apos;re looking to support a cause or start your own
              campaign, join thousands of changemakers already making an impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover"
                asChild
              >
                <Link href="/start-campaign">Start Your Campaign</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/campaigns">Browse Campaigns</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
