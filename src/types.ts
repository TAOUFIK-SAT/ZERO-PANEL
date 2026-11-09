/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Match {
  id: string;
  league: string;
  teamHome: string;
  teamHomeLogo: string;
  teamAway: string;
  teamAwayLogo: string;
  scoreHome: number;
  scoreAway: number;
  time: string; // e.g. "20:45" or "الدقيقة 72"
  status: 'upcoming' | 'live' | 'finished';
  channelId: string;
  prediction?: string;
  lineups?: {
    home: string[];
    away: string[];
  };
  events?: {
    minute: number;
    player: string;
    team: 'home' | 'away';
    type: 'goal' | 'card_red' | 'card_yellow' | 'substitution';
  }[];
}

export interface Channel {
  id: string;
  name: string;
  category: 'sports' | 'entertainment' | 'news' | 'islamic' | 'iraq';
  logo: string; // color name / slug or icon
  streamUrl: string; // HLS link or standard video link
  isSimulated: boolean;
  viewers: number;
  description?: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  badge?: string; // e.g. "مشرف" or "مشجع ذهبي"
  text: string;
  time: string;
  color: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
}
