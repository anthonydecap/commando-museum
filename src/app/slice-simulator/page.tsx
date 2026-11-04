import { SliceSimulator, type SliceSimulatorParams, getSlices } from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { defaultLocale } from "@/i18n";
import { components } from "@/slices";

export default async function SliceSimulatorPage({ searchParams }: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} context={{ lang: defaultLocale }} />
    </SliceSimulator>
  );
}
