import { useCallback, useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

type Props = {
  apiPath?: string;
  tags?: string[];
};

type Status = 'idle' | 'subscribing' | 'error' | 'subscribed';
type ErrorType = 'invalid_email' | 'api' | undefined;

function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

export function useButtonDown(props: Props) {
  const { apiPath = '/api/subscribe', tags } = props;
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorType, setErrorType] = useState<ErrorType>();
  const [errorPayload, setErrorPayload] = useState<any>();

  useEffect(() => {
    setStatus('idle');
  }, [email]);

  useEffect(() => {
    if (status !== 'error') {
      setErrorType(undefined);
      setErrorPayload(undefined);
    }
  }, [status]);

  const submit = useCallback(() => {
    if (status === 'subscribing' || status === 'subscribed') {
      return;
    }

    if (!isValidEmail(email)) {
      setErrorType('invalid_email');
      setStatus('error');
      return;
    }

    setStatus('subscribing');
    fetch(apiPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        tags,
      }),
    })
      .then(async response => {
        if (!response.ok) {
          setStatus('error');
          setErrorType('api');
          setErrorPayload(response.statusText);
          return;
        }
        setStatus('subscribed');
      })
      .catch(reason => {
        setStatus('error');
        setErrorType('api');
        setErrorPayload(reason);
      });
  }, [status, email, tags, apiPath]);

  return { email, setEmail, submit, status, errorType, errorPayload };
}
