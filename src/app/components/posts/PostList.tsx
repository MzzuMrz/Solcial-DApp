'use client';

import { useEffect } from 'react';
import { usePosts } from '@/app/hooks/usePosts';
import PostCard from './PostCard';
import { Post } from '@/types/post';

export default function PostList() {
  const { posts, loading, error, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return <div>Cargando posts...</div>;
  }

  if (error) {
    return <div>Error al cargar posts: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}