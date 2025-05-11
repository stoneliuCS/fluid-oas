import { withBooleanTemplate } from './BooleanTemplate';
import { withMapTemplate } from './MapTemplate';
import { withStringTemplate } from './StringTemplate';
import { MainProject } from './TemplateBuilder';

function main() {
  withBooleanTemplate();
  withStringTemplate();
  withMapTemplate();
  MainProject.save().then().catch().finally();
}

main();
