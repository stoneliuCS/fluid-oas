import {
  String,
  Object,
  Path,
  PathItem,
  Operation,
  Response,
  Info,
  Responses,
  OpenApi,
} from "../core";

const info = Info("Dearly API")
  .withVersion("1.0.0")
  .description(
    `Dearly is a private family-sharing app that bridges generational gaps 
       and makes staying connected easier and more meaningful. 
       The platform allows families to share photos, voice memos, 
       and other media in a secure, invite-only space. 
       With two thoughtfully designed modes, Dearly caters to every generation: 
       a streamlined, user-friendly interface for those less familiar with technology and a dynamic, 
       feature-rich experience for younger users.`
  )
  .summary("Dearly makes connecting with loved ones easy.");
