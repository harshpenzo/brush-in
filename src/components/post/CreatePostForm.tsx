
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, Hash } from "lucide-react";
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

// Create Schema for form validation
const createPostSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  description: z.string().optional(),
  tone: z.string().default("professional"),
  contentStyle: z.string().default("default"),
  postLength: z.string().default("medium"),
  keywords: z.string().optional(),
  industry: z.string().default("technology"),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;

interface CreatePostFormProps {
  onGenerate: (values: CreatePostFormValues) => void;
  isGenerating: boolean;
}

export const CreatePostForm = ({ onGenerate, isGenerating }: CreatePostFormProps) => {
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
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-4">
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
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
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
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                    <SelectItem value="listicle">Listicle</SelectItem>
                    <SelectItem value="question-based">Question-based</SelectItem>
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
                    <SelectItem value="general">General</SelectItem>
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
  );
};
