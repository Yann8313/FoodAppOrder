import classes from './formCheckout.module.scss';
import useInput from "../../hooks/use-input";

const FormCheckout = (props) => {
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    } = useInput(value => value.trim() !== '');
    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameHasInputError,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameInputBlurHandler,
        reset: resetLastNameInput
    } = useInput(value => value.trim() !== '');
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));

    let formIsValid = false;

    if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();


        if (!enteredFirstNameIsValid || !enteredLastNameIsValid || !enteredEmailIsValid) {
            return;
        }
        resetFirstNameInput();
        resetLastNameInput()
        resetEmailInput()

    };

    return (
        <form onSubmit={formSubmissionHandler} className={classes.form}>
            <div className={`${classes.formControl} ${firstNameInputHasError ? classes.invalid : ''}`}>
                <label htmlFor='name'>First Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={firstNameChangedHandler}
                    onBlur={firstNameBlurHandler}
                    value={enteredFirstName}
                />
                {firstNameInputHasError && (
                    <p className={classes.errorText}>First Name must not be empty.</p>
                )}
            </div>
            <div className={`${classes.formControl} ${lastNameHasInputError ? classes.invalid : ''}`}>
                <label htmlFor='name'>Last Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={lastNameChangedHandler}
                    onBlur={lastNameInputBlurHandler}
                    value={enteredLastName}
                />
                {lastNameHasInputError && (
                    <p className={classes.errorText}>Last Name must not be empty.</p>
                )}
            </div>
            <div className={classes.formControl}>
                <label htmlFor='address'>Address</label>
                <input
                    type='text'
                    id='address'
                />
            </div>
            <div className={`${classes.formControl} ${emailInputHasError ? classes.invalid : ''}`}>
                <label htmlFor='email'>E-Mail</label>
                <input
                    type='email'
                    id='email'
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    value={enteredEmail}
                />
                {emailInputHasError && (
                    <p className={classes.errorText}>Please enter a valid email.</p>
                )}
            </div>
            <div className={classes.actions}>
                <button disabled={!formIsValid} onClick={props.onClick} className={classes.buttonForm}>Continued</button>
            </div>
        </form>
    );
};

export default FormCheckout;
