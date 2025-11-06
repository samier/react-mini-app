import { Project } from '@/hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import { SearchX, FolderOpen } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  searchQuery: string;
}

export function ProjectList({ projects, searchQuery }: ProjectListProps) {
  if (projects.length === 0) {
    const isSearching = searchQuery.trim().length > 0;
    const Icon = isSearching ? SearchX : FolderOpen;

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative bg-primary/10 rounded-full p-6">
            <Icon className="h-16 w-16 text-primary/70" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">
          {isSearching ? 'No projects found' : 'No projects yet'}
        </h3>
        <p className="text-muted-foreground max-w-md">
          {isSearching
            ? (
              <>
                No projects match <span className="font-semibold text-foreground">"{searchQuery}"</span>.
                <br className="hidden sm:block" /> Try a different search term or clear your search.
              </>
            )
            : 'Get started by creating your first project to begin managing your work.'}
        </p>
        {isSearching && (
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Try searching by project name, description, or team member</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
      role="list"
      aria-label="Projects list"
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          role="listitem"
          className="flex w-full min-w-0"
          style={{
            animationDelay: `${index * 50}ms`
          }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
