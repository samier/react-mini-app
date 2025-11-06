import { useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  team: string[];
  progress: number;
  tasks: Task[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design patterns and improved UX',
    status: 'active',
    priority: 'high',
    dueDate: '2025-12-15',
    team: ['Alice Johnson', 'Bob Smith', 'Carol Williams'],
    progress: 65,
    tasks: [
      {
        id: 't1',
        title: 'Design new homepage mockup',
        description: 'Create high-fidelity mockups for the new homepage design',
        status: 'done',
        priority: 'high',
        assignee: 'Alice Johnson',
        dueDate: '2025-11-15',
        tags: ['design', 'ui'],
      },
      {
        id: 't2',
        title: 'Implement responsive navigation',
        description: 'Build mobile-first navigation with hamburger menu',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Bob Smith',
        dueDate: '2025-11-20',
        tags: ['development', 'frontend'],
      },
      {
        id: 't3',
        title: 'Optimize image assets',
        description: 'Compress and optimize all images for web performance',
        status: 'review',
        priority: 'medium',
        assignee: 'Carol Williams',
        dueDate: '2025-11-18',
        tags: ['optimization', 'performance'],
      },
      {
        id: 't4',
        title: 'Set up analytics tracking',
        description: 'Implement Google Analytics and heat mapping',
        status: 'todo',
        priority: 'low',
        assignee: 'Bob Smith',
        dueDate: '2025-11-25',
        tags: ['analytics'],
      },
    ],
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build a cross-platform mobile application for iOS and Android',
    status: 'active',
    priority: 'high',
    dueDate: '2025-11-30',
    team: ['David Brown', 'Emma Davis', 'Frank Miller'],
    progress: 42,
    tasks: [
      {
        id: 't5',
        title: 'User authentication flow',
        description: 'Implement login, signup, and password reset',
        status: 'in-progress',
        priority: 'high',
        assignee: 'David Brown',
        dueDate: '2025-11-12',
        tags: ['authentication', 'security'],
      },
      {
        id: 't6',
        title: 'Design app icon and splash screen',
        description: 'Create app branding assets for both platforms',
        status: 'done',
        priority: 'medium',
        assignee: 'Emma Davis',
        dueDate: '2025-11-08',
        tags: ['design', 'branding'],
      },
      {
        id: 't7',
        title: 'Build offline mode',
        description: 'Enable app functionality without internet connection',
        status: 'todo',
        priority: 'medium',
        assignee: 'Frank Miller',
        dueDate: '2025-11-22',
        tags: ['feature', 'offline'],
      },
    ],
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integrate third-party APIs for payment processing and analytics',
    status: 'completed',
    priority: 'medium',
    dueDate: '2025-10-20',
    team: ['Grace Lee', 'Henry Taylor'],
    progress: 100,
    tasks: [
      {
        id: 't8',
        title: 'Stripe payment integration',
        description: 'Set up Stripe API for subscription payments',
        status: 'done',
        priority: 'high',
        assignee: 'Grace Lee',
        dueDate: '2025-10-15',
        tags: ['payment', 'api'],
      },
      {
        id: 't9',
        title: 'Analytics API setup',
        description: 'Connect to analytics platform API',
        status: 'done',
        priority: 'medium',
        assignee: 'Henry Taylor',
        dueDate: '2025-10-18',
        tags: ['analytics', 'api'],
      },
    ],
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migrate legacy database to modern cloud infrastructure',
    status: 'active',
    priority: 'high',
    dueDate: '2025-11-10',
    team: ['Ian Anderson', 'Julia White'],
    progress: 78,
    tasks: [
      {
        id: 't10',
        title: 'Data backup and validation',
        description: 'Create complete backup of existing database',
        status: 'done',
        priority: 'high',
        assignee: 'Ian Anderson',
        dueDate: '2025-11-05',
        tags: ['backup', 'data'],
      },
      {
        id: 't11',
        title: 'Schema migration scripts',
        description: 'Write SQL migration scripts for new structure',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Julia White',
        dueDate: '2025-11-08',
        tags: ['migration', 'sql'],
      },
      {
        id: 't12',
        title: 'Performance testing',
        description: 'Run load tests on new database setup',
        status: 'todo',
        priority: 'medium',
        assignee: 'Ian Anderson',
        dueDate: '2025-11-10',
        tags: ['testing', 'performance'],
      },
    ],
  },
  {
    id: '5',
    name: 'Security Audit',
    description: 'Comprehensive security review and implementation of best practices',
    status: 'on-hold',
    priority: 'medium',
    dueDate: '2025-12-01',
    team: ['Kevin Martinez', 'Laura Garcia'],
    progress: 25,
    tasks: [
      {
        id: 't13',
        title: 'Penetration testing',
        description: 'Conduct security penetration tests',
        status: 'todo',
        priority: 'high',
        assignee: 'Kevin Martinez',
        dueDate: '2025-11-28',
        tags: ['security', 'testing'],
      },
      {
        id: 't14',
        title: 'Review authentication system',
        description: 'Audit current auth implementation',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Laura Garcia',
        dueDate: '2025-11-25',
        tags: ['security', 'authentication'],
      },
    ],
  },
  {
    id: '6',
    name: 'Documentation Portal',
    description: 'Create comprehensive documentation portal for developers',
    status: 'active',
    priority: 'low',
    dueDate: '2025-12-20',
    team: ['Michael Chen', 'Nancy Kim'],
    progress: 33,
    tasks: [
      {
        id: 't15',
        title: 'API documentation',
        description: 'Document all API endpoints with examples',
        status: 'in-progress',
        priority: 'medium',
        assignee: 'Michael Chen',
        dueDate: '2025-12-10',
        tags: ['documentation', 'api'],
      },
      {
        id: 't16',
        title: 'Setup guides',
        description: 'Write step-by-step setup instructions',
        status: 'todo',
        priority: 'low',
        assignee: 'Nancy Kim',
        dueDate: '2025-12-15',
        tags: ['documentation', 'guides'],
      },
    ],
  },
];

export function useProjects() {
  const [projects] = useState<Project[]>(mockProjects);

  const getProjectById = (id: string): Project | undefined => {
    return projects.find((project) => project.id === id);
  };

  const filterProjects = (searchQuery: string): Project[] => {
    if (!searchQuery.trim()) {
      return projects;
    }

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.team.some((member) => member.toLowerCase().includes(query))
    );
  };

  return {
    projects,
    getProjectById,
    filterProjects,
  };
}
