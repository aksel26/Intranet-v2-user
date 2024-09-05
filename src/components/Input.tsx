"use cilent";

import React from "react";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import classes from "./FloatingLabelInput.module.css";

interface inputInterface {
  label: string;
  placeholder: string;
}

export function Input(props: inputInterface) {
  const { label, placeholder } = props;

  //   return <TextInput withAsterisk label="Email" placeholder="your@email.com" key={form.key("email")} {...form.getInputProps("email")} />;
}
