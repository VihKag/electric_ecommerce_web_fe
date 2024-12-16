import React from 'react';
import { Skeleton, Card } from 'antd';

export const BannerSkeleton = () => (
  <div className="w-full h-[480px] bg-gray-200 rounded-md animate-pulse" />
);

export const CategorySkeleton = () => (
  <div className="flex flex-col gap-1">
    {[...Array(8)].map((_, index) => (
      <Skeleton.Button key={index} active size="large" shape="square" block />
    ))}
  </div>
);

export const ProductGroupSkeleton = () => (
  <div className="mt-4">
    <Skeleton.Input style={{ width: 200 }} active size="large" />
    <div className="flex gap-2 mt-2">
      {[...Array(5)].map((_, index) => (
        <Skeleton.Button key={index} active size="small" shape="round" />
      ))}
    </div>
    <div className="flex gap-4 mt-4">
      {[...Array(5)].map((_, index) => (
        <Card
          key={index}
          style={{ width: 200 }}
          cover={<Skeleton.Image active style={{ width: 200, height: 200 }} />}
        >
          <Skeleton active />
        </Card>
      ))}
    </div>
  </div>
);

