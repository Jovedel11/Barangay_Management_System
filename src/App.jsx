import { RouterProvider } from "react-router-dom";
import "./core/styles/global.css";
import { router } from "./router";
import { AuthProvider } from "./auth/context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading Barangay Kaypian...</p>
            </div>
          </div>
        }
      />
    </AuthProvider>
  );
}

export default App;
