#!/bin/bash

echo "🔧 Verificando Node.js..."
if ! command -v node &> /dev/null
then
    echo "⚠️ Node.js não está instalado. Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js já instalado."
fi

echo "📦 Instalando dependências do projeto..."
npm install

echo "📂 Criando atalho na área de trabalho..."
DESKTOP_PATH="/home/pi/Desktop"
echo "#!/bin/bash" > "$DESKTOP_PATH/HeliodonApp.sh"
echo "cd $(pwd)" >> "$DESKTOP_PATH/HeliodonApp.sh"
echo "bash start.sh" >> "$DESKTOP_PATH/HeliodonApp.sh"
chmod +x "$DESKTOP_PATH/HeliodonApp.sh"

echo "✅ Atalho criado na área de trabalho: HeliodonApp.sh"