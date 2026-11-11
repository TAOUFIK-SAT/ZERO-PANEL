# -*- coding: utf-8 -*-
# ==============================================================================
# ZERO-SAT Pro Panel - Enigma2 Professional Multi-Category Addon Manager
# Version: 4.0 Pro Edition
# Compatible with: Python 2.7, Python 3.9, 3.10, 3.11, 3.12 (All E2 Images)
# OpenATV, OpenPLi, Egami, BlackHole, OpenBH, PurE2, VTi, TeamBlue
# ==============================================================================

import os
import sys
import socket
import time

PLUGIN_VERSION = "v4.0 - Pro Ultimate Edition"

# Safe Enigma2 GUI Imports Guard
try:
    from Plugins.Plugin import PluginDescriptor
    from Screens.Screen import Screen
    from Screens.MessageBox import MessageBox
    from Components.ActionMap import ActionMap
    from Components.Label import Label
    from Components.MenuList import MenuList
    from Components.Button import Button
    from Components.Pixmap import Pixmap
    from Components.ScrollLabel import ScrollLabel
    from enigma import eConsoleAppContainer, eTimer, getDesktop
    IS_ENIGMA2_ENV = True
except ImportError:
    IS_ENIGMA2_ENV = False

if not IS_ENIGMA2_ENV:
    # Dummy Screen class for CLI or standalone testing without crash
    class Screen(object):
        def __init__(self, *args, **kwargs):
            pass
    class ActionMap(object):
        def __init__(self, *args, **kwargs):
            pass
    class Label(object):
        def __init__(self, *args, **kwargs):
            pass
        def setText(self, *args):
            pass
    class MenuList(object):
        def __init__(self, *args, **kwargs):
            pass
    class Button(object):
        def __init__(self, *args, **kwargs):
            pass
    class Pixmap(object):
        def __init__(self, *args, **kwargs):
            pass
    class ScrollLabel(object):
        def __init__(self, *args, **kwargs):
            pass
        def setText(self, *args):
            pass
        def pageUp(self):
            pass
        def pageDown(self):
            pass
        def lastPage(self):
            pass
    class eConsoleAppContainer(object):
        def __init__(self):
            self.dataAvail = []
            self.appClosed = []
        def execute(self, cmd):
            pass
        def kill(self):
            pass
    class eTimer(object):
        def __init__(self):
            class _T:
                def append(self, cb):
                    pass
            self.timeout = type('T', (), {'get': lambda: _T()})()
        def start(self, ms):
            pass
    def PluginDescriptor(*args, **kwargs):
        return None
CATEGORIES = [
    ("IPTV & MAG / Stalker", "بث تلفزيوني، بوابات Stalker وسيرفرات IPTV"),
    ("Panels", "لوحات التحكم والبانلات الشاملة"),
    ("Softcams & Emulators", "محاكيات السيرفرات ومفاتيح التشفير"),
    ("Channels & Settings", "ملفات القنوات والمفضلات والأقمار"),
    ("Plugins & Addons", "إضافات ومساعدات وترجمة وقرآن"),
    ("Skins & Displays", "سكينات FHD وثيمات شاشات العرض"),
    ("System Tools", "أدوات النظام، الفيد وتحديثات Python"),
    ("Picons & Logos", "شعارات القنوات لجميع مدارات الأقمار"),
    ("Multiboot", "برامج الإقلاع المتعدد وتثبيت الصور"),
    ("Bootlogos", "شاشات إقلاع الجهاز ومناسبات رمضان والأعياد"),
    ("Images", "روابط تحميل وتثبيت صور الفلاش الخام"),
    ("Local Tools & /tmp Installer", "تثبيت حزم IPK و Tar.gz المحلية وأدوات صيانة النظام"),
]

