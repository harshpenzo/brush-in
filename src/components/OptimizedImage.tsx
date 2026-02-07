import { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  lazy?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * OptimizedImage component with:
 * - Lazy loading for below-the-fold images
 * - Width/height to prevent CLS
 * - Responsive srcset for different screen sizes
 * - Priority loading for above-the-fold images
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  lazy = true,
  priority = false,
  sizes = '100vw',
  className = '',
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority && imgRef.current) {
      imgRef.current.fetchPriority = 'high';
    }
  }, [priority]);

  // Generate srcset for responsive images (for external URLs with w/h params)
  const generateSrcSet = (baseSrc: string): string | undefined => {
    // For Unsplash images, generate srcset
    if (baseSrc.includes('unsplash.com')) {
      const baseUrl = baseSrc.split('?')[0];
      return [
        `${baseUrl}?w=320&fit=crop&auto=format 320w`,
        `${baseUrl}?w=640&fit=crop&auto=format 640w`,
        `${baseUrl}?w=960&fit=crop&auto=format 960w`,
        `${baseUrl}?w=1280&fit=crop&auto=format 1280w`,
      ].join(', ');
    }
    return undefined;
  };

  const srcSet = generateSrcSet(src);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : lazy ? 'lazy' : undefined}
      decoding={priority ? 'sync' : 'async'}
      sizes={srcSet ? sizes : undefined}
      srcSet={srcSet}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      onLoad={() => setIsLoaded(true)}
      onError={(e) => {
        setIsLoaded(true); // Show broken image rather than nothing
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
