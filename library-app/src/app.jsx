import AppRouter from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient();

function App() {
    return <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
}

export default App