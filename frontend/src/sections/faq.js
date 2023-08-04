/** @jsx jsx */
import { jsx, Container, Box } from 'theme-ui';
import SectionHeader from 'components/section-heading';
import Accordion from 'components/accordion/accordion';
const faqs = [
  {
    title: `How does Smart Applicant's automated application feature work?`,
    contents: (
      <div>
        Smart Applicant uses intelligent algorithms to match your profile and preferences 
        with relevant job listings. Once a match is found, it automatically sends a customized 
        application on your behalf. You can set up preferences, including job roles, industries,
        locations, and more, to make sure the system only applies for jobs that are right for you.
      </div>
    ),
  },
  {
    title: 'Can I integrate my LinkedIn or other job board profiles with Smart Applicant?',
    contents: (
      <div>
        Yes, Smart Applicant allows seamless integration with LinkedIn, Indeed, and 
        other major job boards. By connecting your profiles, you can search and apply 
        to matching jobs across multiple platforms all from one centralized location.
      </div>
    ),
  },
  {
    title: `How many resumes can I upload on Smart Applicant, and what preferences do I have access to on different plans?`,
    contents: (
      <div>
        With Smart Applicant's basic plan, you can upload 1 resume, and with the premium plan,
        you have the ability to upload 3 resumes. Both plans grant you access to multiple preferences,
        allowing you to tailor your job search and application process to better fit your needs and 
        career goals. The premium plan, with the added flexibility of multiple resumes, offers more 
        opportunities to match specific jobs.
      </div>
    ),
  },
  {
    title: `How secure is my personal information with Smart Applicant?`,
    contents: (
      <div>
        Your privacy and the security of your information are our top priorities. 
        Smart Applicant uses industry-standard encryption and follows best practices 
        to ensure that your data is stored securely. We never share your information
         with third parties without your explicit consent, and you have full control 
         over your data within the app.
      </div>
    ),
  },
];
export default function Faq() {
  return (
    <Box as="section" id="faq" variant="section.faq">
      <Container>
        <SectionHeader
          title="Do you have any quesiton"
          description="Our support team ready to help you, please contact with them"
        />
        <Box
          sx={{
            display: 'flex',
            width: ['100%', null, null, '650px', '745px'],
            flexDirection: 'column',
            mx: 'auto',
            my: -4,
          }}
        >
          <Accordion items={faqs} />
        </Box>
      </Container>
    </Box>
  );
}
