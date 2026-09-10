import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Browse from '@/pages/browse';
import Advisor from '@/pages/advisor';
import ToolDetail from '@/pages/tool-detail';
import Workspace from '@/pages/workspace';
import Compare from '@/pages/compare';
import Saved from '@/pages/saved';
import Prompts from '@/pages/prompts';
import Guides from '@/pages/guides';
import { AppShell } from '@/components/app-shell';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <AppShell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/browse" component={Browse} />
          <Route path="/advisor" component={Advisor} />
          <Route path="/tools/:id" component={ToolDetail} />
          <Route path="/stack" component={Workspace} />
          <Route path="/compare" component={Compare} />
          <Route path="/saved" component={Saved} />
          <Route path="/prompts" component={Prompts} />
          <Route path="/guides" component={Guides} />
          <Route component={NotFound} />
        </Switch>
      </AppShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
