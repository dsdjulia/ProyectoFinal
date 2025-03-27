import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: process.env.VITE_HOST || "localhost", // Usa la variable o "localhost" por defecto
        port: process.env.VITE_PORT || 5173, // Usa el puerto de la variable o 5173
        strictPort: false, // Permite cambiar de puerto si está ocupado
        cors: {
            origin: process.env.VITE_CORS_ORIGIN || "http://localhost:8000", // Permite cambiar el origen de CORS
            credentials: true,
        },
    },
});
