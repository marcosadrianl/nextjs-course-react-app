import Pagination from "@/app/ui/invoices/pagination";
import Table from "@/app/ui/customers/table";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { fetchCustomers } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const customersRaw = await fetchCustomers();
  console.log("customers", customersRaw);

  // Map customersRaw to the expected FormattedCustomersTable[] shape
  const customers = customersRaw.map((c: any) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    image_url: c.image_url,
    total_invoices: c.total_invoices,
    total_pending: c.total_pending,
    total_paid: c.total_paid,
  }));

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
}
