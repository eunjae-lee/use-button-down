# use-button-down

## `api/subscribe.js`

```js
import { subscribeAPI } from 'use-button-down';

export default subscribeAPI;
```

## `Form.js`

```jsx
function Form({ tags = undefined }) {
  const {
    email,
    setEmail,
    submit,
    status,
    errorType,
    errorPayload,
  } = useButtonDown({ tags });

  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          submit();
        }}
        className="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
        noValidate
      >
        <div className="min-w-0 flex-1">
          <label for="cta_email" className="sr-only">
            Email address
          </label>
          <input
            id="cta_email"
            type="email"
            className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            placeholder="Enter your email"
            value={email}
            onInput={event => setEmail(event.target.value)}
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button
            type="submit"
            className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={['subscribing', 'error', 'subscribed'].includes(status)}
          >
            {status === 'subscribing'
              ? 'Subscribing...'
              : status === 'subscribed'
              ? 'Subscribed'
              : 'Subscribe'}
          </button>
        </div>
      </form>
      {status === 'subscribed' && (
        <div>
          <p className="mt-2 text-indigo-100 font-medium">
            Thanks for your subscription.
          </p>
        </div>
      )}
      {errorType === 'invalid_email' && (
        <div>
          <p className="mt-2 text-red-200 font-medium">Invalid email address</p>
        </div>
      )}
      {errorType === 'api' && (
        <div>
          <p className="mt-2 text-red-200 font-medium">
            Failed due to some technical issue. Please{' '}
            <a
              href="mailto:hey@quill.so"
              className="underline hover:text-red-100"
            >
              contact us
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
```
