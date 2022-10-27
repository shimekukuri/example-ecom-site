export default async function verify(email, password) {
  const response = await fetch("/api/userfunctions/verifyPassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      credentialEmail: email,
      credentialPassword: password,
    }),
  });
  if (!response.ok) {
    return "Problem Fetching data";
  }

  const data = await response.json();
  return data;
}

