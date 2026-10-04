import { LocalizedString } from "./project";

export interface TestimonialItem {
  id: number;
  project: LocalizedString;
  role: LocalizedString;
  content: LocalizedString;
  rating: number;
  clientName?: LocalizedString;
  location?: LocalizedString;
  avatar?: string;
  verified?: boolean;
}
