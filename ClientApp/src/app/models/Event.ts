import { Group } from "./Group";
import { SocialMedia } from "./SocialMedia";
import { Speaker } from "./Speaker";

export class Event {
  constructor() { }

  id: number;
  city: string;
  topic: string;
  subscribers: number;
  phone: string;
  email: string;
  date: Date;
  imageFile: string;
  groups: Group[];
  socialMedias: SocialMedia[];
  speakerEvents: Speaker[];
}
