"use client";

import { UserPlan } from "@/api/UserPlan";
import { useEffect, useState } from "react";

export default function Page() {
  const [customerId, setCustomerId] = useState<string>("");
  useEffect(() => {
    const userPlanApi = async () => {
      const response = await UserPlan();
      if (response.plan) {
        setCustomerId(response.plan.customerId);
      }
    };

    userPlanApi();
  })

  return (
    <>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      {/* @ts-ignore */}
      <stripe-pricing-table
        pricing-table-id="prctbl_1QnzQKRw4ZNv66x4wV9Ic1rI"
        publishable-key="pk_test_51QnyrzRw4ZNv66x4m86XXXOg4l84CauX5S3njyV6ggu50DHaHvsMUzO0KXwwCX5noS6FKkKMlcafXnC1tUSBpHzo00RZGk2PMR"
        customer-id={customerId}
      />
    </>
  );
}
