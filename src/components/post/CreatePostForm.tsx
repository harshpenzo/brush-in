import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, Hash } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGeneratePost } from "@/hooks/usePostQueries";
import PostPreviewLive from "@/components/PostPreviewLive";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

// Create Schema for form validation
const createPostSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  description: z.string().optional(),
  tone: z.string().default("professional"),
  contentStyle: z.string().default("default"),
  postLength: z.string().default("medium"),
  keywords: z.string().optional(),
  industry: z.string().default("technology"),
  targetAudience: z.string().default("general"),
  postObjective: z.string().default("engagement"),
  humanize: z.boolean().default(true),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;

interface CreatePostFormProps {
  onGenerate: (values: CreatePostFormValues) => void;
  isGenerating: boolean;
  showPreview?: boolean;
}

export const CreatePostForm = ({ onGenerate, isGenerating, showPreview = true }: CreatePostFormProps) => {
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      topic: "",
      description: "",
      tone: "professional",
      contentStyle: "default",
      postLength: "medium",
      keywords: "",
      industry: "technology",
      targetAudience: "general",
      postObjective: "engagement",
      humanize: true,
    },
  });

  // Watch form values for live preview (increased debounce for better performance)
  const formValues = form.watch();
  const debouncedValues = useDebounce(formValues, 1200);
  
  // Generate preview with cached query
  const { data: preview, isLoading: isPreviewLoading } = useGeneratePost({
    ...debouncedValues,
    enabled: showPreview && !!debouncedValues.topic && debouncedValues.topic.length > 2,
  });

  return (
    <div className="space-y-6">
      {showPreview && (
        <PostPreviewLive 
          preview={preview} 
          isLoading={isPreviewLoading}
          isEnabled={!!debouncedValues.topic && debouncedValues.topic.length > 2}
        />
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-4">
        {/* Topic */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Topic</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Leadership, Industry Trends, Work-Life Balance"
                  className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add more context about your post..."
                  className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Tone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                    <SelectItem value="bold">Bold/Contrarian</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Content Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="default">Standard</SelectItem>
                    <SelectItem value="storytelling">Personal Story</SelectItem>
                    <SelectItem value="listicle">List/Tips</SelectItem>
                    <SelectItem value="question-based">Question-based</SelectItem>
                    <SelectItem value="data-driven">Data-driven</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                    <SelectItem value="problem-solution">Problem-Solution</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Post Length</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="short">Short (&lt; 500 chars)</SelectItem>
                    <SelectItem value="medium">Medium (500-1000 chars)</SelectItem>
                    <SelectItem value="long">Long (&gt; 1000 chars)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="general">General Business</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Target Audience</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General Professionals</SelectItem>
                    <SelectItem value="executives">C-Level Executives</SelectItem>
                    <SelectItem value="entrepreneurs">Entrepreneurs</SelectItem>
                    <SelectItem value="managers">Managers</SelectItem>
                    <SelectItem value="developers">Developers/Engineers</SelectItem>
                    <SelectItem value="marketers">Marketers</SelectItem>
                    <SelectItem value="sales">Sales Professionals</SelectItem>
                    <SelectItem value="job-seekers">Job Seekers</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postObjective"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Post Objective</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select objective" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="engagement">Drive Engagement</SelectItem>
                    <SelectItem value="awareness">Build Awareness</SelectItem>
                    <SelectItem value="thought-leadership">Thought Leadership</SelectItem>
                    <SelectItem value="lead-generation">Lead Generation</SelectItem>
                    <SelectItem value="education">Educate Audience</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">
                <div className="flex items-center">
                  Keywords
                  <Hash className="ml-1 h-4 w-4 text-slate-500" />
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. innovation, strategy, growth (comma separated)"
                  className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Humanize toggle */}
        <FormField
          control={form.control}
          name="humanize"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md border border-slate-300 dark:border-slate-600 p-3">
              <div>
                <FormLabel className="text-slate-900 dark:text-slate-300 font-medium">Humanize writing</FormLabel>
                <p className="text-sm text-slate-500 mt-1">First-person voice, contractions, micro-story, short paragraphs, end with a thoughtful question.</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-md transition-all"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="text-white">Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              <span className="text-white">Generate Post with AI</span>
            </>
          )}
        </Button>
        </form>
      </Form>
    </div>
  );
};
