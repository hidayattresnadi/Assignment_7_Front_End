import SocialLinks from '../widgets/socialLinks';
import ContactInfo from '../widgets/contactInfo';
import FooterLinks from '../widgets/footerLinks';
import Container from '../elements/container';

const FooterSection = () => (
  <Container className="row justify-content-center">
    <Container className="col-12 col-md-4 text-center mt-4">
      <h6>Follow Us</h6>
      <SocialLinks />
    </Container>
    <Container className="col-12 col-md-4 text-center mt-4">
      <h6>Contact Us</h6>
      <ContactInfo />
    </Container>
    <Container className="col-12 col-md-4 mt-4">
      <FooterLinks />
    </Container>
  </Container>
);

export default FooterSection;
