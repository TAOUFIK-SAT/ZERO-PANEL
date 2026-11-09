#!/bin/sh
# ==============================================================================
# DreamSat Pro Panel Installer for Enigma2 (Python 3 & Python 2)
# Supported Images: OpenATV, OpenPLi, Egami, BlackHole, OpenBH, PurE2, VTi
# ==============================================================================
echo ""
echo "#################################################################"
echo "#               DreamSat Pro Panel v4.0 Installer               #"
echo "#                   Python 3 & Python 2 Ready                   #"
echo "#################################################################"
echo ""

PLUGIN_PATH="/usr/lib/enigma2/python/Plugins/Extensions/DreamSatPanel"

echo "[*] Checking Enigma2 Python version..."
python -c "import sys; print('Python version: ' + sys.version)" 2>/dev/null || python3 -c "import sys; print('Python version: ' + sys.version)"

echo "[*] Creating plugin directory: "
mkdir -p 

echo "[*] Downloading plugin components..."
# Try curl or wget
if command -v curl >/dev/null 2>&1; then
    curl -k -s -L "https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/DreamSatPanel/plugin.py" -o "/plugin.py"
else
    wget -q --no-check-certificate "https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/DreamSatPanel/plugin.py" -O "/plugin.py"
fi

# Set permissions
chmod 755 /plugin.py 2>/dev/null
chmod -R 755  2>/dev/null

# Clean old pyc
rm -f /*.pyc 2>/dev/null
rm -rf /__pycache__ 2>/dev/null

echo "[*] Checking plugin syntax on receiver..."
python3 -m py_compile /plugin.py 2>/dev/null || python -m py_compile /plugin.py 2>/dev/null

echo ""
echo "#################################################################"
echo "#            DreamSat Pro Panel Installed Successfully!         #"
echo "#              Restarting Enigma2 GUI in 3 seconds...           #"
echo "#################################################################"
echo ""
sleep 3
init 4 && sleep 2 && init 3 || killall -9 enigma2
exit 0
