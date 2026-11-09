export interface EnigmaPluginItem {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  command: string;
  description?: string;
  isMagStalker?: boolean;
}

export const ENIGMA_PLUGINS: EnigmaPluginItem[] = [
  {
    "id": "multistalkerpro",
    "name": "MultiStalkerPro",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/emilnabil/multi-stalkerpro/main/installer.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "multistalker",
    "name": "multistalker",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/multistalker/installer.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "stalkerportalconverter-mag-to-e2",
    "name": "StalkerPortalConverter (MAG to E2)",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/StalkerPortalConverter/main/installer.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "estalker",
    "name": "Estalker",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/EStalker/EStalker.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "estalkerwebcontrol",
    "name": "EstalkerWebControl",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/EstalkerWebControl/estalkerwebcontrol.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "bouquetmakerxtream",
    "name": "BouquetMakerXtream",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate http://dreambox4u.com/emilnabil237/plugins/BouquetMakerXtream/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "jedimakerxtream",
    "name": "jedimakerxtream",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/jedimakerxtream/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "jediepgextream",
    "name": "JediEpgExtream",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/jediepgextream/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xtreamty",
    "name": "Xtreamty",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/xtreamity/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xcpluginforever",
    "name": "Xcpluginforever",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/Belfagor2005/xc_plugin_forever/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xklass-iptv",
    "name": "xklass-iptv",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/xklass/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "e2m3u2bouquet",
    "name": "E2m3u2Bouquet",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/e2m3u2bouquet/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "m3uconverter",
    "name": "m3uconverter",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/Archimede-M3UConverter/main/installer.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "multi-iptv-adder",
    "name": "Multi-Iptv-Adder",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/MultiIptvAdder/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "iptv-org-playlists",
    "name": "Iptv-Org-Playlists",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/iptv-org-playlists/iptv-org-playlists.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "iptvdream",
    "name": "iptvdream",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/main/iptvdream/iptvdream.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "iptvplayer",
    "name": "IptvPlayer",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://raw.githubusercontent.com/emil237/iptvplayer/main/iptvinstaller.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "vavoo-1.15",
    "name": "vavoo_1.15",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/vavoo/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "plutotv",
    "name": "Plutotv",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/main/plutotv/plutotv.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "rakutentv",
    "name": "Rakutentv",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/main/rakutentv/rakutentv.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "suptv",
    "name": "Suptv",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/emil237/suptv/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "iptosat",
    "name": "IptoSat",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/iptosat/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ipaudiopro",
    "name": "IpAudioPro",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/ipaudiopro/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ipaudio-7.4-py3",
    "name": "IpAudio_7.4_py3",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/ipaudio/ipaudio-7.4-ffmpeg.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ipaudio-6.7-py2",
    "name": "IpAudio_6.7_py2",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/ipaudio/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "youtube",
    "name": "YouTube",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/YouTube/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "quarter-pounder",
    "name": "Quarter pounder",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate http://dreambox4u.com/emilnabil237/script/quarterpounder.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "e2player-maxbamby",
    "name": "E2Player-MAXBAMBY",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://gitlab.com/maxbambi/e2iplayer/-/raw/master/install-e2iplayer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "e2player-zadmario",
    "name": "E2Player-ZADMARIO",
    "category": "iptv",
    "categoryName": "IPTV & MAG / Stalker",
    "command": "wget -q --no-check-certificate https://gitlab.com/zadmario/e2iplayer/-/raw/master/install-e2iplayer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ajpanel",
    "name": "Ajpanel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget -q \"--no-check-certificate\" http://dreambox4u.com/emilnabil237/plugins/ajpanel/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ajpanel-custom-menu-all-panels",
    "name": "AjPanel Custom Menu All Panels",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/ajpanel/emil-panel-all.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "panel-lite-by-emil-nabil",
    "name": "Panel Lite By Emil Nabil",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/ajpanel/new/emil-panel-lite.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "dreamosat-downloader",
    "name": "dreamosat-downloader",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/dreamosat-downloader/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "eliesatpanel",
    "name": "EliesatPanel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://raw.githubusercontent.com/eliesat/eliesatpanel/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "emilpanel",
    "name": "EmilPanel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/EmilPanel/emilpanel.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "epanel",
    "name": "Epanel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/epanel/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefp-panel",
    "name": "Ciefp-Panel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://github.com/ciefp/CiefpsettingsPanel/raw/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefp-panel-mod-emil-nabil",
    "name": "Ciefp-Panel mod Emil Nabil",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/Ciefp-Panel/Ciefp-Panel.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "linuxsat-panel",
    "name": "linuxsat-panel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/LinuxsatPanel/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "levi45-addonsmanager",
    "name": "levi45-AddonsManager",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/levi45-addonsmanager/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "levi45multicammanager",
    "name": "Levi45MulticamManager",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/levi45multicammanager/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "magicpanel-hamdy-ahmed",
    "name": "MagicPanel-HAMDY_AHMED",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://gitlab.com/h-ahmed/Panel/-/raw/main/MagicPanel_install.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "satvenuspanel",
    "name": "SatVenusPanel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/satvenuspanel/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "smartaddonspanel",
    "name": "SmartAddonspanel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/SmartAddonspanel/smart-Panel.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "tspanel",
    "name": "Tspanel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/tspanel/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "tvaddon-panel",
    "name": "TvAddon-Panel",
    "category": "panels",
    "categoryName": "Panels",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/tvaddon/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "oscam-mohamed-os",
    "name": "Oscam Mohamed_OS",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://dreambox4u.com/emilnabil237/emu/installer-oscam.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ncam-fairman",
    "name": "Ncam fairman",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://dreambox4u.com/emilnabil237/emu/installer-ncam.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "oscam-emu-biko-73",
    "name": "Oscam Emu biko-73",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/biko-73/OsCam_EMU/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "cccam",
    "name": "Cccam",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://dreambox4u.com/emilnabil237/emu/installer-cccam.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "easy-cccam",
    "name": "Easy-Cccam",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/emil237/plugins/refs/heads/main/easy-cccam/easy-cccam.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "freeservercccam",
    "name": "FreeServerCCcam",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://ia803104.us.archive.org/0/items/freecccamserver/installer.sh -qO - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "freecccamserver",
    "name": "FreeCCcamServer",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://ia803104.us.archive.org/0/items/freecccamserver/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "openatv-softcamfeed",
    "name": "OpenATV softcamfeed",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget -O - -q http://updates.mynonpublic.com/oea/feed | bash",
    "isMagStalker": false
  },
  {
    "id": "fix-softcam-openpli",
    "name": "Fix Softcam OpenPli",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/softcam-support-pli.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "multicamadder",
    "name": "MultiCamAdder",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/MultiCamAdder/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "mycam-plugin",
    "name": "MyCam-Plugin",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/mycam/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "keyadder",
    "name": "KeyAdder",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/fairbird/KeyAdder/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "auto-dcw-key-add",
    "name": "Auto-Dcw-Key-Add",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/auto-dcw-key-add/auto-dcw-key-add.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bissfeedautokey",
    "name": "BissFeedAutoKey",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/emilnabil/bissfeed-autokey/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "cccaminfo-py2",
    "name": "CCcaminfo-py2",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/cccaminfo/cccaminfo_py2.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "cccamininfo-py3",
    "name": "CCcamininfo-py3",
    "category": "softcams",
    "categoryName": "Softcams & Emulators",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/cccaminfo/cccaminfo_py3.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "elsafty-tv-radio-steaming",
    "name": "Elsafty-Tv-Radio-Steaming",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q \"--no-check-certificate\" https://dreambox4u.com/emilnabil237/settings/elsafty/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "khaled-ali-settings",
    "name": "Khaled Ali Settings",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget https://raw.githubusercontent.com/emilnabil/channel-khaled/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "mohamed-goda-settings",
    "name": "Mohamed Goda Settings",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget https://raw.githubusercontent.com/emilnabil/channel-mohamed-goda/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "emil-nabil-settings",
    "name": "Emil Nabil Settings",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget https://raw.githubusercontent.com/emilnabil/channel-emil-nabil/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "tarek-ashry-settings",
    "name": "Tarek Ashry Settings",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget https://raw.githubusercontent.com/emilnabil/channel-tarek-ashry/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpsettingsdownloader",
    "name": "CiefpSettingsDownloader",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsDownloader/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpsettingsmotor",
    "name": "CiefpsettingsMotor",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget https://raw.githubusercontent.com/ciefp/CiefpsettingsMotor/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpbouquetupdater",
    "name": "CiefpBouquetUpdater",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpBouquetUpdater/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpchannelmanager",
    "name": "CiefpChannelManager",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpChannelManager/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpiptvbouquets",
    "name": "CiefpIPTVBouquets",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpIPTVBouquets/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpsettingsstreamrelay-py3",
    "name": "CiefpSettingsStreamrelay PY3",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsStreamrelay/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpsettingsstreamrelay-py2",
    "name": "CiefpSettingsStreamrelay PY2",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsStreamrelayPY2/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpsettingst2miabertis",
    "name": "CiefpSettingsT2miAbertis",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsT2miAbertis/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpsettingst2miabertisopenpli",
    "name": "CiefpSettingsT2miAbertisOpenPLi",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsT2miAbertisOpenPLi/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpwhiteliststreamrelay",
    "name": "CiefpWhitelistStreamrelay",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpWhitelistStreamrelay/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpsatellitesxmleditor",
    "name": "CiefpSatellitesXmlEditor",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSatelliteXmlEditor/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpselectsatellite",
    "name": "CiefpSelectSatellite",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSelectSatellite/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpsatelliteanalyzer",
    "name": "CiefpSatelliteAnalyzer",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSatelliteAnalyzer/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "levi45-settings",
    "name": "levi45-settings",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/levi45-settings/levi45-settings.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "tvsettings",
    "name": "TvSettings",
    "category": "channels",
    "categoryName": "Channels & Settings",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/tvSettings/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "footonsat",
    "name": "Footonsat",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/FootOnsat/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "epgimport",
    "name": "EPGImport",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/epgimport.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "epgimport-99",
    "name": "EPGImport-99",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/EPGImport-99/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "epg-grabber",
    "name": "Epg Grabber",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/Epg-Grabber/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "epgtranslator",
    "name": "EPGTranslator",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/epgtranslator.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "subssupport-by-m.nasr",
    "name": "SubsSupport_by-m.nasr",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://github.com/popking159/ssupport/raw/main/subssupport-install.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "subssupport-2.1",
    "name": "SubsSupport_2.1",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/SubsSupport/subssupport_2.1.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "subssupport-1.5.8-r9",
    "name": "SubsSupport_1.5.8-r9",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/SubsSupport/installer1.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "quran-karem-v2.2",
    "name": "Quran-karem_v2.2",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emil237/quran/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "quran-karem",
    "name": "Quran-karem",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/quran/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "azkar-almuslim",
    "name": "Azkar Almuslim",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/azkar-almuslim/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "athan-times",
    "name": "Athan Times",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/athantimes/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "tmbd",
    "name": "TMBD",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/biko-73/TMBD/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "tmdb",
    "name": "Tmdb",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/tmdb.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefptmdbsearch",
    "name": "CiefpTMDBSearch",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTMDBSearch/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpmojtvepg",
    "name": "CiefpMojTvEPG",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpMojTvEPG/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpepgshare",
    "name": "CiefpEPGshare",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpEPGshare/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefptvprogram",
    "name": "CiefpTvProgram",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvProgram/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefptvprograma1hr",
    "name": "CiefpTvProgramA1HR",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvProgramA1HR/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefptvprogramsbb",
    "name": "CiefpTvProgramSBB",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvProgramSBB/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefptvprogramsk",
    "name": "CiefpTvProgramSK",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvProgramSK/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefptvtodayde",
    "name": "CiefpTvTodayDE",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvTodayDE/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bitrate",
    "name": "Bitrate",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/bitrate/bitrate.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bitrate-mod-ariad",
    "name": "Bitrate-mod-ariad",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/bitrate/bitrate-mod-ariad.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "evgquicksignal",
    "name": "EvgQuickSignal",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/biko-73/EvgQuickSignal/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "raedquicksignal",
    "name": "RaedQuickSignal",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/RaedQuickSignal/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "internet-speedtest",
    "name": "Internet-Speedtest",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/internet-speedtest.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ip-checker",
    "name": "IP_Checker",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emil237/plugins/refs/heads/main/IP_Checker.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xtraevent-6.820-all-python",
    "name": "xtraevent_6.820_All-Python",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/xtraevent/xtraevent-6.820.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xtraevent-6.805",
    "name": "xtraevent_6.805",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/xtraevent/xtraevent-6.805.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xtraevent-6.798",
    "name": "xtraevent_6.798",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/xtraevent/xtraevent_6.798.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xtraevent-4.6",
    "name": "Xtraevent_4.6",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://github.com/emil237/download-plugins/raw/main/Xtraevent-v4.6.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xtraevent-4.5",
    "name": "xtraevent_4.5",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/xtraEvent_4.5.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xtraevent-4.2",
    "name": "xtraevent_4.2",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/xtraEvent_4.2.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xtraevent-3.3",
    "name": "xtraevent_3.3",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/xtraevent_3.3.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "advanced-screen-shot",
    "name": "Advanced-Screen-Shot",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/advancedscreenshot/advancedscreenshot.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "screen-recorder",
    "name": "Screen-Recorder",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/screenrecorder/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpscreengrab",
    "name": "CiefpScreenGrab",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpScreenGrab/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "moviesmanager",
    "name": "MoviesManager",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget http://dreambox4u.com/emilnabil237/plugins/Transmission/MoviesManager.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "filmxy",
    "name": "Filmxy",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/filmxy/filmxy.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "orangeaudioplugin",
    "name": "OrangeAudioPlugin",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/popking159/OrangeAudio/refs/heads/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "radiogit",
    "name": "RadioGit",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/radiogit/radiogit.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "radiom",
    "name": "Radiom",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/main/radiom/radiom.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "radio-80-s",
    "name": "Radio-80-s",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/Radio-80-s/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "webcame2prenjsf",
    "name": "WebCamE2PrenjSF",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/WebCamE2PrenjSF/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "worldcam",
    "name": "WorldCam",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/WorldCam/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "arabicsavior",
    "name": "ArabicSavior",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget http://dreambox4u.com/emilnabil237/plugins/ArabicSavior/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "horoscope",
    "name": "horoscope",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/horoscope/refs/heads/main/horoscope.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "holidaycountdown",
    "name": "HolidayCountdown",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/HolidayCountdown/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "newvirtualkeyboard",
    "name": "NewVirtualkeyBoard",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/NewVirtualKeyBoard/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "cfg-zoom-final",
    "name": "CFG_ZOOM_FINAL",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/cfg_Zoom_Final_FIX7x/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "simple-zoom-panel",
    "name": "Simple-Zoom-Panel",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/simple-zoom-panel/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "zoom-1.1.2-py3",
    "name": "Zoom_1.1.2-Py3",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/zoom/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "cacheflush",
    "name": "CacheFlush",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/cacheflush/cacheflush.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "crondmanager",
    "name": "CrondManager",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/crondmanager/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "scriptexecuter",
    "name": "scriptexecuter",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget http://dreambox4u.com/emilnabil237/plugins/scriptexecuter/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "showclock",
    "name": "showclock",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/showclock/showclock.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "sherlockmod",
    "name": "Sherlockmod",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emil237/sherlockmod/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "screennames",
    "name": "ScreenNames",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/screennames/screennames.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "uninstaller-plugins",
    "name": "uninstaller-Plugins",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget http://dreambox4u.com/emilnabil237/plugins/unstaller-plugins/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "pluginmover",
    "name": "pluginmover",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget http://dreambox4u.com/emilnabil237/plugins/pluginmover/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "pluginskinmover",
    "name": "pluginskinmover",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget http://dreambox4u.com/emilnabil237/plugins/pluginskinmover/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "zip2pkg-converter",
    "name": "Zip2Pkg-Converter",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/Zip2Pkg/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "historyzapselector",
    "name": "HistoryZapSelector",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/historyzap/installer1.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "alajre",
    "name": "Alajre",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/alajre/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ansite",
    "name": "Ansite",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emil237/ansite/refs/heads/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "apod",
    "name": "Apod",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/apod/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "apsattv",
    "name": "Apsattv",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/Apsattv/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "astronomy",
    "name": "Astronomy",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/astronomy/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "atilehd",
    "name": "Atilehd",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/atilehd/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "automatic-fullbackup",
    "name": "automatic-fullbackup",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/automatic-fullbackup/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "acherone",
    "name": "Acherone",
    "category": "plugins",
    "categoryName": "Plugins & Addons",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/acherone/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bo-hlala-fhd-skin",
    "name": "BO-HLALA FHD SKIN",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/biko-73/TeamNitro/main/script/installerB.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "aglare-fhd-for-atv-spa-egami",
    "name": "Aglare-FHD for Atv-Spa-Egami",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/popking159/skins/refs/heads/main/aglareatv/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "aglare-fhd-for-pli-obh-vix",
    "name": "Aglare-FHD for Pli-OBH-Vix",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/popking159/skins/refs/heads/main/aglarepli/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "red-dragon-fhd",
    "name": "Red-Dragon-FHD",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/biko-73/TeamNitro/main/script/installerD.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "nitro-advancefhd",
    "name": "Nitro AdvanceFHD",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/biko-73/NitroAdvanceFHD/main/installer.sh -qO - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "desert-skin",
    "name": "Desert skin",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/biko-73/TeamNitro/main/script/installerDs.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "xdreamy-fhd",
    "name": "XDreamy-FHD",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/Insprion80/Skins/main/xDreamy/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ozeta-skins-setup",
    "name": "Ozeta-Skins-Setup",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/emil237/skins-enigma2/main/PLUGIN_Skin-ozeta.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "chlogochanger",
    "name": "CHLogoChanger",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/CHLogoChanger/ChLogoChanger.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "crashlogoviewer",
    "name": "CrashLogoViewer",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/crashlogviewer/install-CrashLogViewer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "piconsrename",
    "name": "PiconsRename",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/PiconsRename/PiconsRename.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "setpicon",
    "name": "SetPicon",
    "category": "skins",
    "categoryName": "Skins & Displays",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/setpicon/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "update-enigma2-all-python",
    "name": "UPDATE ENIGMA2 ALL PYTHON",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget https://raw.githubusercontent.com/emil237/updates-enigma/main/update-all-python.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "update-opkg-update",
    "name": "update (opkg update)",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg update",
    "isMagStalker": false
  },
  {
    "id": "wget",
    "name": "Wget",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg install wget",
    "isMagStalker": false
  },
  {
    "id": "curl",
    "name": "Curl",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg install curl",
    "isMagStalker": false
  },
  {
    "id": "fix-ipk-package-installation",
    "name": "FIX-ipk-Package-Installation",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget https://dreambox4u.com/emilnabil237/script/fix-ipk-package-installation.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "repair-inodes-from-hdd",
    "name": "Repair-Inodes-From-Hdd",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget https://raw.githubusercontent.com/emil237/scripts/refs/heads/main/repair-hdd.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "update-openatv-develop-feed",
    "name": "Update OpenATV Develop feed",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget -O - -q https://feeds2.mynonpublic.com/devel-feed | bash",
    "isMagStalker": false
  },
  {
    "id": "super-script",
    "name": "Super Script",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget https://dreambox4u.com/emilnabil237/script/Super_Script.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "servicescanupdates-1.2",
    "name": "servicescanupdates_1.2",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/servicescanupdates/servicescanupdates.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "astra-sm",
    "name": "astra-sm",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg install astra-sm",
    "isMagStalker": false
  },
  {
    "id": "gstplayer",
    "name": "gstplayer",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg install gstplayer",
    "isMagStalker": false
  },
  {
    "id": "streamlinksrv",
    "name": "Streamlinksrv",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg install streamlinksrv",
    "isMagStalker": false
  },
  {
    "id": "dabstreamer",
    "name": "dabstreamer",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg install dabstreamer",
    "isMagStalker": false
  },
  {
    "id": "eti-tools",
    "name": "eti_tools",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg install eti-tools",
    "isMagStalker": false
  },
  {
    "id": "dvbsnoop",
    "name": "dvbsnoop",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "opkg install dvbsnoop",
    "isMagStalker": false
  },
  {
    "id": "hardwareinfo",
    "name": "hardwareinfo",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/hardwareinfo/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "oneupdater",
    "name": "ONEupdater",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget https://raw.githubusercontent.com/Sat-Club/ONEupdaterE2/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpe2converter",
    "name": "CiefpE2Converter",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpE2Converter/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefpopendirectories",
    "name": "CiefpOpenDirectories",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpOpenDirectories/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "ciefposcameditor",
    "name": "CiefpOscamEditor",
    "category": "tools",
    "categoryName": "System Tools",
    "command": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpOscamEditor/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "egamiboot-10.6",
    "name": "EgamiBoot_10.6",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://raw.githubusercontent.com/emil237/egamiboot/refs/heads/main/egamiboot-10.6.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "egamiboot-10.5",
    "name": "EgamiBoot_10.5",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget -q \"--no-check-certificate\" https://raw.githubusercontent.com/emil237/egamiboot/refs/heads/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "neoboot-9.65",
    "name": "Neoboot_9.65",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/neoboot-v9.65/iNB.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "neoboot-9.65-mod-by-elsafty",
    "name": "Neoboot_9.65_Mod-By-ElSafty",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://raw.githubusercontent.com/emil237/neoboot_v9.65/main/iNB_9.65_mod-elsafty.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "neoboot-9.60",
    "name": "Neoboot_9.60",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/neoboot-v9.60/iNB.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "neoboot-9.58",
    "name": "Neoboot_9.58",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://dreambox4u.com/emilnabil237/plugins/neoboot-v9.58/iNB.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "neoboot-9.54",
    "name": "Neoboot_9.54",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://raw.githubusercontent.com/emil237/neoboot_9.54/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "openmultiboot-1.3",
    "name": "OpenMultiboot_1.3",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://raw.githubusercontent.com/emil237/openmultiboot/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "openmultiboot-e2turk",
    "name": "OpenMultiboot-E2turk",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://raw.githubusercontent.com/e2TURK/omb-enhanced/main/install.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "multiboot-flashonline",
    "name": "Multiboot-FlashOnline",
    "category": "multiboot",
    "categoryName": "Multiboot",
    "command": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/multiboot-flashonline.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-atv",
    "name": "BootlogoSwapper Atv",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-Atv.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-ramadan",
    "name": "BootlogoSwapper-Ramadan",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootlogo-swapper-ramadan.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-openpli",
    "name": "BootlogoSwapper-OpenPli",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-pli.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-openbh",
    "name": "bootlogoSwapper-OpenBH",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-OpenBH.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-egami",
    "name": "BootlogoSwapper_Egami",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootLogoswapper-Egami.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-openvix",
    "name": "BootlogoSwapper_OpenVix",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-OpenVix.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-pure2",
    "name": "BootlogoSwapper_PURE2",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootLogoswapper-Pure2.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-kids",
    "name": "BootlogoSwapper_Kids",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-kids.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "bootlogoswapper-christmas",
    "name": "BootlogoSwapper-christmas",
    "category": "bootlogos",
    "categoryName": "Bootlogos",
    "command": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-christmas.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "image-openatv-7.5.1",
    "name": "Image-Openatv-7.5.1",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.5.1.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openatv-7.5",
    "name": "Image-Openatv-7.5",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.5.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openatv-7.4",
    "name": "Image-Openatv-7.4",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.4.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openatv-7.3",
    "name": "Image_Openatv-7.3",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.3.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openatv-7.2",
    "name": "Image_Openatv-7.2",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.2.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openatv-7.1",
    "name": "Image_Openatv-7.1",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.1.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openatv-7.0",
    "name": "Image-Openatv-7.0",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.0.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openatv-6.4",
    "name": "Image-Openatv-6.4",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openatv-6.4.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openpli-9.1",
    "name": "Image_Openpli-9.1",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openpli-9.1.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openpli-9.0",
    "name": "Image_Openpli-9.0",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openpli-9.0.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openpli-9.0-time-shift",
    "name": "Image_OpenPli-9.0-Time-Shift",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openpli-9.0-py3-TimeShift.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openpli-8.3",
    "name": "Image_Openpli-8.3",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openpli-8.3.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openpli-8.3-time-shift",
    "name": "Image_OpenPli-8.3-Time-Shift",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openpli-8.3-py2-TimeShift.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openpli-7.3",
    "name": "Image_Openpli-7.3",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openpli-7.3.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openpli-develop",
    "name": "Image_OpenPli develop",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openpli-develop.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-egami-10.4",
    "name": "Image-Egami-10.4",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/egami-10.4.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-pure2-7.4",
    "name": "Image_Pure2-7.4",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/pure2-7.4.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openspa-8.4.xxx",
    "name": "Image_openspa-8.4.xxx",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openspa-8.4.xxx.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openvix-6.6.004",
    "name": "Image_Openvix-6.6.004",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openvix-6.6.004.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openblackhole-5.4",
    "name": "Image_OpenBlackHole-5.4",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.4.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openblackhole-5.3",
    "name": "Image_OpenBlackHole-5.3",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.3.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openblackhole-5.2",
    "name": "Image_OpenBlackHole-5.2",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.2.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openblackhole-5.1",
    "name": "Image_OpenBlackHole-5.1",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.1.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openblackhole-5.0",
    "name": "Image_OpenBlackHole-5.0",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.0.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openblackhole-4.4",
    "name": "Image_OpenBlackHole-4.4",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-4.4-for-vuplus-only.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-blackhole-3.1.0",
    "name": "Image BlackHole-3.1.0",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/BlackHole-3.1.0.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-opendroid-7.3",
    "name": "Image_OpenDroid-7.3",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/opendroid-7.3.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-opendroid-7.1",
    "name": "Image_OpenDroid-7.1",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/opendroid-7.1.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-openvision-py2-10.3-r395",
    "name": "Image_OpenVision-py2-10.3-r395",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/openvision/OpenVision-py2-10.3-r395.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "image-vti-15.0.02",
    "name": "Image_VTI-15.0.02",
    "category": "images",
    "categoryName": "Images",
    "command": "wget https://dreambox4u.com/emilnabil237/images/vti-15.0.02.sh -O - | /bin/sh",
    "isMagStalker": true
  },
  {
    "id": "picons-nilesat-7w-8w",
    "name": "Picons Nilesat_7W+8W",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/nilesat/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-hotbird-13.0e",
    "name": "Picons hotbird_13.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/hotbird_13.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-astra-19.2e",
    "name": "Picons astra_19.2e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/astra_19.2e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-badr-26.0e",
    "name": "Picons badr_26.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/badr_26.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-arabsat-30.5e",
    "name": "Picons arabsat_30.5e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/arabsat_30.5e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-eshail-25.5e",
    "name": "Picons eshail_25.5e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/eshail_25.5e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-amos-4.0w",
    "name": "Picons Amos_4.0W",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/amos_4.0w/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-eutelsat-5.0w",
    "name": "Picons eutelsat_5.0w",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_5.0w/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-eutelsat-7.0e",
    "name": "Picons eutelsat_7.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_7.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-eutelsat-9.0e",
    "name": "Picons eutelsat_9.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_9.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-eutelsat-10.0e",
    "name": "Picons eutelsat_10.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_10.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-eutelsat-16.0e",
    "name": "Picons eutelsat_16.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_16.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-astra-23.5e",
    "name": "Picons astra_23.5e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/astra_23.5e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-astra-28.2e",
    "name": "Picons astra_28.2e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/astra_28.2e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-astra-31.5e",
    "name": "Picons astra_31.5e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/astra_31.5e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-eutelsat-36.0e",
    "name": "Picons eutelsat_36.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_36.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-hellas-sat-39.0e",
    "name": "Picons hellas-sat_39.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/hellas-sat_39.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-turksat-42.0e",
    "name": "Picons turksat_42.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/turksat_42.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-azerspace-46.0e",
    "name": "Picons azerspace_46.0e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/azerspace_46.0e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-hispasat-30.0w",
    "name": "Picons hispasat_30.0w",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/hispasat_30.0w/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-thor-0.8w",
    "name": "Picons thor_0.8w",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/thor_0.8w/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "picons-bulgariasat-1.9e",
    "name": "Picons bulgariasat_1.9e",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://dreambox4u.com/emilnabil237/picons/bulgariasat_1.9e/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "chocholousek-picons",
    "name": "chocholousek-picons",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/chocholousek-picons.sh -O - | /bin/sh",
    "isMagStalker": false
  },
  {
    "id": "mmpicons",
    "name": "MmPicons",
    "category": "picons",
    "categoryName": "Picons & Logos",
    "command": "wget https://raw.githubusercontent.com/Belfagor2005/mmPicons/main/installer.sh -O - | /bin/sh",
    "isMagStalker": false
  }
];