PLUGINS_BY_CATEGORY = {
    "IPTV & MAG / Stalker": {
        "MultiStalkerPro": "wget -q --no-check-certificate https://raw.githubusercontent.com/emilnabil/multi-stalkerpro/main/installer.sh -O - | /bin/sh",
        "multistalker": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/multistalker/installer.sh -O - | /bin/sh",
        "StalkerPortalConverter (MAG to E2)": "wget https://raw.githubusercontent.com/Belfagor2005/StalkerPortalConverter/main/installer.sh -O - | /bin/sh",
        "Estalker": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/EStalker/EStalker.sh -O - | /bin/sh",
        "EstalkerWebControl": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/EstalkerWebControl/estalkerwebcontrol.sh -O - | /bin/sh",
        "BouquetMakerXtream": "wget -q --no-check-certificate http://dreambox4u.com/emilnabil237/plugins/BouquetMakerXtream/installer.sh -O - | /bin/sh",
        "jedimakerxtream": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/jedimakerxtream/installer.sh -O - | /bin/sh",
        "JediEpgExtream": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/jediepgextream/installer.sh -O - | /bin/sh",
        "Xtreamty": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/xtreamity/installer.sh -O - | /bin/sh",
        "Xcpluginforever": "wget -q --no-check-certificate https://raw.githubusercontent.com/Belfagor2005/xc_plugin_forever/main/installer.sh -O - | /bin/sh",
        "xklass-iptv": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/xklass/installer.sh -O - | /bin/sh",
        "E2m3u2Bouquet": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/e2m3u2bouquet/installer.sh -O - | /bin/sh",
        "m3uconverter": "wget https://raw.githubusercontent.com/Belfagor2005/Archimede-M3UConverter/main/installer.sh -O - | /bin/sh",
        "Multi-Iptv-Adder": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/MultiIptvAdder/installer.sh -O - | /bin/sh",
        "Iptv-Org-Playlists": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/iptv-org-playlists/iptv-org-playlists.sh -O - | /bin/sh",
        "iptvdream": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/main/iptvdream/iptvdream.sh -O - | /bin/sh",
        "IptvPlayer": "wget https://raw.githubusercontent.com/emil237/iptvplayer/main/iptvinstaller.sh -O - | /bin/sh",
        "vavoo_1.15": "wget https://dreambox4u.com/emilnabil237/plugins/vavoo/installer.sh -O - | /bin/sh",
        "Plutotv": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/main/plutotv/plutotv.sh -O - | /bin/sh",
        "Rakutentv": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/main/rakutentv/rakutentv.sh -O - | /bin/sh",
        "Suptv": "wget -q --no-check-certificate https://raw.githubusercontent.com/emil237/suptv/main/installer.sh -O - | /bin/sh",
        "IptoSat": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/iptosat/installer.sh -O - | /bin/sh",
        "IpAudioPro": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/ipaudiopro/installer.sh -O - | /bin/sh",
        "IpAudio_7.4_py3": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/ipaudio/ipaudio-7.4-ffmpeg.sh -O - | /bin/sh",
        "IpAudio_6.7_py2": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/ipaudio/installer.sh -O - | /bin/sh",
        "YouTube": "wget -q --no-check-certificate https://dreambox4u.com/emilnabil237/plugins/YouTube/installer.sh -O - | /bin/sh",
        "Quarter pounder": "wget -q --no-check-certificate http://dreambox4u.com/emilnabil237/script/quarterpounder.sh -O - | /bin/sh",
        "E2Player-MAXBAMBY": "wget -q --no-check-certificate https://gitlab.com/maxbambi/e2iplayer/-/raw/master/install-e2iplayer.sh -O - | /bin/sh",
        "E2Player-ZADMARIO": "wget -q --no-check-certificate https://gitlab.com/zadmario/e2iplayer/-/raw/master/install-e2iplayer.sh -O - | /bin/sh",
    },
    "Panels": {
        "Ajpanel": 'wget -q "--no-check-certificate" http://dreambox4u.com/emilnabil237/plugins/ajpanel/installer.sh -O - | /bin/sh',
        "AjPanel Custom Menu All Panels": "wget https://dreambox4u.com/emilnabil237/plugins/ajpanel/emil-panel-all.sh -O - | /bin/sh",
        "Panel Lite By Emil Nabil": "wget https://dreambox4u.com/emilnabil237/plugins/ajpanel/new/emil-panel-lite.sh -O - | /bin/sh",
        "dreamosat-downloader": "wget https://dreambox4u.com/emilnabil237/plugins/dreamosat-downloader/installer.sh -O - | /bin/sh",
        "EliesatPanel": "wget https://raw.githubusercontent.com/eliesat/eliesatpanel/main/installer.sh -O - | /bin/sh",
        "EmilPanel": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/EmilPanel/emilpanel.sh -O - | /bin/sh",
        "Epanel": "wget https://dreambox4u.com/emilnabil237/plugins/epanel/installer.sh -O - | /bin/sh",
        "Ciefp-Panel": "wget https://github.com/ciefp/CiefpsettingsPanel/raw/main/installer.sh -O - | /bin/sh",
        "Ciefp-Panel mod Emil Nabil": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/Ciefp-Panel/Ciefp-Panel.sh -O - | /bin/sh",
        "linuxsat-panel": "wget https://raw.githubusercontent.com/Belfagor2005/LinuxsatPanel/main/installer.sh -O - | /bin/sh",
        "levi45-AddonsManager": "wget https://dreambox4u.com/emilnabil237/plugins/levi45-addonsmanager/installer.sh -O - | /bin/sh",
        "Levi45MulticamManager": "wget https://dreambox4u.com/emilnabil237/plugins/levi45multicammanager/installer.sh -O - | /bin/sh",
        "MagicPanel-HAMDY_AHMED": "wget https://gitlab.com/h-ahmed/Panel/-/raw/main/MagicPanel_install.sh -O - | /bin/sh",
        "SatVenusPanel": "wget https://dreambox4u.com/emilnabil237/plugins/satvenuspanel/installer.sh -O - | /bin/sh",
        "SmartAddonspanel": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/SmartAddonspanel/smart-Panel.sh -O - | /bin/sh",
        "Tspanel": "wget https://dreambox4u.com/emilnabil237/plugins/tspanel/installer.sh -O - | /bin/sh",
        "TvAddon-Panel": "wget https://dreambox4u.com/emilnabil237/plugins/tvaddon/installer.sh -O - | /bin/sh",
    },
    "Softcams & Emulators": {
        "Oscam Mohamed_OS": "wget https://dreambox4u.com/emilnabil237/emu/installer-oscam.sh -O - | /bin/sh",
        "Ncam fairman": "wget https://dreambox4u.com/emilnabil237/emu/installer-ncam.sh -O - | /bin/sh",
        "Oscam Emu biko-73": "wget https://raw.githubusercontent.com/biko-73/OsCam_EMU/main/installer.sh -O - | /bin/sh",
        "Cccam": "wget https://dreambox4u.com/emilnabil237/emu/installer-cccam.sh -O - | /bin/sh",
        "Easy-Cccam": "wget https://raw.githubusercontent.com/emil237/plugins/refs/heads/main/easy-cccam/easy-cccam.sh -O - | /bin/sh",
        "FreeServerCCcam": "wget https://ia803104.us.archive.org/0/items/freecccamserver/installer.sh -qO - | /bin/sh",
        "FreeCCcamServer": "wget https://ia803104.us.archive.org/0/items/freecccamserver/installer.sh -O - | /bin/sh",
        "OpenATV softcamfeed": "wget -O - -q http://updates.mynonpublic.com/oea/feed | bash",
        "Fix Softcam OpenPli": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/softcam-support-pli.sh -O - | /bin/sh",
        "MultiCamAdder": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/MultiCamAdder/installer.sh -O - | /bin/sh",
        "MyCam-Plugin": "wget https://dreambox4u.com/emilnabil237/plugins/mycam/installer.sh -O - | /bin/sh",
        "KeyAdder": "wget https://raw.githubusercontent.com/fairbird/KeyAdder/main/installer.sh -O - | /bin/sh",
        "Auto-Dcw-Key-Add": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/auto-dcw-key-add/auto-dcw-key-add.sh -O - | /bin/sh",
        "BissFeedAutoKey": "wget https://raw.githubusercontent.com/emilnabil/bissfeed-autokey/main/installer.sh -O - | /bin/sh",
        "CCcaminfo-py2": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/cccaminfo/cccaminfo_py2.sh -O - | /bin/sh",
        "CCcamininfo-py3": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/cccaminfo/cccaminfo_py3.sh -O - | /bin/sh",
    },
    "Channels & Settings": {
        "Elsafty-Tv-Radio-Steaming": 'wget -q "--no-check-certificate" https://dreambox4u.com/emilnabil237/settings/elsafty/installer.sh -O - | /bin/sh',
        "Khaled Ali Settings": "wget https://raw.githubusercontent.com/emilnabil/channel-khaled/main/installer.sh -O - | /bin/sh",
        "Mohamed Goda Settings": "wget https://raw.githubusercontent.com/emilnabil/channel-mohamed-goda/main/installer.sh -O - | /bin/sh",
        "Emil Nabil Settings": "wget https://raw.githubusercontent.com/emilnabil/channel-emil-nabil/main/installer.sh -O - | /bin/sh",
        "Tarek Ashry Settings": "wget https://raw.githubusercontent.com/emilnabil/channel-tarek-ashry/main/installer.sh -O - | /bin/sh",
        "CiefpSettingsDownloader": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsDownloader/main/installer.sh -O - | /bin/sh",
        "CiefpsettingsMotor": "wget https://raw.githubusercontent.com/ciefp/CiefpsettingsMotor/main/installer.sh -O - | /bin/sh",
        "CiefpBouquetUpdater": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpBouquetUpdater/main/installer.sh -O - | /bin/sh",
        "CiefpChannelManager": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpChannelManager/main/installer.sh -O - | /bin/sh",
        "CiefpIPTVBouquets": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpIPTVBouquets/main/installer.sh -O - | /bin/sh",
        "CiefpSettingsStreamrelay PY3": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsStreamrelay/main/installer.sh -O - | /bin/sh",
        "CiefpSettingsStreamrelay PY2": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsStreamrelayPY2/main/installer.sh -O - | /bin/sh",
        "CiefpSettingsT2miAbertis": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsT2miAbertis/main/installer.sh -O - | /bin/sh",
        "CiefpSettingsT2miAbertisOpenPLi": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSettingsT2miAbertisOpenPLi/main/installer.sh -O - | /bin/sh",
        "CiefpWhitelistStreamrelay": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpWhitelistStreamrelay/main/installer.sh -O - | /bin/sh",
        "CiefpSatellitesXmlEditor": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSatelliteXmlEditor/main/installer.sh -O - | /bin/sh",
        "CiefpSelectSatellite": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSelectSatellite/main/installer.sh -O - | /bin/sh",
        "CiefpSatelliteAnalyzer": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpSatelliteAnalyzer/main/installer.sh -O - | /bin/sh",
        "levi45-settings": "wget https://dreambox4u.com/emilnabil237/plugins/levi45-settings/levi45-settings.sh -O - | /bin/sh",
        "TvSettings": "wget https://raw.githubusercontent.com/Belfagor2005/tvSettings/main/installer.sh -O - | /bin/sh",
    },
    "Plugins & Addons": {
        "Footonsat": "wget https://dreambox4u.com/emilnabil237/plugins/FootOnsat/installer.sh -O - | /bin/sh",
        "EPGImport": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/epgimport.sh -O - | /bin/sh",
        "EPGImport-99": "wget https://raw.githubusercontent.com/Belfagor2005/EPGImport-99/main/installer.sh -O - | /bin/sh",
        "Epg Grabber": "wget https://dreambox4u.com/emilnabil237/plugins/Epg-Grabber/installer.sh -O - | /bin/sh",
        "EPGTranslator": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/epgtranslator.sh -O - | /bin/sh",
        "SubsSupport_by-m.nasr": "wget https://github.com/popking159/ssupport/raw/main/subssupport-install.sh -O - | /bin/sh",
        "SubsSupport_2.1": "wget https://dreambox4u.com/emilnabil237/plugins/SubsSupport/subssupport_2.1.sh -O - | /bin/sh",
        "SubsSupport_1.5.8-r9": "wget https://dreambox4u.com/emilnabil237/plugins/SubsSupport/installer1.sh -O - | /bin/sh",
        "Quran-karem_v2.2": "wget https://raw.githubusercontent.com/emil237/quran/main/installer.sh -O - | /bin/sh",
        "Quran-karem": "wget https://dreambox4u.com/emilnabil237/plugins/quran/installer.sh -O - | /bin/sh",
        "Azkar Almuslim": "wget https://dreambox4u.com/emilnabil237/plugins/azkar-almuslim/installer.sh -O - | /bin/sh",
        "Athan Times": "wget https://dreambox4u.com/emilnabil237/plugins/athantimes/installer.sh -O - | /bin/sh",
        "TMBD": "wget https://raw.githubusercontent.com/biko-73/TMBD/main/installer.sh -O - | /bin/sh",
        "Tmdb": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/tmdb.sh -O - | /bin/sh",
        "CiefpTMDBSearch": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTMDBSearch/main/installer.sh -O - | /bin/sh",
        "CiefpMojTvEPG": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpMojTvEPG/main/installer.sh -O - | /bin/sh",
        "CiefpEPGshare": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpEPGshare/main/installer.sh -O - | /bin/sh",
        "CiefpTvProgram": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvProgram/main/installer.sh -O - | /bin/sh",
        "CiefpTvProgramA1HR": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvProgramA1HR/main/installer.sh -O - | /bin/sh",
        "CiefpTvProgramSBB": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvProgramSBB/main/installer.sh -O - | /bin/sh",
        "CiefpTvProgramSK": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvProgramSK/main/installer.sh -O - | /bin/sh",
        "CiefpTvTodayDE": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpTvTodayDE/main/installer.sh -O - | /bin/sh",
        "Bitrate": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/bitrate/bitrate.sh -O - | /bin/sh",
        "Bitrate-mod-ariad": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/bitrate/bitrate-mod-ariad.sh -O - | /bin/sh",
        "EvgQuickSignal": "wget https://raw.githubusercontent.com/biko-73/EvgQuickSignal/main/installer.sh -O - | /bin/sh",
        "RaedQuickSignal": "wget https://dreambox4u.com/emilnabil237/plugins/RaedQuickSignal/installer.sh -O - | /bin/sh",
        "Internet-Speedtest": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/internet-speedtest.sh -O - | /bin/sh",
        "IP_Checker": "wget https://raw.githubusercontent.com/emil237/plugins/refs/heads/main/IP_Checker.sh -O - | /bin/sh",
        "xtraevent_6.820_All-Python": "wget https://dreambox4u.com/emilnabil237/plugins/xtraevent/xtraevent-6.820.sh -O - | /bin/sh",
        "xtraevent_6.805": "wget https://dreambox4u.com/emilnabil237/plugins/xtraevent/xtraevent-6.805.sh -O - | /bin/sh",
        "xtraevent_6.798": "wget https://dreambox4u.com/emilnabil237/plugins/xtraevent/xtraevent_6.798.sh -O - | /bin/sh",
        "Xtraevent_4.6": "wget https://github.com/emil237/download-plugins/raw/main/Xtraevent-v4.6.sh -O - | /bin/sh",
        "xtraevent_4.5": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/xtraEvent_4.5.sh -O - | /bin/sh",
        "xtraevent_4.2": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/xtraEvent_4.2.sh -O - | /bin/sh",
        "xtraevent_3.3": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/xtraevent_3.3.sh -O - | /bin/sh",
        "Advanced-Screen-Shot": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/advancedscreenshot/advancedscreenshot.sh -O - | /bin/sh",
        "Screen-Recorder": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/screenrecorder/installer.sh -O - | /bin/sh",
        "CiefpScreenGrab": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpScreenGrab/main/installer.sh -O - | /bin/sh",
        "MoviesManager": "wget http://dreambox4u.com/emilnabil237/plugins/Transmission/MoviesManager.sh -O - | /bin/sh",
        "Filmxy": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/filmxy/filmxy.sh -O - | /bin/sh",
        "OrangeAudioPlugin": "wget https://raw.githubusercontent.com/popking159/OrangeAudio/refs/heads/main/installer.sh -O - | /bin/sh",
        "RadioGit": "wget https://dreambox4u.com/emilnabil237/plugins/radiogit/radiogit.sh -O - | /bin/sh",
        "Radiom": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/main/radiom/radiom.sh -O - | /bin/sh",
        "Radio-80-s": "wget https://raw.githubusercontent.com/Belfagor2005/Radio-80-s/main/installer.sh -O - | /bin/sh",
        "WebCamE2PrenjSF": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/WebCamE2PrenjSF/main/installer.sh -O - | /bin/sh",
        "WorldCam": "wget https://raw.githubusercontent.com/Belfagor2005/WorldCam/main/installer.sh -O - | /bin/sh",
        "ArabicSavior": "wget http://dreambox4u.com/emilnabil237/plugins/ArabicSavior/installer.sh -O - | /bin/sh",
        "horoscope": "wget https://raw.githubusercontent.com/emilnabil/horoscope/refs/heads/main/horoscope.sh -O - | /bin/sh",
        "HolidayCountdown": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/HolidayCountdown/installer.sh -O - | /bin/sh",
        "NewVirtualkeyBoard": "wget https://dreambox4u.com/emilnabil237/plugins/NewVirtualKeyBoard/installer.sh -O - | /bin/sh",
        "CFG_ZOOM_FINAL": "wget https://dreambox4u.com/emilnabil237/plugins/cfg_Zoom_Final_FIX7x/installer.sh -O - | /bin/sh",
        "Simple-Zoom-Panel": "wget https://dreambox4u.com/emilnabil237/plugins/simple-zoom-panel/installer.sh -O - | /bin/sh",
        "Zoom_1.1.2-Py3": "wget https://dreambox4u.com/emilnabil237/plugins/zoom/installer.sh -O - | /bin/sh",
        "CacheFlush": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/cacheflush/cacheflush.sh -O - | /bin/sh",
        "CrondManager": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/crondmanager/installer.sh -O - | /bin/sh",
        "scriptexecuter": "wget http://dreambox4u.com/emilnabil237/plugins/scriptexecuter/installer.sh -O - | /bin/sh",
        "showclock": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/showclock/showclock.sh -O - | /bin/sh",
        "Sherlockmod": "wget https://raw.githubusercontent.com/emil237/sherlockmod/main/installer.sh -O - | /bin/sh",
        "ScreenNames": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/screennames/screennames.sh -O - | /bin/sh",
        "uninstaller-Plugins": "wget http://dreambox4u.com/emilnabil237/plugins/unstaller-plugins/installer.sh -O - | /bin/sh",
        "pluginmover": "wget http://dreambox4u.com/emilnabil237/plugins/pluginmover/installer.sh -O - | /bin/sh",
        "pluginskinmover": "wget http://dreambox4u.com/emilnabil237/plugins/pluginskinmover/installer.sh -O - | /bin/sh",
        "Zip2Pkg-Converter": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/Zip2Pkg/installer.sh -O - | /bin/sh",
        "HistoryZapSelector": "wget https://dreambox4u.com/emilnabil237/plugins/historyzap/installer1.sh -O - | /bin/sh",
        "Alajre": "wget https://dreambox4u.com/emilnabil237/plugins/alajre/installer.sh -O - | /bin/sh",
        "Ansite": "wget https://raw.githubusercontent.com/emil237/ansite/refs/heads/main/installer.sh -O - | /bin/sh",
        "Apod": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/apod/installer.sh -O - | /bin/sh",
        "Apsattv": "wget https://raw.githubusercontent.com/Belfagor2005/Apsattv/main/installer.sh -O - | /bin/sh",
        "Astronomy": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/astronomy/installer.sh -O - | /bin/sh",
        "Atilehd": "wget https://dreambox4u.com/emilnabil237/plugins/atilehd/installer.sh -O - | /bin/sh",
        "automatic-fullbackup": "wget https://dreambox4u.com/emilnabil237/plugins/automatic-fullbackup/installer.sh -O - | /bin/sh",
        "Acherone": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/acherone/installer.sh -O - | /bin/sh",
    },
    "Skins & Displays": {
        "BO-HLALA FHD SKIN": "wget https://raw.githubusercontent.com/biko-73/TeamNitro/main/script/installerB.sh -O - | /bin/sh",
        "Aglare-FHD for Atv-Spa-Egami": "wget https://raw.githubusercontent.com/popking159/skins/refs/heads/main/aglareatv/installer.sh -O - | /bin/sh",
        "Aglare-FHD for Pli-OBH-Vix": "wget https://raw.githubusercontent.com/popking159/skins/refs/heads/main/aglarepli/installer.sh -O - | /bin/sh",
        "Red-Dragon-FHD": "wget https://raw.githubusercontent.com/biko-73/TeamNitro/main/script/installerD.sh -O - | /bin/sh",
        "Nitro AdvanceFHD": "wget https://raw.githubusercontent.com/biko-73/NitroAdvanceFHD/main/installer.sh -qO - | /bin/sh",
        "Desert skin": "wget https://raw.githubusercontent.com/biko-73/TeamNitro/main/script/installerDs.sh -O - | /bin/sh",
        "XDreamy-FHD": "wget https://raw.githubusercontent.com/Insprion80/Skins/main/xDreamy/installer.sh -O - | /bin/sh",
        "Ozeta-Skins-Setup": "wget https://raw.githubusercontent.com/emil237/skins-enigma2/main/PLUGIN_Skin-ozeta.sh -O - | /bin/sh",
        "CHLogoChanger": "wget https://dreambox4u.com/emilnabil237/plugins/CHLogoChanger/ChLogoChanger.sh -O - | /bin/sh",
        "CrashLogoViewer": "wget https://dreambox4u.com/emilnabil237/plugins/crashlogviewer/install-CrashLogViewer.sh -O - | /bin/sh",
        "PiconsRename": "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/PiconsRename/PiconsRename.sh -O - | /bin/sh",
        "SetPicon": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/setpicon/installer.sh -O - | /bin/sh",
    },
    "System Tools": {
        "UPDATE ENIGMA2 ALL PYTHON": "wget https://raw.githubusercontent.com/emil237/updates-enigma/main/update-all-python.sh -O - | /bin/sh",
        "update (opkg update)": "opkg update",
        "Wget": "opkg install wget",
        "Curl": "opkg install curl",
        "FIX-ipk-Package-Installation": "wget https://dreambox4u.com/emilnabil237/script/fix-ipk-package-installation.sh -O - | /bin/sh",
        "Repair-Inodes-From-Hdd": "wget https://raw.githubusercontent.com/emil237/scripts/refs/heads/main/repair-hdd.sh -O - | /bin/sh",
        "Update OpenATV Develop feed": "wget -O - -q https://feeds2.mynonpublic.com/devel-feed | bash",
        "Super Script": "wget https://dreambox4u.com/emilnabil237/script/Super_Script.sh -O - | /bin/sh",
        "servicescanupdates_1.2": "wget https://dreambox4u.com/emilnabil237/plugins/servicescanupdates/servicescanupdates.sh -O - | /bin/sh",
        "astra-sm": "opkg install astra-sm",
        "gstplayer": "opkg install gstplayer",
        "Streamlinksrv": "opkg install streamlinksrv",
        "dabstreamer": "opkg install dabstreamer",
        "eti_tools": "opkg install eti-tools",
        "dvbsnoop": "opkg install dvbsnoop",
        "hardwareinfo": "wget https://dreambox4u.com/emilnabil237/plugins/hardwareinfo/installer.sh -O - | /bin/sh",
        "ONEupdater": "wget https://raw.githubusercontent.com/Sat-Club/ONEupdaterE2/main/installer.sh -O - | /bin/sh",
        "CiefpE2Converter": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpE2Converter/main/installer.sh -O - | /bin/sh",
        "CiefpOpenDirectories": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpOpenDirectories/main/installer.sh -O - | /bin/sh",
        "CiefpOscamEditor": "wget -q --no-check-certificate https://raw.githubusercontent.com/ciefp/CiefpOscamEditor/main/installer.sh -O - | /bin/sh",
    },
    "Multiboot": {
        "EgamiBoot_10.6": "wget https://raw.githubusercontent.com/emil237/egamiboot/refs/heads/main/egamiboot-10.6.sh -O - | /bin/sh",
        "EgamiBoot_10.5": 'wget -q "--no-check-certificate" https://raw.githubusercontent.com/emil237/egamiboot/refs/heads/main/installer.sh -O - | /bin/sh',
        "Neoboot_9.65": "wget https://dreambox4u.com/emilnabil237/plugins/neoboot-v9.65/iNB.sh -O - | /bin/sh",
        "Neoboot_9.65_Mod-By-ElSafty": "wget https://raw.githubusercontent.com/emil237/neoboot_v9.65/main/iNB_9.65_mod-elsafty.sh -O - | /bin/sh",
        "Neoboot_9.60": "wget https://dreambox4u.com/emilnabil237/plugins/neoboot-v9.60/iNB.sh -O - | /bin/sh",
        "Neoboot_9.58": "wget https://dreambox4u.com/emilnabil237/plugins/neoboot-v9.58/iNB.sh -O - | /bin/sh",
        "Neoboot_9.54": "wget https://raw.githubusercontent.com/emil237/neoboot_9.54/main/installer.sh -O - | /bin/sh",
        "OpenMultiboot_1.3": "wget https://raw.githubusercontent.com/emil237/openmultiboot/main/installer.sh -O - | /bin/sh",
        "OpenMultiboot-E2turk": "wget https://raw.githubusercontent.com/e2TURK/omb-enhanced/main/install.sh -O - | /bin/sh",
        "Multiboot-FlashOnline": "wget https://raw.githubusercontent.com/emil237/download-plugins/main/multiboot-flashonline.sh -O - | /bin/sh",
    },
    "Bootlogos": {
        "BootlogoSwapper Atv": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-Atv.sh -O - | /bin/sh",
        "BootlogoSwapper-Ramadan": "wget http://dreambox4u.com/emilnabil237/script/bootlogo-swapper-ramadan.sh -O - | /bin/sh",
        "BootlogoSwapper-OpenPli": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-pli.sh -O - | /bin/sh",
        "bootlogoSwapper-OpenBH": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-OpenBH.sh -O - | /bin/sh",
        "BootlogoSwapper_Egami": "wget http://dreambox4u.com/emilnabil237/script/bootLogoswapper-Egami.sh -O - | /bin/sh",
        "BootlogoSwapper_OpenVix": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-OpenVix.sh -O - | /bin/sh",
        "BootlogoSwapper_PURE2": "wget http://dreambox4u.com/emilnabil237/script/bootLogoswapper-Pure2.sh -O - | /bin/sh",
        "BootlogoSwapper_Kids": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-kids.sh -O - | /bin/sh",
        "BootlogoSwapper-christmas": "wget http://dreambox4u.com/emilnabil237/script/bootlogoswapper-christmas.sh -O - | /bin/sh",
    },
    "Images": {
        "Image-Openatv-7.5.1": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.5.1.sh -O - | /bin/sh",
        "Image-Openatv-7.5": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.5.sh -O - | /bin/sh",
        "Image-Openatv-7.4": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.4.sh -O - | /bin/sh",
        "Image_Openatv-7.3": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.3.sh -O - | /bin/sh",
        "Image_Openatv-7.2": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.2.sh -O - | /bin/sh",
        "Image_Openatv-7.1": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.1.sh -O - | /bin/sh",
        "Image-Openatv-7.0": "wget https://dreambox4u.com/emilnabil237/images/openatv-7.0.sh -O - | /bin/sh",
        "Image-Openatv-6.4": "wget https://dreambox4u.com/emilnabil237/images/openatv-6.4.sh -O - | /bin/sh",
        "Image_Openpli-9.1": "wget https://dreambox4u.com/emilnabil237/images/openpli-9.1.sh -O - | /bin/sh",
        "Image_Openpli-9.0": "wget https://dreambox4u.com/emilnabil237/images/openpli-9.0.sh -O - | /bin/sh",
        "Image_OpenPli-9.0-Time-Shift": "wget https://dreambox4u.com/emilnabil237/images/openpli-9.0-py3-TimeShift.sh -O - | /bin/sh",
        "Image_Openpli-8.3": "wget https://dreambox4u.com/emilnabil237/images/openpli-8.3.sh -O - | /bin/sh",
        "Image_OpenPli-8.3-Time-Shift": "wget https://dreambox4u.com/emilnabil237/images/openpli-8.3-py2-TimeShift.sh -O - | /bin/sh",
        "Image_Openpli-7.3": "wget https://dreambox4u.com/emilnabil237/images/openpli-7.3.sh -O - | /bin/sh",
        "Image_OpenPli develop": "wget https://dreambox4u.com/emilnabil237/images/openpli-develop.sh -O - | /bin/sh",
        "Image-Egami-10.4": "wget https://dreambox4u.com/emilnabil237/images/egami-10.4.sh -O - | /bin/sh",
        "Image_Pure2-7.4": "wget https://dreambox4u.com/emilnabil237/images/pure2-7.4.sh -O - | /bin/sh",
        "Image_openspa-8.4.xxx": "wget https://dreambox4u.com/emilnabil237/images/openspa-8.4.xxx.sh -O - | /bin/sh",
        "Image_Openvix-6.6.004": "wget https://dreambox4u.com/emilnabil237/images/openvix-6.6.004.sh -O - | /bin/sh",
        "Image_OpenBlackHole-5.4": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.4.sh -O - | /bin/sh",
        "Image_OpenBlackHole-5.3": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.3.sh -O - | /bin/sh",
        "Image_OpenBlackHole-5.2": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.2.sh -O - | /bin/sh",
        "Image_OpenBlackHole-5.1": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.1.sh -O - | /bin/sh",
        "Image_OpenBlackHole-5.0": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-5.0.sh -O - | /bin/sh",
        "Image_OpenBlackHole-4.4": "wget https://dreambox4u.com/emilnabil237/images/openblackhole-4.4-for-vuplus-only.sh -O - | /bin/sh",
        "Image BlackHole-3.1.0": "wget https://dreambox4u.com/emilnabil237/images/BlackHole-3.1.0.sh -O - | /bin/sh",
        "Image_OpenDroid-7.3": "wget https://dreambox4u.com/emilnabil237/images/opendroid-7.3.sh -O - | /bin/sh",
        "Image_OpenDroid-7.1": "wget https://dreambox4u.com/emilnabil237/images/opendroid-7.1.sh -O - | /bin/sh",
        "Image_OpenVision-py2-10.3-r395": "wget https://dreambox4u.com/emilnabil237/images/openvision/OpenVision-py2-10.3-r395.sh -O - | /bin/sh",
        "Image_VTI-15.0.02": "wget https://dreambox4u.com/emilnabil237/images/vti-15.0.02.sh -O - | /bin/sh",
    },
    "Picons & Logos": {
        "Picons Nilesat_7W+8W": "wget https://dreambox4u.com/emilnabil237/picons/nilesat/installer.sh -O - | /bin/sh",
        "Picons hotbird_13.0e": "wget https://dreambox4u.com/emilnabil237/picons/hotbird_13.0e/installer.sh -O - | /bin/sh",
        "Picons astra_19.2e": "wget https://dreambox4u.com/emilnabil237/picons/astra_19.2e/installer.sh -O - | /bin/sh",
        "Picons badr_26.0e": "wget https://dreambox4u.com/emilnabil237/picons/badr_26.0e/installer.sh -O - | /bin/sh",
        "Picons arabsat_30.5e": "wget https://dreambox4u.com/emilnabil237/picons/arabsat_30.5e/installer.sh -O - | /bin/sh",
        "Picons eshail_25.5e": "wget https://dreambox4u.com/emilnabil237/picons/eshail_25.5e/installer.sh -O - | /bin/sh",
        "Picons Amos_4.0W": "wget https://dreambox4u.com/emilnabil237/picons/amos_4.0w/installer.sh -O - | /bin/sh",
        "Picons eutelsat_5.0w": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_5.0w/installer.sh -O - | /bin/sh",
        "Picons eutelsat_7.0e": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_7.0e/installer.sh -O - | /bin/sh",
        "Picons eutelsat_9.0e": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_9.0e/installer.sh -O - | /bin/sh",
        "Picons eutelsat_10.0e": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_10.0e/installer.sh -O - | /bin/sh",
        "Picons eutelsat_16.0e": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_16.0e/installer.sh -O - | /bin/sh",
        "Picons astra_23.5e": "wget https://dreambox4u.com/emilnabil237/picons/astra_23.5e/installer.sh -O - | /bin/sh",
        "Picons astra_28.2e": "wget https://dreambox4u.com/emilnabil237/picons/astra_28.2e/installer.sh -O - | /bin/sh",
        "Picons astra_31.5e": "wget https://dreambox4u.com/emilnabil237/picons/astra_31.5e/installer.sh -O - | /bin/sh",
        "Picons eutelsat_36.0e": "wget https://dreambox4u.com/emilnabil237/picons/eutelsat_36.0e/installer.sh -O - | /bin/sh",
        "Picons hellas-sat_39.0e": "wget https://dreambox4u.com/emilnabil237/picons/hellas-sat_39.0e/installer.sh -O - | /bin/sh",
        "Picons turksat_42.0e": "wget https://dreambox4u.com/emilnabil237/picons/turksat_42.0e/installer.sh -O - | /bin/sh",
        "Picons azerspace_46.0e": "wget https://dreambox4u.com/emilnabil237/picons/azerspace_46.0e/installer.sh -O - | /bin/sh",
        "Picons hispasat_30.0w": "wget https://dreambox4u.com/emilnabil237/picons/hispasat_30.0w/installer.sh -O - | /bin/sh",
        "Picons thor_0.8w": "wget https://dreambox4u.com/emilnabil237/picons/thor_0.8w/installer.sh -O - | /bin/sh",
        "Picons bulgariasat_1.9e": "wget https://dreambox4u.com/emilnabil237/picons/bulgariasat_1.9e/installer.sh -O - | /bin/sh",
        "chocholousek-picons": "wget https://raw.githubusercontent.com/emilnabil/download-plugins/refs/heads/main/chocholousek-picons.sh -O - | /bin/sh",
        "MmPicons": "wget https://raw.githubusercontent.com/Belfagor2005/mmPicons/main/installer.sh -O - | /bin/sh",
    },
    "Local Tools & /tmp Installer": {
        "1. Install all IPK packages in /tmp": "opkg install --force-overwrite /tmp/*.ipk",
        "2. Install all Tar.gz packages in /tmp": "tar -xzf /tmp/*.tar.gz -C / && opkg update",
        "3. Update OPKG Feeds & Repositories": "opkg update",
        "4. Upgrade Installed Packages (opkg upgrade)": "opkg update && opkg upgrade",
        "5. Clean Crash Logs & /tmp Junk": "rm -rf /tmp/enigma2_crash* /tmp/*.log /tmp/*.ipk /tmp/*.tar.gz && echo 'Cleaned /tmp successfully'",
        "6. Free RAM Memory (Drop Linux Caches)": "sync && echo 3 > /proc/sys/vm/drop_caches && free",
        "7. Test Network & DNS Connectivity": "ping -c 3 8.8.8.8 && nslookup google.com",
        "8. Check Storage & Flash Space (df -h)": "df -h",
        "9. Restart Softcams & Emulators": "/etc/init.d/softcam restart 2>/dev/null || killall -9 oscam ncam CCcam 2>/dev/null; /etc/init.d/softcam start 2>/dev/null; echo 'Softcam restart executed'",
        "10. Inspect Network Listening Ports": "netstat -tulpn 2>/dev/null || ss -tulpn 2>/dev/null || echo 'netstat not available'",
        "11. Fast Restart Enigma2 GUI": "killall -9 enigma2",
        "12. Complete Receiver Reboot": "sync && reboot",
    }
}



