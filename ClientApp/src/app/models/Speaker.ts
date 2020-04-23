import { SocialMedia } from "./SocialMedia";
import { Event } from "./Event";

export class Speaker {
  id: number;
  name: string;
  shortResume: string;
  photo: string;
  phone: string;
  email: string;
  socialMedias: SocialMedia[];
  speakerEvents: Event[];
}
