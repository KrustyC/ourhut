import type { ReactElement, FC } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  Layout?: FC;
};
