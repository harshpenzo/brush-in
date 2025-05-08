
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Loader2 } from "lucide-react";
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
const optimizePostSchema = z.object({
  existingPost: z.string().min(10, { message: "Please enter at least 10 characters" }),
  optimizationGoal: z.string().default("engagement"),
});

export type OptimizePostFormValues = z.infer<typeof optimizePostSchema>;

interface OptimizePostFormProps {
  onOptimize: (values: OptimizePostFormValues) => void;
  isGenerating: boolean;
}

export const OptimizePostForm = ({ onOptimize, isGenerating }: OptimizePostFormProps) => {
  const form = useForm<OptimizePostFormValues>({
    resolver: zodResolver(optimizePostSchema),
    defaultValues: {
      existingPost: "",
      optimizationGoal: "engagement",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onOptimize)} className="space-y-4">
        <FormField
          control={form.control}
          name="existingPost"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Your Existing Post</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your existing LinkedIn post here..."
                  className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="optimizationGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900 dark:text-slate-300 font-medium mb-1 block">Optimization Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border border-slate-300 dark:border-slate-600 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring focus:ring-sky-500/20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select optimization goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="engagement">Boost Engagement</SelectItem>
                  <SelectItem value="clarity">Improve Clarity</SelectItem>
                  <SelectItem value="professionalism">Enhance Professionalism</SelectItem>
                  <SelectItem value="general">General Improvement</SelectItem>
                </SelectContent>
              </Select>
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
              <span className="text-white">Optimizing...</span>
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              <span className="text-white">Optimize Post with AI</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
