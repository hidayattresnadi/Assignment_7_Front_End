import Icon from '../elements/icon';
import TextLink from '../elements/textLink';

const SocialLinks = () => (
    <>
    <TextLink className="text-white me-3" href="#" label="Facebook"><Icon className="fab fa-facebook-f"/></TextLink>
    <TextLink className="text-white me-3" href="#" label="Twitter"><Icon className="fab fa-twitter"/></TextLink>
    <TextLink className="text-white me-3" href="#" label="Twitter"><Icon className="fab fa-instagram"/></TextLink>
    </>
);

export default SocialLinks;