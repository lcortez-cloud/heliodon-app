#!/bin/bash

echo "🚀 Iniciando servidor do Heliodon..."
xdg-open "http://localhost:3000" &  # Abre no navegador padrão
node server.js