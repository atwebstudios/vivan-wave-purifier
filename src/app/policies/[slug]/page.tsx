import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { policies, policyBySlug } from "@/data/policies";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = policyBySlug.get(slug);
  if (!policy) return { title: "Policy not found" };
  return { title: policy.title, description: policy.intro };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = policyBySlug.get(slug);
  if (!policy) notFound();

  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{policy.title}</h1>
      <p className="mt-3 text-muted">{policy.intro}</p>

      <div className="mt-8 space-y-6">
        {policy.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-semibold text-ink">{s.heading}</h2>
            <p className="mt-1.5 text-slate-700">{s.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Note: This is placeholder copy. Replace it with the finalised legal text before launch.
      </p>
    </Container>
  );
}
