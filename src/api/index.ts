import fetch from 'isomorphic-unfetch';

type Props = {
  email: string;
  tags?: string[];
};

export async function subscribeAPI(req: any, res: any) {
  const { email, tags } = req.body;
  const { status, json } = await subscribe({ email, tags });
  res.status(status).json(json);
}

export async function subscribe({ email, tags }: Props) {
  const url = 'https://api.buttondown.email/v1/subscribers';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      tags,
    }),
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return {
    status: response.status,
    json,
  };
}
