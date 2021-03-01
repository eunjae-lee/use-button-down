# use-button-down

## Installation

```
npm install use-button-down
# or
yarn add use-button-down
```

## `api/subscribe.js`

With the following code, you can create an API on Vercel. For other providers like Netlify, import `subscribe` and follow their spec.

This function assumes you have `process.env.BUTTONDOWN_API_KEY`.

```js
import { subscribeAPI } from 'use-button-down';

export default subscribeAPI;
```

## `Form.js`

```js
const {
  email,        // string
  setEmail,     // function
  submit,       // function
  status,       // 'idle' | 'subscribing' | 'error' | 'subscribed'
  errorType,    // 'invalid_email' | 'api' | undefined
  errorPayload, // any
} = useButtonDown({ tags, apiPath });

// tags?: string[];
// apiPath?: string;
```

Example:
```jsx
import { useButtonDown } from 'use-button-down';

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
          <label htmlFor="cta_email" className="sr-only">
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

By default, the hook calls `/api/subscribe` when submitting. You can change the api path like the following:

```js
useButtonDown({ apiPath: '...' });
```

## Next steps

- [ ] Get rid of `isomorphic-fetch` from the dependencies and accept `fetch` as a parameter. This way, we can reduce the bundle size and avoid duplicated implementation.
- [ ] Write more docs?
