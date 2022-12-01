import React, {ReactNode, useState} from 'react';
import './Form.sass';

function Form(props: {
  children: ReactNode,
  heading: string,
  navOptions: ReactNode,
  onSubmitFunc: { (event: React.FormEvent<HTMLFormElement>): void },
  className?: string
}) {
  const [isProcessing, setProcessing] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const {children, heading, navOptions, onSubmitFunc, className} = {...props}

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!isProcessing) {
        setProcessing(true);
        await onSubmitFunc(event);
        setProcessing(false);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setSubmitError(error.message);
        setTimeout(() => {
          setSubmitError('');
          setProcessing(false);
        }, 1500)
      }
    }
  }

  return (
    <div style={{position:'fixed', top:'0', bottom: '0', left:'0', right:'0', margin: 'auto', height: 'fit-content', width:'fit-content'}}>
      <form className={' ' + className ? className : ''} onSubmit={handleSubmit} noValidate={true}>
        <div className={'heading'}>
          <div className={'navOptions'}>
            {navOptions}
            <span className={'headingBottomBorder'}/>
          </div>
          {heading}
        </div>
        <div className={'formInputContainer'}>
          {children}
        </div>
        <input type='submit' className={'submit'} disabled={isProcessing} value={isProcessing ? 'Processing' : 'submit'}/>
        {submitError !== '' && <span className={'submitError'}>{submitError}</span>}
        <span className={'backgroundDrop'}/>
      </form>
    </div>

  );
}

export default Form;