# ==============================================================================
# PRO LIVE TERMINAL CONSOLE SCREEN
# Displays live command output in real-time with auto-scroll and status indicators
# ==============================================================================
class ZeroSatTerminalScreen(Screen):
    skin = """
    <screen name="ZeroSatTerminalScreen" position="center,center" size="1280,720" title="ZERO-SAT Pro Console" flags="wfNoBorder" backgroundColor="#030712">
        <!-- Top Terminal Header -->
        <widget name="title_label" position="30,20" size="850,45" font="Bold;28" foregroundColor="#38bdf8" transparent="1" />
        <widget name="time_label" position="900,20" size="350,45" font="Regular;24" foregroundColor="#94a3b8" halign="right" transparent="1" />
        <widget name="cmd_banner" position="30,70" size="1220,38" font="Console;18" foregroundColor="#facc15" backgroundColor="#0f172a" />
        
        <!-- Live Terminal Window -->
        <widget name="terminal_box" position="30,118" size="1220,512" font="Console;19" foregroundColor="#4ade80" backgroundColor="#020617" />
        
        <!-- Bottom Remote Action Bar -->
        <widget name="status_label" position="30,642" size="420,32" font="Regular;20" foregroundColor="#f59e0b" transparent="1" />
        <widget name="key_red" position="460,650" size="180,48" font="Regular;22" halign="center" backgroundColor="#991b1b" foregroundColor="#ffffff" />
        <widget name="key_green" position="660,650" size="180,48" font="Regular;22" halign="center" backgroundColor="#166534" foregroundColor="#ffffff" />
        <widget name="key_yellow" position="860,650" size="180,48" font="Regular;22" halign="center" backgroundColor="#854d0e" foregroundColor="#ffffff" />
        <widget name="key_blue" position="1060,650" size="190,48" font="Regular;22" halign="center" backgroundColor="#1e40af" foregroundColor="#ffffff" />
    </screen>
    """

    def __init__(self, session, item_name, command):
        self.session = session
        self.item_name = item_name
        self.command = command
        Screen.__init__(self, session)

        self["title_label"] = Label("ZERO-SAT Terminal: " + str(self.item_name))
        self["time_label"] = Label(time.strftime("%Y-%m-%d %H:%M:%S"))
        self["cmd_banner"] = Label(" [EXEC] > " + str(self.command))
        self["terminal_box"] = ScrollLabel()
        self["status_label"] = Label("Executing bash process... Please wait")
        
        self["key_red"] = Button("Cancel / Exit")
        self["key_green"] = Button("Restart E2 GUI")
        self["key_yellow"] = Button("Reboot Box")
        self["key_blue"] = Button("Scroll End")

        self["actions"] = ActionMap(
            ["ColorActions", "SetupActions", "OkCancelActions"],
            {
                "red": self.cancel_process,
                "cancel": self.cancel_process,
                "green": self.restart_enigma2,
                "yellow": self.reboot_system,
                "blue": self.scroll_terminal_down,
                "ok": self.confirm_close,
                "up": self["terminal_box"].pageUp,
                "down": self["terminal_box"].pageDown,
            },
        )

        self.log_lines = [
            "=================================================================",
            "   ZERO-SAT Pro Live Terminal Console - Enigma2 Installer   ",
            "=================================================================",
            "Target Addon: " + str(self.item_name),
            "Command: " + str(self.command),
            "Working Directory: /tmp",
            "Starting installation stream via eConsoleAppContainer...",
            "-----------------------------------------------------------------",
        ]
        self["terminal_box"].setText("\n".join(self.log_lines))

        self.process_finished = False
        self.container = eConsoleAppContainer()
        self.container.dataAvail.append(self.handle_console_data)
        self.container.appClosed.append(self.handle_console_closed)
        
        # Execute command in bash environment
        self.container.execute(str(self.command))

    def handle_console_data(self, data):
        try:
            if isinstance(data, bytes):
                text = data.decode("utf-8", "ignore")
            else:
                text = str(data)
        except Exception:
            text = str(data)

        for line in text.splitlines():
            clean = line.strip("\r\n")
            if clean:
                self.log_lines.append(clean)

        # Buffer keep last 300 lines for optimal UI smoothness
        if len(self.log_lines) > 300:
            self.log_lines = self.log_lines[-300:]

        self["terminal_box"].setText("\n".join(self.log_lines))
        self["terminal_box"].lastPage()

    def handle_console_closed(self, exit_code):
        self.process_finished = True
        try:
            self.container.dataAvail.remove(self.handle_console_data)
            self.container.appClosed.remove(self.handle_console_closed)
        except Exception:
            pass

        self.log_lines.append("-----------------------------------------------------------------")
        if exit_code == 0:
            self.log_lines.append("[SUCCESS] Process finished successfully with return code: 0")
            self.log_lines.append("[INFO] Addon is installed! Log saved to /tmp/zerosat_terminal.log")
            self["status_label"].setText("Completed (Code: 0). Press OK or Red to exit.")
        else:
            self.log_lines.append("[WARNING] Process finished with exit code: " + str(exit_code))
            self.log_lines.append("[INFO] Check /tmp/zerosat_terminal.log for troubleshooting.")
            self["status_label"].setText("Finished with code " + str(exit_code) + ". Press OK or Red.")

        # Save complete log to /tmp for troubleshooting
        try:
            with open("/tmp/zerosat_terminal.log", "w") as log_file:
                log_file.write("\n".join(self.log_lines))
        except Exception:
            pass

        self["terminal_box"].setText("\n".join(self.log_lines))
        self["terminal_box"].lastPage()

        # Prompt for restart on successful installation
        if exit_code == 0:
            try:
                from Screens.MessageBox import MessageBox
                self.session.openWithCallback(
                    self.on_restart_confirm,
                    MessageBox,
                    "Installation of [" + str(self.item_name) + "] completed successfully!\n\nDo you want to restart Enigma2 GUI now to apply changes?",
                    MessageBox.TYPE_YESNO,
                    timeout=12,
                    default=True
                )
            except Exception:
                pass

    def on_restart_confirm(self, result):
        if result:
            os.system("killall -9 enigma2")
            self.close()

    def scroll_terminal_down(self):
        self["terminal_box"].lastPage()

    def restart_enigma2(self):
        os.system("killall -9 enigma2")
        self.close()

    def reboot_system(self):
        os.system("reboot")
        self.close()

    def cancel_process(self):
        if not self.process_finished:
            try:
                self.container.kill()
            except Exception:
                pass
        self.close()

    def confirm_close(self):
        if self.process_finished:
            self.close()
        else:
            self.cancel_process()


