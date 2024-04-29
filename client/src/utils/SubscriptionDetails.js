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
  const planLimit = subscriptionDetails.isSubscribed? getPlanLimit(subscriptionDetails.plan):15;
  return planLimit-currentCount>0?true:false;
}

export function getPlanLimit(plan) {
  if (plan === "Monthly") {
    return 300;
  } else {
    return 400;
  }
}

export function getUserDetails() {
  const userDetailsStr = localStorage.getItem("UserDetails");
  const userDetails = JSON.parse(userDetailsStr);
  return userDetails;
}

export function setUserDetails(userDetails) {
  const userDetailsStr = JSON.stringify(userDetails);
  localStorage.setItem("UserDetails", userDetailsStr);
}


