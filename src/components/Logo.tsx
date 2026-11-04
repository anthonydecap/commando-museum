import Image from "next/image";

/** The museum emblem: the Combined Operations badge of the commandos, in white. */
export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <Image src="/commando-logo.svg" alt="" width={1512} height={1512} unoptimized className={className} />;
}
