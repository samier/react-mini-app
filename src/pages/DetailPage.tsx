import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, AlertCircle, ListTodo, TrendingUp } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { TaskList } from '@/components/TaskList';
import { cn } from '@/lib/utils';

const statusColors = {
  active: 'bg-blue-500 dark:bg-blue-600 text-white',
  completed: 'bg-green-500 dark:bg-green-600 text-white',
  'on-hold': 'bg-gray-400 dark:bg-gray-600 text-white',
};

const priorityColors = {
  high: 'text-red-600 dark:text-red-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  low: 'text-gray-600 dark:text-gray-400',
};

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();

  const project = id ? getProjectById(id) : undefined;

  useEffect(() => {
    if (project) {
      document.title = `${project.name} - Project Dashboard`;
    } else {
      document.title = 'Project Not Found - Project Dashboard';
    }
    
    // Cleanup: reset title when component unmounts
    return () => {
      document.title = 'Project Dashboard - Manage Your Projects';
    };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertCircle className="h-5 w-5" />
              <CardTitle>Project Not Found</CardTitle>
            </div>
            <CardDescription>
              The project you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedTasks = project.tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = project.tasks.filter(t => t.status === 'in-progress').length;
  const todoTasks = project.tasks.filter(t => t.status === 'todo').length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm border-border animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 -ml-2 gap-2 transition-transform duration-300 hover:scale-105"
            aria-label="Go back to projects list"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              <h1 className="text-2xl font-bold tracking-tight mb-2">{project.name}</h1>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <Badge className={cn('transition-transform duration-300 hover:scale-110', statusColors[project.status])}>
                {project.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
              <Badge variant="outline" className={cn('transition-transform duration-300 hover:scale-110', priorityColors[project.priority])}>
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} priority
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content - Tasks */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />
              </div>
              <div className="relative z-10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ListTodo className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        Tasks
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {project.tasks.length} total • {completedTasks} completed • {inProgressTasks} in progress
                      </CardDescription>
                    </div>
                    <Button size="sm" className="gap-2 transition-transform duration-300 hover:scale-105">
                      <ListTodo className="h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <TaskList tasks={project.tasks} />
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-450">
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />
              </div>
              <div className="relative z-10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Overall</span>
                      <span className="text-xl font-bold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium">{completedTasks} tasks</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">In Progress</span>
                      <span className="font-medium">{inProgressTasks} tasks</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">To Do</span>
                      <span className="font-medium">{todoTasks} tasks</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            <Card className="group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-600">
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />
              </div>
              <div className="relative z-10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <p className="font-medium mt-1">
                      {new Date(project.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm text-muted-foreground">Days Remaining</span>
                    <p className="font-medium mt-1">
                      {Math.ceil(
                        (new Date(project.dueDate).getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>

            <Card className="group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-750">
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />
              </div>
              <div className="relative z-10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Team
                  </CardTitle>
                  <CardDescription>
                    {project.team.length} members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.team.map((member, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm transition-transform duration-300 hover:translate-x-1"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary text-xs transition-transform duration-300 hover:scale-110">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
