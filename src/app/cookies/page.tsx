import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Illyria Trails uses cookies, and how to manage your preferences.",
  alternates: { canonical: "/cookies" },
};

const cookieTypes = [
  {
    name: "Essential",
    purpose: "Required for core site function — booking flow, session state, and security.",
    canDisable: false,
  },
  {
    name: "Analytics",
    purpose: "GA4 and Vercel Analytics, used to understand site usage and improve tour pages.",
    canDisable: true,
  },
  {
    name: "Marketing",
    purpose: "Used only if you opt in to the newsletter, to measure email campaign performance.",
    canDisable: true,
  },
];

export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Cookie Policy", url: "/cookies" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Cookie Policy</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Placeholder policy for demonstration purposes — review with legal counsel before publishing a live site.
        </p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-paper-dim text-ink-soft">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                <th scope="col" className="px-4 py-3 font-semibold">Can be disabled?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-white">
              {cookieTypes.map((c) => (
                <tr key={c.name}>
                  <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
                  <td className="px-4 py-3 text-ink-soft">{c.purpose}</td>
                  <td className="px-4 py-3 text-ink-soft">{c.canDisable ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-ink-soft">
          You can manage analytics and marketing cookie preferences at any time through your browser settings.
          Disabling essential cookies may prevent the booking flow from working correctly.
        </p>
      </div>
    </>
  );
}
