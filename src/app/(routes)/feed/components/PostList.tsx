'use client';

import { useEffect } from 'react';
import { usePosts } from '@/app/hooks/usePosts';
import PostCard from '@/app/components/posts/PostCard';
import { useInView } from 'react-intersection-observer';

export default function PostList() {
  const { posts, loading, error, fetchPosts } = usePosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar los posts. Por favor, intenta de nuevo.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      )}

      {/* Elemento para detectar cuando llegamos al final y cargar más posts */}
      <div ref={ref} className="h-10" />
    </div>
  );
}