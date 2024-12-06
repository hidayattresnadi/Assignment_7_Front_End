import Text from '../elements/text';

const GreetingMessage = ({ timeOfDay, fullDate }) => (
    <>
        <Text
            className="fs-1 fw-bold z-index-1"
            style={{ color: '#FFFF79' }}>
            {`Good ${timeOfDay}!`}
        </Text>

        <Text
            className="fs-1 fw-bold z-index-1"
            style={{ color: '#FFFF79' }}>
            {`Current date is: ${fullDate}!`}
        </Text>

        <Text
            className="fs-1 fw-bold z-index-1"
            style={{ color: '#FFFF79' }}>
            {'Welcome to our site'}
        </Text>
    </>
);

export default GreetingMessage;
