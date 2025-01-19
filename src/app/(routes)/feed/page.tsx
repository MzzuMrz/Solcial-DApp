'use client';

import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

export default function FeedPage() {

  return (
    <div className="max-w-2xl mx-auto my-16">
      <CreatePost />
      <PostList />
    </div>
  );
}