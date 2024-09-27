import { Progress } from 'bluerally-design-system';
import React from 'react';

export const Loading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <Progress size="lg" thickness={4} />
  </div>
);
