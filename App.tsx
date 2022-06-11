import {QueryClient, QueryClientProvider} from 'react-query';
import Home from "./src/screens/home";

const queryClient = new QueryClient();
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Home/>
        </QueryClientProvider>
    );
}
