export interface Memory {
  id: string;
  url: string;
  type: 'photo' | 'photobooth' | 'daily' | 'virtual-booth';
  date: string;
  caption?: string;
  filters?: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  shotsCount: number;
  bgColor: string;
  frameStyle: string;
}

export interface DailyBoothData {
  date: string;
  theme: string;
  description: string;
  template: Template;
}
