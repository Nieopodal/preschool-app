import * as fs from 'fs/promises';
import * as path from 'path';
import { aboutPageContent } from '../content/about-page.content';
import { contactContent } from '../content/contact.content';
import { contactPageContent } from '../content/contact-page.content';
import { employeesPageContent } from '../content/employees-page.content';
import { homePageContent } from '../content/home-page.content';
import { implementedProgramsPageContent } from '../content/implemented-programs-page.content';
import { organizationPageContent } from '../content/organization-page.content';
import { statutePageContent } from '../content/statute-page.content';
import { feesPageContent } from '../content/fees-page.content';
import { gdprPageContent } from '../content/gdpr-page.content';
import { groupsPageContent } from '../content/groups-page.content';
import { regulationsPageContent } from '../content/regulations-page.content';

(async () => {
  try {
    const contentPages = {
      aboutPageContent,
      contactContent,
      contactPageContent,
      employeesPageContent,
      feesPageContent,
      regulationsPageContent,
      gdprPageContent,
      groupsPageContent,
      homePageContent,
      implementedProgramsPageContent,
      organizationPageContent,
      statutePageContent,
    };
    const destination = path.join(__dirname, '../../data/pages.data.json');
    await fs.writeFile(destination, JSON.stringify(contentPages));
    console.log('Operation succeed.');
  } catch (e) {
    console.error('The following error occurred while saving the file:', e);
  }
})();
