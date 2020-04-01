import { Group } from "./Group";
import { SocialMedia } from "./SocialMedia";
import { Speaker } from "./Speaker";

export interface Event {
  id: number;
  city: string;
  topic: string;
  subscribers: number;
  phone: string;
  email: string;
  date: Date;
  groups: Group[];
  socialMedias: SocialMedia[];
  speakerEvents: Speaker[];
}