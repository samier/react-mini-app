import { Task } from '@/hooks/useProjects';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
}

const statusConfig = {
  'todo': { label: 'To Do', className: 'bg-secondary text-secondary-foreground' },
  'in-progress': { label: 'In Progress', className: 'bg-primary text-primary-foreground' },
  'review': { label: 'Review', className: 'bg-warning text-warning-foreground' },
  'done': { label: 'Done', className: 'bg-success text-success-foreground' },
};

const priorityConfig = {
  'high': { className: 'text-destructive border-destructive' },
  'medium': { className: 'text-warning border-warning' },
  'low': { className: 'text-muted-foreground border-muted-foreground' },
};

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="group relative border rounded-lg p-4 hover:bg-muted/50 transition-all duration-300 cursor-pointer hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden"
          style={{
            animationDelay: `${index * 50}ms`
          }}
        >
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 dark:via-white/3 to-transparent" />
          </div>
          <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {task.title}
                </h4>
                <Badge
                  variant="outline"
                  className={cn('text-xs', priorityConfig[task.priority].className)}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                {task.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-5 w-5">
                    <div className="h-full w-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">
                      {task.assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                  </Avatar>
                  <span>{task.assignee.split(' ')[0]}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>

                {task.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    <span>{task.tags[0]}</span>
                    {task.tags.length > 1 && (
                      <span className="text-muted-foreground">+{task.tags.length - 1}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Badge className={cn('shrink-0 transition-transform duration-300 group-hover:scale-110', statusConfig[task.status].className)}>
              {statusConfig[task.status].label}
            </Badge>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