# ==============================================================================
# PRO CATEGORY PLUGINS LIST SCREEN
# Lists all extensions in the chosen section with detailed previews
# ==============================================================================
class ZeroSatPluginsListScreen(Screen):
    skin = """
    <screen name="ZeroSatPluginsListScreen" position="center,center" size="1450,890" title="ZERO-SAT Pro - Addon Explorer" flags="wfNoBorder" backgroundColor="#070c14">
        <!-- Top Navigation Bar -->
        <widget name="cat_title" position="30,22" size="900,45" font="Bold;32" foregroundColor="#38bdf8" transparent="1" />
        <widget name="cat_count" position="950,22" size="460,45" font="Regular;24" foregroundColor="#f59e0b" halign="right" transparent="1" />
        <widget name="hint_bar" position="30,72" size="1390,36" font="Regular;20" foregroundColor="#cbd5e1" backgroundColor="#1e293b" />

        <!-- Addons List -->
        <widget name="plugins_menu" position="30,120" size="860,675" scrollbarMode="showOnDemand" itemHeight="56" font="Regular;26" backgroundColor="#0f172a" foregroundColor="#f8fafc" foregroundColorSelected="#38bdf8" />

        <!-- Detailed Preview Sidebar -->
        <widget name="preview_box_title" position="915,120" size="505,45" font="Bold;24" foregroundColor="#38bdf8" backgroundColor="#1e293b" halign="center" />
        <widget name="preview_box_desc" position="915,175" size="505,290" font="Regular;22" foregroundColor="#e2e8f0" backgroundColor="#111827" />
        <widget name="preview_box_cmd" position="915,475" size="505,320" font="Console;18" foregroundColor="#4ade80" backgroundColor="#020617" />

        <!-- Remote Color Function Keys -->
        <widget name="key_red" position="40,812" size="310,56" font="Regular;24" halign="center" backgroundColor="#991b1b" foregroundColor="#ffffff" />
        <widget name="key_green" position="380,812" size="310,56" font="Regular;24" halign="center" backgroundColor="#166534" foregroundColor="#ffffff" />
        <widget name="key_yellow" position="720,812" size="310,56" font="Regular;24" halign="center" backgroundColor="#854d0e" foregroundColor="#ffffff" />
        <widget name="key_blue" position="1060,812" size="350,56" font="Regular;24" halign="center" backgroundColor="#1e40af" foregroundColor="#ffffff" />
    </screen>
    """

    def __init__(self, session, category_name):
        self.session = session
        self.category_name = category_name
        base_dict = dict(PLUGINS_BY_CATEGORY.get(category_name, {}))

        # Auto-detect real local IPK / Tar.gz packages if in Local Tools section
        if self.category_name == "Local Tools & /tmp Installer":
            for search_path in ["/tmp", "/media/hdd", "/media/usb"]:
                try:
                    if os.path.isdir(search_path):
                        for fname in sorted(os.listdir(search_path)):
                            full_target = os.path.join(search_path, fname)
                            if os.path.isfile(full_target):
                                if fname.endswith(".ipk"):
                                    base_dict["[INSTALL IPK] " + str(fname)] = "opkg install --force-overwrite '" + str(full_target) + "'"
                                elif fname.endswith(".tar.gz"):
                                    base_dict["[EXTRACT TAR] " + str(fname)] = "tar -xzf '" + str(full_target) + "' -C / && opkg update"
                except Exception:
                    pass

        self.items_dict = base_dict
        import re
        self.items_keys = sorted(
            list(self.items_dict.keys()),
            key=lambda s: [int(t) if t.isdigit() else t.lower() for t in re.split(r'(\d+)', str(s))]
        )

        Screen.__init__(self, session)

        self["cat_title"] = Label("Category: " + str(self.category_name))
        self["cat_count"] = Label(str(len(self.items_keys)) + " Addons Available")
        self["hint_bar"] = Label("  Select an item and press [OK] or [GREEN] to launch live Terminal installer.")

        self["plugins_menu"] = MenuList(self.items_keys)
        try:
            self["plugins_menu"].onSelectionChanged.append(self.on_selection_changed)
        except Exception:
            pass
        self["preview_box_title"] = Label("Addon Preview")
        self["preview_box_desc"] = ScrollLabel()
        self["preview_box_cmd"] = ScrollLabel()

        self["key_red"] = Button("Back / رجوع")
        self["key_green"] = Button("Install / تثبيت")
        self["key_yellow"] = Button("Search / بحث")
        self["key_blue"] = Button("Restart GUI")

        self["actions"] = ActionMap(
            ["ColorActions", "SetupActions", "OkCancelActions"],
            {
                "red": self.close,
                "cancel": self.close,
                "green": self.open_terminal_for_selected,
                "ok": self.open_terminal_for_selected,
                "yellow": self.prompt_search,
                "blue": self.restart_enigma2,
            },
        )

        self.onLayoutFinish.append(self.update_preview)

    def on_selection_changed(self):
        self.update_preview()

    def prompt_search(self):
        try:
            from Screens.InputBox import InputBox
            self.session.openWithCallback(self.apply_search_filter, InputBox, title="Search Addons in " + str(self.category_name) + ":", text="")
        except Exception:
            # Fallback for images without InputBox
            import re
            self.items_keys = sorted(
                list(self.items_dict.keys()),
                key=lambda s: [int(t) if t.isdigit() else t.lower() for t in re.split(r'(\d+)', str(s))]
            )
            self["plugins_menu"].setList(self.items_keys)
            self["cat_count"].setText(str(len(self.items_keys)) + " Addons (All)")
            self.update_preview()

    def apply_search_filter(self, query=None):
        import re
        if not query or not str(query).strip():
            raw_list = list(self.items_dict.keys())
            self["cat_count"].setText(str(len(raw_list)) + " Addons (All)")
        else:
            q = str(query).strip().lower()
            raw_list = [k for k in self.items_dict.keys() if q in k.lower()]
            self["cat_count"].setText(str(len(raw_list)) + " Found: '" + str(query).strip() + "'")
        self.items_keys = sorted(
            raw_list,
            key=lambda s: [int(t) if t.isdigit() else t.lower() for t in re.split(r'(\d+)', str(s))]
        )
        self["plugins_menu"].setList(self.items_keys)
        self.update_preview()

    def update_preview(self):
        selected = self["plugins_menu"].getCurrent()
        if selected and selected in self.items_dict:
            cmd = self.items_dict[selected]
            self["preview_box_title"].setText(selected)
            if self.category_name == "Local Tools & /tmp Installer":
                type_desc = "Local Receiver Maintenance / File Tool"
            else:
                type_desc = "Online Addon Stream Installer"
            info = [
                "Name: " + str(selected),
                "Category: " + str(self.category_name),
                "Type: " + type_desc,
                "Compatibility: Python 3.12, 3.11, 3.10, 3.9 & 2.7",
                "Action: Press OK or GREEN to execute live in Terminal.",
                "Tip: Press YELLOW to filter/search names."
            ]
            self["preview_box_desc"].setText("\n".join(info))
            self["preview_box_cmd"].setText("Terminal Command:\n" + str(cmd))
        else:
            self["preview_box_title"].setText("No Item Selected")
            self["preview_box_desc"].setText("Press YELLOW to clear search filter and show all addons.")
            self["preview_box_cmd"].setText("")

    def open_terminal_for_selected(self):
        selected = self["plugins_menu"].getCurrent()
        if selected and selected in self.items_dict:
            cmd = self.items_dict[selected]
            self.session.open(ZeroSatTerminalScreen, selected, cmd)

    def restart_enigma2(self):
        os.system("killall -9 enigma2")
        self.close()


