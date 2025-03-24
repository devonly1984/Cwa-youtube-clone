"use client"
import FilterCarousel from '@/components/shared/FilterCarousel';
import {CategoriesSkeleton} from '@/components/shared/skeletons'
import {trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation';
import { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
interface CategoriesSectionProps {
  categoryId?: string;
}
const CategorySection = ({categoryId}:CategoriesSectionProps)=>{
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategorySectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
}

const CategorySectionSuspense = ({categoryId}:CategoriesSectionProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const router =useRouter();
  const data = categories.map(({ name, id }) => ({
    value: id,
    label: name,
  }));
  const onSelect = (value:string|null)=>{
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set('categoryId',value)
    } else {
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  }
  return (
    <FilterCarousel
      value={categoryId}
      data={data}
      isLoading={false}
      onSelect={onSelect}
    />
  );
}
export default CategorySection