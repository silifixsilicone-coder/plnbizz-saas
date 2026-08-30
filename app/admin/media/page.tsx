import React from 'react';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { MediaLibrary } from '@/components/admin/MediaLibrary';

export default function AdminMediaPage() {
  return (
    <AdminLayoutWrapper
      title="Media Library"
      description="View, copy URLs, and manage uploaded Firebase Storage images"
    >
      <MediaLibrary />
    </AdminLayoutWrapper>
  );
}
