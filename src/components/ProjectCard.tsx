import { useNavigate } from 'react-router-dom';
import { Calendar, Users, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Project } from '@/hooks/useProjects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

const statusColors = {
  active: 'bg-blue-500 dark:bg-blue-600 text-white',
  completed: 'bg-green-500 dark:bg-green-600 text-white',
  'on-hold': 'bg-gray-400 dark:bg-gray-600 text-white',
};

// Border colors match status badge colors
const statusBorderColors = {
  active: 'border-l-blue-500 dark:border-l-blue-600',
  completed: 'border-l-green-500 dark:border-l-green-600',
  'on-hold': 'border-l-gray-400 dark:border-l-gray-600',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  const completedTasks = project.tasks.filter(t => t.status === 'done').length;
  const totalTasks = project.tasks.length;

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Card
      className={cn(
        'group relative cursor-pointer h-full w-full flex flex-col border-l-4 overflow-hidden',
        'transition-all duration-300 ease-out',
        'hover:shadow-xl hover:scale-[1.02]',
        'animate-in fade-in slide-in-from-bottom-4 duration-500',
        statusBorderColors[project.status]
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.name}`}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" />
      </div>

      <div className="relative z-10">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {project.name}
            </CardTitle>
            <Badge className={cn('shrink-0 text-xs transition-transform duration-300 group-hover:scale-110', statusColors[project.status])}>
              {project.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1.5 transition-colors duration-300 group-hover:text-foreground/80">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Progress</span>
              <span className="font-semibold text-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
              <span className="truncate">{completedTasks}/{totalTasks} tasks</span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span>{project.team.length}</span>
            </div>

            <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
