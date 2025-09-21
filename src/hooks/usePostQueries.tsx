import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateMultiAIPost, optimizeMultiAIPost, generateMultiAIHashtags } from '@/services/multiAIService';
import { CreatePostFormValues } from '@/components/post/CreatePostForm';
import { OptimizePostFormValues } from '@/components/post/OptimizePostForm';

// Post generation query
export const useGeneratePost = (options: CreatePostFormValues & { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['post-generate', options.topic, options.tone, options.contentStyle, options.postLength, options.industry, options.keywords],
    queryFn: () => {
      const humanizedDescription = options.humanize
        ? `${options.description || ""}

Humanization guidelines:
- First-person voice and authentic perspective
- Use natural contractions
- Include a brief, specific anecdote or micro-story if relevant
- Vary sentence lengths; keep paragraphs 1–3 sentences
- Add a thoughtful question at the end
- Include 3–5 relevant, niche+popular mix hashtags`
        : options.description || "";

      return generateMultiAIPost({
        topic: options.topic,
        tone: options.tone,
        keywords: options.keywords || "",
        description: humanizedDescription,
        contentStyle: options.contentStyle,
        postLength: options.postLength,
        industry: options.industry
      });
    },
    enabled: options.enabled && !!options.topic,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    retry: 2,
  });
};

// Post optimization query
export const useOptimizePost = (options: OptimizePostFormValues & { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['post-optimize', options.existingPost, options.optimizationGoal, options.humanize],
    queryFn: () => {
      const enhancedGoal = options.humanize 
        ? `${options.optimizationGoal} with humanized tone (first-person, natural contractions, brief anecdote where relevant, short paragraphs, end with a thoughtful question, add 3–5 relevant hashtags)`
        : options.optimizationGoal;
        
      return optimizeMultiAIPost({
        post: options.existingPost,
        optimizationGoal: enhancedGoal
      });
    },
    enabled: options.enabled && !!options.existingPost && options.existingPost.length > 10,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Hashtag generation query
export const useGenerateHashtags = (options: { topic: string; industry: string; keywords?: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['hashtags-generate', options.topic, options.industry, options.keywords],
    queryFn: () => generateMultiAIHashtags({
      topic: options.topic,
      industry: options.industry,
      keywords: options.keywords || ""
    }),
    enabled: options.enabled && !!options.topic,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    retry: 2,
  });
};

// Post generation mutation (for form submissions)
export const useGeneratePostMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (options: CreatePostFormValues) => {
      const humanizedDescription = options.humanize
        ? `${options.description || ""}

Humanization guidelines:
- First-person voice and authentic perspective
- Use natural contractions
- Include a brief, specific anecdote or micro-story if relevant
- Vary sentence lengths; keep paragraphs 1–3 sentences
- Add a thoughtful question at the end
- Include 3–5 relevant, niche+popular mix hashtags`
        : options.description || "";

      return generateMultiAIPost({
        topic: options.topic,
        tone: options.tone,
        keywords: options.keywords || "",
        description: humanizedDescription,
        contentStyle: options.contentStyle,
        postLength: options.postLength,
        industry: options.industry
      });
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ 
        queryKey: ['post-generate', variables.topic, variables.tone, variables.contentStyle, variables.postLength, variables.industry, variables.keywords]
      });
    },
  });
};

// Post optimization mutation (for form submissions)
export const useOptimizePostMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (options: OptimizePostFormValues) => {
      const enhancedGoal = options.humanize 
        ? `${options.optimizationGoal} with humanized tone (first-person, natural contractions, brief anecdote where relevant, short paragraphs, end with a thoughtful question, add 3–5 relevant hashtags)`
        : options.optimizationGoal;
        
      return optimizeMultiAIPost({
        post: options.existingPost,
        optimizationGoal: enhancedGoal
      });
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ 
        queryKey: ['post-optimize', variables.existingPost, variables.optimizationGoal, variables.humanize]
      });
    },
  });
};