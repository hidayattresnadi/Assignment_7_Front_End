import Container from '../elements/container';
import RadioOption from '../widgets/radionOptions';

const RadioGroup = ({ options, name, selectedValue, onChange }) => (
    <Container style={{marginTop:'50px', marginBottom:'20px'}} className='d-flex'>
        <h5 className='me-4'>Please Select Gender:</h5>
        {options.map(option => (
            <RadioOption 
                key={option.value} 
                id={option.value}
                name={name} 
                value={option.value} 
                label={option.label} 
                checked={selectedValue === option.value} 
                onChange={onChange} 
            />
        ))}
    </Container>
);

export default RadioGroup;
