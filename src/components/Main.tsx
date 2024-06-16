import { store } from "@/lib/redux/store.ts"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import "../styles/globals.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "./ThemeProvider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
