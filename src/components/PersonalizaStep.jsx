
import '../styles/PersonalizaStep.css';

const PersonalizaStep = (props) => {
    const steps = props.steps;
    console.log(steps);
    return (
        <div className="personaliza-steps">
        {steps.map((step, index) => (
            <div key={index} className="personaliza-step">
                <div>
                <i className="personaliza-number">{index+1}</i>
                <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
            </div>
        ))}
        </div>
    );
}

export default PersonalizaStep;