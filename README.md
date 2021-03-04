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
        noValidate
      >
        <div>
          <label htmlFor="cta_email">
            Email address
          </label>
          <input
            id="cta_email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onInput={event => setEmail(event.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
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
          <p>
            Thanks for your subscription.
          </p>
        </div>
      )}
      {errorType === 'invalid_email' && (
        <div>
          <p>Invalid email address</p>
        </div>
      )}
      {errorType === 'api' && (
        <div>
          <p>
            Failed due to some technical issue. Please{' '}
            <a
              href="mailto:your@email.address"
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
