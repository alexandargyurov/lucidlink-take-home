import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.JSX.Element;
};

function hasAWSKeys(): boolean {
  const requiredKeys = [
    "AWS_SECRET_ACCESS_KEY",
    "AWS_ACCESS_KEY_ID",
    "AWS_REGION",
    "AWS_BUCKET",
  ];

  for (const key of requiredKeys) {
    if (!localStorage.getItem(key)) {
      return false;
    }
  }

  return true;
}

export function PrivateRoute({ children }: Props): React.JSX.Element {
  if (hasAWSKeys()) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