# ==============================================================================
# PRO MAIN DASHBOARD SCREEN (Categories & Real-Time Receiver Telemetry)
# ==============================================================================
class ZeroSatPanelMainScreen(Screen):
    skin = """
    <screen name="ZeroSatPanelMainScreen" position="center,center" size="1450,890" title="TAOUFIK STORE" flags="wfNoBorder" backgroundColor="#070c14">
        <!-- Top Branding Header -->
        <widget name="brand_title" position="30,20" size="700,45" font="Bold;34" foregroundColor="#38bdf8" transparent="1" />
        <widget name="brand_sub" position="30,65" size="700,30" font="Regular;20" foregroundColor="#94a3b8" transparent="1" />
        <widget name="clock_label" position="1100,25" size="300,45" font="Bold;32" foregroundColor="#f59e0b" halign="right" transparent="1" />

        <!-- Category Menu List -->
        <widget name="cat_menu" position="30,115" size="680,675" scrollbarMode="showOnDemand" itemHeight="60" font="Bold;26" backgroundColor="#0f172a" foregroundColor="#f8fafc" foregroundColorSelected="#38bdf8" />

        <!-- Receiver Telemetry and Hardware Info Panel -->
        <widget name="sys_header" position="740,115" size="670,42" font="Bold;24" foregroundColor="#38bdf8" backgroundColor="#1e293b" halign="center" />
        <widget name="receiver_model" position="740,162" size="670,38" font="Regular;22" backgroundColor="#111827" foregroundColor="#ffffff" halign="center" />
        <widget name="image_info" position="740,204" size="670,38" font="Regular;22" backgroundColor="#1e293b" foregroundColor="#ffffff" halign="center" />
        <widget name="cpu_info" position="740,246" size="670,38" font="Regular;22" backgroundColor="#111827" foregroundColor="#ffffff" halign="center" />
        <widget name="active_cam" position="740,288" size="670,38" font="Regular;22" backgroundColor="#1e293b" foregroundColor="#facc15" halign="center" />
        <widget name="memory_info" position="740,330" size="670,38" font="Regular;22" backgroundColor="#111827" foregroundColor="#ffffff" halign="center" />
        <widget name="storage_info" position="740,372" size="670,38" font="Regular;22" backgroundColor="#1e293b" foregroundColor="#ffffff" halign="center" />
        <widget name="internet_status" position="740,414" size="670,38" font="Regular;22" backgroundColor="#111827" foregroundColor="#ffffff" halign="center" />

        <!-- Category Description Box -->
        <widget name="cat_desc_box" position="740,465" size="670,325" font="Regular;22" backgroundColor="#0d1522" foregroundColor="#cbd5e1" />

        <!-- Remote Color Buttons -->
        <widget name="key_red" position="40,810" size="310,56" font="Regular;24" halign="center" backgroundColor="#991b1b" foregroundColor="#ffffff" />
        <widget name="key_green" position="380,810" size="310,56" font="Regular;24" halign="center" backgroundColor="#166534" foregroundColor="#ffffff" />
        <widget name="key_yellow" position="720,810" size="310,56" font="Regular;24" halign="center" backgroundColor="#854d0e" foregroundColor="#ffffff" />
        <widget name="key_blue" position="1060,810" size="350,56" font="Regular;24" halign="center" backgroundColor="#1e40af" foregroundColor="#ffffff" />
    </screen>
    """

    def __init__(self, session):
        self.session = session
        Screen.__init__(self, session)

        self.categories_names = [c[0] for c in CATEGORIES]
        self["cat_menu"] = MenuList(self.categories_names)
        try:
            self["cat_menu"].onSelectionChanged.append(self.on_selection_changed)
        except Exception:
            pass

        self["brand_title"] = Label("TAOUFIK STORE")
        self["brand_sub"] = Label("متجر توفيق بايتون 3 - Official Enigma2 Addon Manager (v" + str(PLUGIN_VERSION) + ")")
        self["clock_label"] = Label("")

        self["sys_header"] = Label("RECEIVER SYSTEM TELEMETRY")
        self["receiver_model"] = Label(self.get_receiver_model())
        self["image_info"] = Label(self.get_image_info())
        self["cpu_info"] = Label(self.get_cpu_info())
        self["active_cam"] = Label(self.get_active_softcam())
        self["memory_info"] = Label(self.get_memory_info())
        self["storage_info"] = Label(self.get_storage_info())
        self["internet_status"] = Label(self.get_internet_status())
        self["cat_desc_box"] = ScrollLabel()

        self["key_red"] = Button("Exit / خروج")
        self["key_green"] = Button("Open / فتح")
        self["key_yellow"] = Button("Self-Update")
        self["key_blue"] = Button("Restart GUI")

        self["actions"] = ActionMap(
            ["ColorActions", "SetupActions", "OkCancelActions"],
            {
                "red": self.close,
                "cancel": self.close,
                "green": self.open_category,
                "ok": self.open_category,
                "yellow": self.update_panel,
                "blue": self.restart_enigma2,
                "info": self.show_about,
                "menu": self.show_about,
            },
        )

        self.timer = eTimer()
        try:
            self.timer_conn = self.timer.timeout.connect(self.update_clock)
        except Exception:
            try:
                self.timer.callback.append(self.update_clock)
            except Exception:
                try:
                    self.timer.timeout.get().append(self.update_clock)
                except Exception:
                    pass
        try:
            self.timer.start(1000, False)
        except Exception:
            try:
                self.timer.start(1000)
            except Exception:
                pass

        self.onLayoutFinish.append(self.update_category_description)

    def on_selection_changed(self):
        self.update_category_description()

    def update_clock(self):
        self["clock_label"].setText(time.strftime("%H:%M:%S"))

    def update_category_description(self):
        selected = self["cat_menu"].getCurrent()
        if selected:
            for name, desc in CATEGORIES:
                if name == selected:
                    items_count = len(PLUGINS_BY_CATEGORY.get(name, {}))
                    info_text = (
                        "Category: " + str(name) + "\n\n" +
                        "Description:\n" + str(desc) + "\n\n" +
                        "Total Packages: " + str(items_count) + " Verified Addons\n" +
                        "System Architecture: ARM / MIPS / Python " + str(sys.version.split()[0]) + "\n\n" +
                        "Navigation:\n" +
                        "  [OK] / [GREEN] : Open and explore addons\n" +
                        "  [YELLOW]       : Instant search inside category\n" +
                        "  [BLUE]         : Fast restart Enigma2 GUI"
                    )
                    self["cat_desc_box"].setText(info_text)
                    break

    def open_category(self):
        selected = self["cat_menu"].getCurrent()
        if selected and selected in PLUGINS_BY_CATEGORY:
            self.session.open(ZeroSatPluginsListScreen, selected)

    def update_panel(self):
        cmd = "wget https://github.com/emilnabil/download-plugins/raw/refs/heads/main/Ciefp-Panel/Ciefp-Panel.sh -O - | /bin/sh"
        self.session.open(ZeroSatTerminalScreen, "ZERO-SAT Pro Self-Updater", cmd)

    def restart_enigma2(self):
        os.system("killall -9 enigma2")
        self.close()

    def get_receiver_model(self):
        model_name = "Enigma2 STB"
        for path in ["/proc/stb/info/model", "/proc/stb/info/boxtype", "/proc/stb/info/version", "/etc/hostname"]:
            try:
                if os.path.exists(path):
                    with open(path, "r") as f:
                        val = f.read().strip()
                        if val:
                            model_name = val.upper()
                            break
            except Exception:
                continue

        ip_addr = self.get_ip_address()
        return "Box: " + str(model_name) + " | " + str(ip_addr)

    def get_ip_address(self):
        try:
            import socket
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.settimeout(0.3)
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
            s.close()
            return "IP: " + str(ip)
        except Exception:
            return "IP: Connected"

    def get_image_info(self):
        py_ver = "Py " + str(sys.version.split()[0])
        distro = "Enigma2 OS"
        try:
            if os.path.exists("/etc/image-version"):
                with open("/etc/image-version", "r") as f:
                    for line in f:
                        l = line.lower()
                        if "distro=" in l or "creator=" in l or "version=" in l:
                            parts = line.strip().split("=")
                            if len(parts) > 1 and parts[1].strip():
                                distro = parts[1].strip().capitalize()
                                break
            elif os.path.exists("/etc/issue"):
                with open("/etc/issue", "r") as f:
                    first = f.readline().strip()
                    if first:
                        distro = first.split()[0]
        except Exception:
            pass
        return "Image: " + str(distro) + " (" + py_ver + ")"

    def get_cpu_info(self):
        cpu_name = "ARM/MIPS"
        try:
            with open("/proc/cpuinfo", "r") as f:
                for line in f:
                    if "model name" in line:
                        cpu_name = line.split(":")[1].strip()
                        break
                    elif "Hardware" in line:
                        cpu_name = line.split(":")[1].strip()
                        break
        except Exception:
            pass

        temp_str = ""
        for path in ["/proc/stb/sensors/temp0/value", "/proc/stb/fp/temp_sensor", "/sys/class/thermal/thermal_zone0/temp"]:
            try:
                if os.path.exists(path):
                    with open(path, "r") as f:
                        val = f.read().strip()
                        if val.isdigit():
                            t = int(val)
                            if t > 1000:
                                t = t // 1000
                            temp_str = " (" + str(t) + "°C)"
                            break
            except Exception:
                continue

        return "CPU: " + str(cpu_name)[:22] + temp_str

    def get_memory_info(self):
        try:
            with open("/proc/meminfo", "r") as f:
                mem_total = mem_free = 0
                for line in f:
                    if "MemTotal" in line:
                        mem_total = int(line.split()[1]) // 1024
                    elif "MemAvailable" in line:
                        mem_free = int(line.split()[1]) // 1024
                    elif "MemFree" in line and mem_free == 0:
                        mem_free = int(line.split()[1]) // 1024
                return "RAM: " + str(mem_total) + " MB | Free: " + str(mem_free) + " MB"
        except Exception:
            return "RAM: Active"

    def get_storage_info(self):
        try:
            statvfs = os.statvfs("/")
            total_storage = (statvfs.f_blocks * statvfs.f_frsize) // (1024 * 1024)
            free_storage = (statvfs.f_bfree * statvfs.f_frsize) // (1024 * 1024)
            return "Flash: " + str(total_storage) + " MB | Free: " + str(free_storage) + " MB"
        except Exception:
            return "Flash: Storage Active"

    def get_internet_status(self):
        try:
            return "Network: Online (Connected)" if os.system("ping -c 1 -W 1 8.8.8.8 > /dev/null 2>&1") == 0 else "Network: Offline"
        except Exception:
            return "Network: Connected"

    def get_active_softcam(self):
        try:
            for emu_path in ["/etc/clist.list", "/tmp/cam.info", "/etc/active_emu.list", "/tmp/egami.emu"]:
                if os.path.exists(emu_path):
                    with open(emu_path, "r") as f:
                        line = f.readline().strip()
                        if line:
                            return "Cam: " + str(line)[:28]
            # Scan for background emulator processes
            for cam in ["oscam", "ncam", "CCcam", "gcam", "revcam", "suptv", "wicardd"]:
                if os.system("pgrep -i " + cam + " > /dev/null 2>&1") == 0:
                    return "Cam: " + str(cam).upper() + " (Active)"
            return "Cam: Standby / No Emu"
        except Exception:
            return "Cam: Standard"

    def show_about(self):
        try:
            from Screens.MessageBox import MessageBox
            about_msg = (
                "ZERO-SAT PRO PANEL (v" + str(PLUGIN_VERSION) + ")\n"
                "Ultimate Addons & Terminal Manager for Enigma2\n\n"
                "• 12 Dedicated Plugin Categories\n"
                "• Real-Time Terminal Streaming & Auto-Scroll\n"
                "• Local /tmp, HDD & USB Package Installer\n"
                "• Instant Search via Yellow Remote Button\n"
                "• Deep Hardware & Network Telemetry\n\n"
                "Images: OpenATV, OpenPLi, Egami, PurE2, BlackHole, VTi\n"
                "Hardware: VU+, Dreambox, Octagon, Zgemma, GigaBlue\n"
                "Python: 3.12, 3.11, 3.10, 3.9 & 2.7 Multi-Architecture"
            )
            self.session.open(MessageBox, about_msg, MessageBox.TYPE_INFO)
        except Exception:
            pass


