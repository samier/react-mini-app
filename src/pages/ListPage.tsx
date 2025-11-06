import { useState, useMemo, useEffect } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { SearchBar } from '@/components/SearchBar';
import { ProjectList } from '@/components/ProjectList';
import { LayoutGrid, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { filterProjects } = useProjects();

  const filteredProjects = useMemo(
    () => filterProjects(searchQuery),
    [searchQuery, filterProjects]
  );

  useEffect(() => {
    document.title = 'Project Dashboard - Manage Your Projects';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10 backdrop-blur-sm shadow-sm border-border animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <LayoutGrid className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredProjects.length} projects
                </p>
              </div>
            </div>
            <Button className="gap-2 transition-transform duration-300 hover:scale-105">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
          
          <div className="animate-in fade-in slide-in-from-top duration-300 delay-150">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search projects..."
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <ProjectList projects={filteredProjects} searchQuery={searchQuery} />
      </main>
    </div>
  );
}
