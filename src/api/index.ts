import fetch from 'isomorphic-unfetch';

export async function subscribe(req: any, res: any) {
  const { email, tags } = req.body;
  const url = 'https://api.buttondown.email/v1/subscribers';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      tags,
    }),
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API}`,
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  res.status(response.status).json(json);
}
