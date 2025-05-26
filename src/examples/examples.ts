import { Info } from "../core";
import { OpenApi } from "../core/openapiv3";

const info = Info("Dearly API", "1.0.0")
  .addDescription(
    `Dearly is a private family-sharing app that bridges generational gaps 
       and makes staying connected easier and more meaningful. 
       The platform allows families to share photos, voice memos, 
       and other media in a secure, invite-only space. 
       With two thoughtfully designed modes, Dearly caters to every generation: 
       a streamlined, user-friendly interface for those less familiar with technology and a dynamic, 
       feature-rich experience for younger users.`
  )
  .addSummary("Dearly makes connecting with loved ones easy.");

OpenApi(info).writeOAS()
