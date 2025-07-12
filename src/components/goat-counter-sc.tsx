import Script from "next/script";

type Props = {
  path: string;
  allowLocal?: boolean;
};

export default function GoatCounterScript({ path, allowLocal = true }: Props) {
  const settings = JSON.stringify({ allow_local: allowLocal, path });

  return (
    <Script
      data-goatcounter={process.env.NEXT_PUBLIC_GOATCOUNTER_URL}
      data-goatcounter-settings={settings}
      src="//gc.zgo.at/count.js"
      strategy="afterInteractive"
      async
    />
  );
}
