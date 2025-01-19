'use client';

import { useState } from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { usePosts } from '@/app/hooks/usePosts';
import { ImagePlus, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CreatePost() {
  const { status } = useAppKitAccount();
  const { open } = useAppKit();
  const { createPost } = usePosts();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (status !== 'connected') {
      await open();
      return;
    }
    try {
      setIsSubmitting(true);
      await createPost({
        content: content.trim(),
        attachments: images,
      });
      setContent('');
      setImages([]);
      toast.success('Post creado exitosamente');
    } catch (error) {
      toast.error('Error al crear el post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target?.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      className="
        mb-4
        rounded-lg
        p-4
        shadow-sm
        bg-black/30
        backdrop-blur-md
        border
        border-white/10
      "
    >
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="¿Qué está pasando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="
            w-full
            p-3
            rounded-lg
            bg-transparent
            text-white
            border
            border-white/20
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
            focus:border-purple-500
            resize-none
          "
        />
        {images.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    text-white
                    rounded-full
                    p-1
                    hover:bg-red-600
                  "
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label
              className="
                cursor-pointer
                text-purple-500
                hover:text-purple-400
                transition-colors
                duration-200
              "
            >
              <ImagePlus size={20} />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
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
              disabled:cursor-not-allowed
              transition-colors
              duration-300
            "
          >
            {isSubmitting ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
}
