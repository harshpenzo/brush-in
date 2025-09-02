import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getUsageStats } from '@/services/usageService';

interface UsageStats {
  postsUsed: number;
  postsRemaining: number;
  totalLimit: number;
  usagePercentage: number;
}

const UsageTracker = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UsageStats>({
    postsUsed: 0,
    postsRemaining: 50,
    totalLimit: 50,
    usagePercentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsageStats = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const usageStats = await getUsageStats(user.id);
        setStats(usageStats);
      } catch (error) {
        console.error('Error loading usage stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsageStats();
  }, [user?.id]);

  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return 'text-green-600 dark:text-green-400';
    if (percentage < 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <BarChart3 className="h-5 w-5" />
            Usage Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="flex gap-4">
              <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded flex-1"></div>
              <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded flex-1"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
          <BarChart3 className="h-5 w-5" />
          Usage Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Monthly Post Limit
          </span>
          <Badge variant="outline" className="bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            FREE TIER
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              {stats.postsUsed} of {stats.totalLimit} posts used
            </span>
            <span className={getUsageColor(stats.usagePercentage)}>
              {stats.usagePercentage}%
            </span>
          </div>
          <Progress 
            value={stats.usagePercentage} 
            className="h-2"
            style={{
              background: `linear-gradient(to right, ${getProgressColor(stats.usagePercentage)} 0%, ${getProgressColor(stats.usagePercentage)} ${stats.usagePercentage}%, #e2e8f0 ${stats.usagePercentage}%, #e2e8f0 100%)`
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Used</span>
            </div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">
              {stats.postsUsed}
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Remaining</span>
            </div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">
              {stats.postsRemaining}
            </div>
          </div>
        </div>

        {stats.usagePercentage >= 80 && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {stats.usagePercentage >= 100 
                ? "You've reached your monthly limit. Upgrade for unlimited posts!"
                : "You're approaching your monthly limit. Consider upgrading for unlimited access."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsageTracker;