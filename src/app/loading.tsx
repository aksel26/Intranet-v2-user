"use client";
import { LoadingOverlay } from "@mantine/core";
import React from "react";

export default function loading() {
  return <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />;
}
