/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Users } from "lucide-react";
import Link from "next/link";

interface CampaignCardProps {
  identity: string;
  title: string;
  description: string | null;
  image: string | null;
  target_amount: number;
  raised: number;
  donors: number;
  end_date: string;
  organization_name: string;
}

export const CampaignCard = ({
  identity,
  title,
  description,
  image,
  target_amount,
  raised,
  donors,
  end_date,
  organization_name,
}: CampaignCardProps) => {
  const progressPercentage = Math.min((raised / target_amount) * 100, 100);

  // Calculate days left
  const endDate = new Date(end_date);
  const today = new Date("2025-09-18");
  const timeDiff = endDate.getTime() - today.getTime();
  const daysLeft = Math.max(Math.ceil(timeDiff / (1000 * 3600 * 24)), 0);

  // Format amounts in KES
  const formattedGoal = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(target_amount);
  const formattedRaised = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(raised);

  return (
    <Card className="group hover:shadow-large transition-smooth cursor-pointer overflow-hidden">
      <Link href={`/campaigns/${identity}`}>
        <div className="relative">
          <img
            src={
              image || "https://via.placeholder.com/400x200?text=Campaign+Image"
            }
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
          />
          {daysLeft <= 7 && (
            <Badge
              variant="destructive"
              className="absolute top-3 right-3 bg-warning text-warning-foreground"
            >
              <Clock className="w-3 h-3 mr-1" />
              {daysLeft} days left
            </Badge>
          )}
        </div>
      </Link>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">
            {organization_name}
          </p>
          <Link href={`/campaigns/${identity}`}>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-smooth">
              {title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description || "No description provided"}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-foreground">
              {formattedRaised}{" "}
              <span className="text-muted-foreground">raised</span>
            </span>
            <span className="text-muted-foreground">of {formattedGoal}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{donors} donors</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{daysLeft} days left</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/campaigns/${identity}`}>View Details</Link>
          </Button>
          <Button variant="default" size="sm" className="flex-1" asChild>
            <Link href={`/campaigns/${identity}/donate`}>
              <Heart className="w-4 h-4" />
              Donate
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
