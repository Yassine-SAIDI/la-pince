import React, { ReactNode} from 'react'
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

function SkeletonWrapper({
    children,
    isLoading,
    fullWith = true,
}: {
    children: ReactNode;
    isLoading: boolean;
    fullWith?: boolean;
}) {
    if (!isLoading) return children;
  return <Skeleton className={
    cn(fullWith && "w-full")}>
    <div className="opacity-0">{children}</div>
  </Skeleton>;
}

export default SkeletonWrapper
