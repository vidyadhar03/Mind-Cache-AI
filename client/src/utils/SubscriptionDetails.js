export function getSubDetails() {
  const subscriptionDetailsStr = localStorage.getItem("subscriptionDetails");
  const subscriptionDetails = JSON.parse(subscriptionDetailsStr);
  return subscriptionDetails;
}

export function setSubDetails(subscriptionDetails) {
  const subscriptionDetailsStr = JSON.stringify(subscriptionDetails);
  localStorage.setItem("subscriptionDetails", subscriptionDetailsStr);
}


export function isEligible() {
  const subscriptionDetails = getSubDetails();
  const currentCount = subscriptionDetails.aiInteractionCount;
  const planLimit = subscriptionDetails.isSubscribed? getPlanLimit(subscriptionDetails.plan):10;
  return planLimit-currentCount>0?true:false;
}

export function getPlanLimit(plan) {
  if (plan === "monthly") {
    return 150;
  } else {
    return 200;
  }
}


