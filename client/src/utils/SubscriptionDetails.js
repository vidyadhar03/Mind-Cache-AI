function getSubDetails() {
  const subscriptionDetailsStr = localStorage.getItem("subscriptionDetails");
  const subscriptionDetails = JSON.parse(subscriptionDetailsStr);
  return subscriptionDetails;
}

function setSubDetails(subscriptionDetails) {
  const subscriptionDetailsStr = JSON.stringify(subscriptionDetails);
  localStorage.setItem("subscriptionDetails", subscriptionDetailsStr);
}


function isEligible() {
  const subscriptionDetails = getSubDetails();
  const currentCount = subscriptionDetails.aiInteractionCount;
  const planLimit = getPlanLimit(subscriptionDetails.plan); // Function to return the limit based on the plan

  // Check if the current billing cycle has ended
  let startDate = user.joinDate;
  if (subscriptionDetails.isSubscribed) {
    startDate = subscriptionDetails.billingCycleStartDate;
  }

  const daysSinceStart = Math.floor(
    (Date.now() - startDate) / (1000 * 60 * 60 * 24)
  );

  

}

function getPlanLimit(plan) {
  if (plan === "monthly") {
    return 150;
  } else {
    return 200;
  }
}