# ==============================================================================
# ENIGMA2 PLUGIN ENTRY DESCRIPTORS (Python 3.12 / 3.11 / 2.7 Multi-Architecture)
# Registers in:
# 1) Plugin Browser (قائمة البلوجينات - Menu -> Plugins)
# 2) Extensions Menu (زر الإضافات الأزرق - Blue Button)
# 3) Main Menu (القائمة الرئيسية - Main Menu)
# ==============================================================================
def main(session=None, **kwargs):
    if session is None:
        try:
            from enigma import getDesktop
            import Screens.InfoBar
            session = Screens.InfoBar.InfoBar.instance.session
        except Exception:
            pass
    if session is not None:
        try:
            session.open(ZeroSatPanelMainScreen)
        except Exception as e:
            try:
                from Screens.MessageBox import MessageBox
                session.open(MessageBox, "خطأ في تشغيل متجر توفيق:\n" + str(e), MessageBox.TYPE_ERROR)
            except Exception:
                pass

def main_menu(menuid, **kwargs):
    if menuid == "mainmenu":
        return [("متجر توفيق (TAOUFIK STORE)", main, "taoufik_store", 44)]
    return []

def Plugins(**kwargs):
    try:
        from Plugins.Plugin import PluginDescriptor
    except Exception:
        # Fallback if outside Enigma2
        return []

    descriptors = []

    # 1. Plugin Browser Menu (Menu -> Plugins / قائمة البلوجينات)
    try:
        descriptors.append(
            PluginDescriptor(
                name="متجر توفيق (TAOUFIK STORE)",
                description="متجر توفيق لإضافات إنيجما2 - Python 3.12 / 2.7",
                where=PluginDescriptor.WHERE_PLUGINMENU,
                icon="icon.png",
                fnc=main,
            )
        )
    except Exception as e:
        print("[TAOUFIK-STORE] WHERE_PLUGINMENU registration error:", e)

    # 2. Extensions Quick Menu (Blue Button / الزر الأزرق)
    try:
        descriptors.append(
            PluginDescriptor(
                name="متجر توفيق (TAOUFIK STORE)",
                description="متجر توفيق لإضافات إنيجما2 بايتون 3",
                where=PluginDescriptor.WHERE_EXTENSIONSMENU,
                fnc=main,
            )
        )
    except Exception as e:
        print("[TAOUFIK-STORE] WHERE_EXTENSIONSMENU registration error:", e)

    # 3. Receiver Main Menu (القائمة الرئيسية)
    try:
        if hasattr(PluginDescriptor, "WHERE_MENU"):
            descriptors.append(
                PluginDescriptor(
                    name="متجر توفيق (TAOUFIK STORE)",
                    description="متجر توفيق لإضافات إنيجما2",
                    where=PluginDescriptor.WHERE_MENU,
                    fnc=main_menu,
                )
            )
    except Exception as e:
        print("[TAOUFIK-STORE] WHERE_MENU registration error:", e)

    return descriptors

# If user tries to execute this script directly in terminal via: python3 plugin.py
if __name__ == "__main__":
    print("""
========================================================================
 [INFO] متجر توفيق بايتون 3 (TAOUFIK STORE) is an Enigma2 GUI Plugin.
 It cannot be run as a standalone desktop python script.
 
 >> How to install on your Enigma2 receiver (Python 3.12 / 3.11 / 2.7):
 1) Directory:
    /usr/lib/enigma2/python/Plugins/Extensions/ZeroSatPanel/
 2) Required files:
    - plugin.py
    - __init__.py
    - icon.png
 3) Restart Enigma2:
    killall -9 enigma2
 4) Open plugin from:
    - Main Menu -> Plugins -> TAOUFIK STORE
    - Blue button (Extensions) -> TAOUFIK STORE
    - Receiver Main Menu -> متجر توفيق (TAOUFIK STORE)
========================================================================
""")

