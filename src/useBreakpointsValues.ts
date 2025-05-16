import { type BreakpointKeys, type BreakpointsValues } from "./fr/breakpoints";
import { useBreakpointsValuesPx } from "./useBreakpointsValuesPx";

export type { BreakpointKeys, BreakpointsValues };

/** @deprecated Use import { useBreakpointsValuesPx } from "@apitech/react-dsapitech/useBreakpointsValuesPx"; instead */
export const useBreakpointsValues = useBreakpointsValuesPx;
