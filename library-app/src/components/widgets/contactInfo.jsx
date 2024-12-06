import Text from '../elements/text';
import TextLink from '../elements/textLink';

const ContactInfo = () => (
    <>
        <Text>Email: <TextLink className="text-white" href="mailto:contact@librarycompany.com">contact@librarycompany.com</TextLink></Text>
        <Text>Phone: <TextLink className="text-white" href="tel:+62234567890">+62 234 567 890</TextLink></Text>
    </>
);

export default ContactInfo;
