'use client';

import { useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { usePosts } from '@/app/hooks/usePosts';
import { toast } from 'react-hot-toast';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createPost } = usePosts();
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      await open();
      return;
    }
    if (!content.trim()) return;
    try {
      setIsSubmitting(true);
      await createPost({ content: content.trim() });
      setContent('');
      toast.success('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error creating post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="
      rounded-lg
      p-4
      shadow
      bg-black/30
      backdrop-blur-md
      border
      border-white/10
      mb-4
    ">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="
            w-full
            p-2
            rounded-lg
            resize-none
            h-24
            bg-transparent
            border
            border-gray-200/50
            text-white
            placeholder-gray-400
            focus:outline-none
          "
        />
        <div className="flex justify-end items-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="
              px-4
              py-2
              bg-purple-600
              text-white
              rounded-full
              hover:bg-purple-700
              disabled:opacity-50
              transition-colors
              duration-300
            "
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}
